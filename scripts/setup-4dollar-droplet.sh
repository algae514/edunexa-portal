#!/bin/bash

# $4/month Droplet Setup for EduNexa Portal
# This script will create the smallest DigitalOcean droplet and deploy your app

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Step 1: Create Droplet Instructions
show_droplet_creation() {
    log "🚀 Creating $4/month DigitalOcean Droplet for EduNexa Portal"
    echo ""
    echo "=== STEP 1: Create Droplet ==="
    echo "1. Go to: https://cloud.digitalocean.com/droplets"
    echo "2. Click 'Create Droplet'"
    echo "3. Select:"
    echo "   ✓ Ubuntu 22.04 LTS"
    echo "   ✓ Basic Plan: $4/month (512MB RAM, 1 vCPU, 10GB SSD)"
    echo "   ✓ Region: Bangalore 1 (closest to India)"
    echo "   ✓ Add your SSH key (create if needed)"
    echo "   ✓ Hostname: edunexa-server"
    echo ""
    echo "4. Click 'Create Droplet'"
    echo "5. Note down the IP address once created"
    echo ""
}

# Step 2: Server Setup Commands
show_server_setup() {
    echo "=== STEP 2: Setup Server ==="
    echo ""
    echo "SSH into your server:"
    echo "ssh root@YOUR_DROPLET_IP"
    echo ""
    echo "Run these commands on the server:"
    echo ""
    cat << 'EOF'
# Update system
apt update && apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Install PM2 and Nginx
npm install -g pm2
apt install nginx -y

# Create app user
adduser --disabled-password --gecos "" deployer
usermod -aG sudo deployer
mkdir -p /home/deployer/.ssh
cp ~/.ssh/authorized_keys /home/deployer/.ssh/
chown -R deployer:deployer /home/deployer/.ssh

# Setup firewall
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Create web directory
mkdir -p /var/www/edunexa
chown deployer:deployer /var/www/edunexa

# Enable swap (important for 512MB)
fallocate -l 1G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
echo '/swapfile none swap sw 0 0' >> /etc/fstab

echo "✅ Server setup complete!"
EOF
    echo ""
}

# Step 3: Deploy Application
show_app_deployment() {
    echo "=== STEP 3: Deploy Application ==="
    echo ""
    echo "Switch to deployer user and deploy:"
    echo "su - deployer"
    echo ""
    cat << 'EOF'
# Clone repository
git clone https://github.com/algae514/edunexa-portal.git
cd edunexa-portal

# Setup backend
cd backend
npm install --production
cp .env.example .env
nano .env  # Add your SendGrid API key

# Start backend with PM2
pm2 start src/app.js --name "edunexa-backend"
pm2 save
pm2 startup  # Follow the instructions

# Build and deploy frontend
cd ..
npm install
npm run build

# Copy frontend files
sudo cp -r dist/* /var/www/edunexa/
sudo chown -R www-data:www-data /var/www/edunexa

echo "✅ Application deployed!"
EOF
    echo ""
}

# Step 4: Configure Nginx
show_nginx_config() {
    echo "=== STEP 4: Configure Nginx ==="
    echo ""
    echo "Create Nginx configuration:"
    echo "sudo nano /etc/nginx/sites-available/edunexa"
    echo ""
    cat << 'EOF'
# Add this content:
server {
    listen 80;
    server_name futureos.live www.futureos.live;
    
    root /var/www/edunexa;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;
}

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
EOF
    echo ""
    echo "Enable the configuration:"
    cat << 'EOF'
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/edunexa /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
EOF
    echo ""
}

# Step 5: Setup SSL
show_ssl_setup() {
    echo "=== STEP 5: Setup SSL (Free) ==="
    echo ""
    cat << 'EOF'
# Install Certbot
sudo apt install snapd -y
sudo snap install core
sudo snap refresh core
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Get SSL certificates (ensure DNS is pointing to your server first)
sudo certbot --nginx -d futureos.live -d www.futureos.live -d api.futureos.live

# Test auto-renewal
sudo certbot renew --dry-run
EOF
    echo ""
}

# Step 6: DNS Configuration
show_dns_config() {
    echo "=== STEP 6: Configure DNS ==="
    echo ""
    echo "Add these A records in GoDaddy DNS for futureos.live:"
    echo "┌──────────┬────────┬─────────────────┐"
    echo "│ Type     │ Name   │ Value           │"
    echo "├──────────┼────────┼─────────────────┤"
    echo "│ A        │ @      │ YOUR_DROPLET_IP │"
    echo "│ A        │ www    │ YOUR_DROPLET_IP │" 
    echo "│ A        │ api    │ YOUR_DROPLET_IP │"
    echo "└──────────┴────────┴─────────────────┘"
    echo ""
    echo "Wait 15 minutes for DNS propagation, then setup SSL"
    echo ""
}

# Step 7: Quick Commands
show_quick_commands() {
    echo "=== USEFUL COMMANDS ==="
    echo ""
    echo "Check application status:"
    echo "pm2 status"
    echo "pm2 logs edunexa-backend"
    echo "sudo systemctl status nginx"
    echo ""
    echo "Test endpoints:"
    echo "curl http://YOUR_DROPLET_IP:5000/health"
    echo "curl http://YOUR_DROPLET_IP"
    echo ""
    echo "Update application:"
    echo "cd ~/edunexa-portal"
    echo "git pull"
    echo "cd backend && npm install --production"
    echo "pm2 restart edunexa-backend"
    echo "cd .. && npm run build"
    echo "sudo cp -r dist/* /var/www/edunexa/"
    echo ""
}

# Main execution
main() {
    log "EduNexa Portal - $4/month Droplet Setup Guide"
    echo ""
    echo "📁 Repository: https://github.com/algae514/edunexa-portal"
    echo "💰 Monthly Cost: $4 (DigitalOcean Droplet)"
    echo "🌍 Domain: futureos.live (already owned)"
    echo ""
    
    show_droplet_creation
    show_dns_config
    show_server_setup
    show_app_deployment
    show_nginx_config
    show_ssl_setup
    show_quick_commands
    
    log "🎉 Setup guide complete!"
    log "Total time: ~15 minutes (excluding DNS propagation)"
    log "Your app will be available at: https://futureos.live"
}

main
