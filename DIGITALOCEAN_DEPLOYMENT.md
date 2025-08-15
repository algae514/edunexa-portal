# EduNexa Portal - Single DigitalOcean Droplet Deployment Guide

## **Overview**
Deploy both frontend and backend on a single $4/month DigitalOcean droplet with PostgreSQL for future use. Optimized for low traffic (40-50 hits/month) and minimal costs.

## **Cost Breakdown**
- **DigitalOcean Droplet**: $4/month (Basic - 512MB RAM, 1 vCPU, 10GB SSD)
- **Domain (futureos.live)**: Already owned at GoDaddy
- **Total Monthly Cost**: $4/month

---

## **Prerequisites**
- DigitalOcean account
- Domain: futureos.live (already registered with GoDaddy)
- SSH key pair generated on your local machine

---

## **Step 1: Create DigitalOcean Droplet**

### **1.1 Droplet Configuration**
1. Login to DigitalOcean Dashboard
2. Create new Droplet:
   - **Image**: Ubuntu 22.04 LTS
   - **Plan**: Basic - $4/month (512MB RAM, 1 vCPU, 10GB SSD)
   - **Datacenter**: Choose closest to your users
   - **Authentication**: Add your SSH key
   - **Hostname**: `edunexa-server`

### **1.2 Initial Server Setup**
```bash
# Connect to your droplet
ssh root@your_droplet_ip

# Update system
apt update && apt upgrade -y

# Create non-root user
adduser deployer
usermod -aG sudo deployer

# Copy SSH key to new user
rsync --archive --chown=deployer:deployer ~/.ssh /home/deployer
```

---

## **Step 2: Install Required Software**

### **2.1 Install Node.js**
```bash
# Switch to deployer user
su - deployer

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### **2.2 Install PostgreSQL**
```bash
# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user for future use
sudo -u postgres psql
CREATE DATABASE edunexa_db;
CREATE USER edunexa_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE edunexa_db TO edunexa_user;
\q
```

### **2.3 Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
```

### **2.4 Install Nginx (Web Server)**
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## **Step 3: Deploy Backend Application**

### **3.1 Upload Backend Code**
```bash
# Create app directory
mkdir -p /home/deployer/apps
cd /home/deployer/apps

# Clone or upload your backend code
# Option 1: If using Git
git clone https://github.com/yourusername/edunexa-backend.git
cd edunexa-backend

# Option 2: Upload files via SCP from local machine
# scp -r ./backend deployer@your_droplet_ip:/home/deployer/apps/edunexa-backend
```

### **3.2 Configure Backend**
```bash
cd /home/deployer/apps/edunexa-backend

# Install dependencies
npm install

# Create production environment file
cp .env.example .env

# Edit environment variables
nano .env
```

**Production .env configuration:**
```env
NODE_ENV=production
PORT=5000
SENDGRID_API_KEY=your_sendgrid_api_key_here
FROM_EMAIL=noreply@futureos.live
TO_EMAIL=support@futureos.live
FRONTEND_URL=https://futureos.live
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### **3.3 Start Backend with PM2**
```bash
# Start backend application
pm2 start src/app.js --name "edunexa-backend"

# Save PM2 configuration
pm2 save

# Setup PM2 startup script
pm2 startup
# Follow the instructions displayed
```

---

## **Step 4: Deploy Frontend Application**

### **4.1 Upload and Build Frontend**
```bash
cd /home/deployer/apps

# Upload frontend code
# scp -r ./frontend deployer@your_droplet_ip:/home/deployer/apps/edunexa-frontend
# OR clone from Git

cd edunexa-frontend

# Create production environment file
echo "VITE_API_URL=https://api.futureos.live" > .env

# Install dependencies and build
npm install
npm run build

# Move built files to web directory
sudo mkdir -p /var/www/edunexa
sudo cp -r dist/* /var/www/edunexa/
sudo chown -R www-data:www-data /var/www/edunexa
```

---

## **Step 5: Configure Nginx**

### **5.1 Remove Default Configuration**
```bash
sudo rm /etc/nginx/sites-enabled/default
```

### **5.2 Create Nginx Configuration**
```bash
sudo nano /etc/nginx/sites-available/edunexa
```

**Nginx configuration content:**
```nginx
# Frontend (Main Domain)
server {
    listen 80;
    server_name futureos.live www.futureos.live;
    
    root /var/www/edunexa;
    index index.html;
    
    # Handle React Router (SPA)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Optimize static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}

# Backend API (Subdomain)
server {
    listen 80;
    server_name api.futureos.live;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **5.3 Enable Configuration**
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/edunexa /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

---

## **Step 6: Domain and DNS Configuration**

### **6.1 GoDaddy DNS Settings**
Login to GoDaddy DNS Management and add these records:

**A Records:**
```
Type: A
Name: @
Value: your_droplet_ip
TTL: 600

Type: A  
Name: www
Value: your_droplet_ip
TTL: 600

Type: A
Name: api
Value: your_droplet_ip
TTL: 600
```

**CNAME Record (Optional):**
```
Type: CNAME
Name: www
Value: yourdomain.com
TTL: 600
```

### **6.2 Wait for DNS Propagation**
- DNS changes take 15 minutes to 24 hours to propagate
- Test with: `nslookup yourdomain.com`

---

## **Step 7: SSL Certificate (Free with Let's Encrypt)**

### **7.1 Install Certbot**
```bash
sudo apt install snapd -y
sudo snap install core; sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```

### **7.2 Obtain SSL Certificates**
```bash
# Get certificates for both domains
sudo certbot --nginx -d futureos.live -d www.futureos.live -d api.futureos.live

# Follow prompts and agree to terms
# Choose option 2 (redirect HTTP to HTTPS)
```

### **7.3 Auto-renewal Setup**
```bash
# Test auto-renewal
sudo certbot renew --dry-run

# Crontab is automatically configured
```

---

## **Step 8: Firewall Configuration**

### **8.1 Setup UFW Firewall**
```bash
# Enable firewall
sudo ufw enable

# Allow necessary ports
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'

# Check status
sudo ufw status
```

---

## **Step 9: Email Service Setup**

### **9.1 SendGrid Configuration**
1. Sign up for SendGrid (free tier: 100 emails/day)
2. Create API key with "Mail Send" permissions
3. Update backend `.env` file with API key
4. Restart backend: `pm2 restart edunexa-backend`

### **9.2 Domain Authentication (Optional but Recommended)**
1. In SendGrid dashboard, go to Settings > Sender Authentication
2. Authenticate your domain
3. Add DNS records provided by SendGrid to GoDaddy

---

## **Step 10: Testing and Verification**

### **10.1 Test Backend API**
```bash
# Health check
curl https://api.futureos.live/health

# Test contact form API
curl -X POST https://api.futureos.live/api/send-email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### **10.2 Test Frontend**
1. Visit `https://futureos.live`
2. Test all forms (Contact, Testimonials, FDP Registration)
3. Verify payment flow completion
4. Check access control on protected pages

---

## **Step 11: Monitoring and Maintenance**

### **11.1 Basic Monitoring Setup**
```bash
# Check application status
pm2 status
pm2 logs edunexa-backend

# Check Nginx status
sudo systemctl status nginx

# Check disk usage
df -h

# Check memory usage
free -h

# Check PostgreSQL status
sudo systemctl status postgresql
```

### **11.2 Log Rotation**
```bash
# Setup log rotation for PM2
pm2 install pm2-logrotate
```

### **11.3 Regular Maintenance**
```bash
# Weekly system updates
sudo apt update && sudo apt upgrade -y

# Monthly backup (when database is used)
pg_dump -U edunexa_user edunexa_db > backup_$(date +%Y%m%d).sql
```

---

## **Step 12: Performance Optimization**

### **12.1 Enable Nginx Compression**
Already configured in Nginx config above.

### **12.2 Setup Swap (for 512MB RAM)**
```bash
# Create 1GB swap file
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# Make permanent
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## **Troubleshooting**

### **Common Issues:**

**1. "502 Bad Gateway"**
- Check if backend is running: `pm2 status`
- Check backend logs: `pm2 logs edunexa-backend`
- Restart backend: `pm2 restart edunexa-backend`

**2. "Failed to Send Message" Errors**
- Verify SendGrid API key in `.env`
- Check backend logs for email errors
- Test API endpoint directly with curl

**3. Domain Not Loading**
- Check DNS propagation: `nslookup futureos.live`
- Verify Nginx configuration: `sudo nginx -t`
- Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

**4. SSL Certificate Issues**
- Verify domain points to correct IP
- Re-run certbot: `sudo certbot --nginx`
- Check certificate status: `sudo certbot certificates`

---

## **Expected Performance**

**With 512MB RAM Droplet:**
- **Frontend**: Fast (static files served by Nginx)
- **Backend**: Adequate for 40-50 requests/month
- **Database**: PostgreSQL will use ~50-100MB RAM
- **Overall**: Suitable for low-traffic educational website

**Monthly Costs:**
- DigitalOcean: $4
- Domain: Already owned
- **Total: $4/month**

---

## **Future Upgrades**

When traffic increases:
1. Upgrade to $12/month droplet (1GB RAM, 2 vCPUs)
2. Add CDN (DigitalOcean Spaces + CDN)
3. Separate database to managed PostgreSQL
4. Implement Redis for caching

---

**Note**: This setup is optimized for minimal cost and low traffic. Monitor resource usage and upgrade as needed when traffic grows.
