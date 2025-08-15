# Deployment Guide - EduNexa Portal

## Quick Reference

**Production Server**: `104.248.154.133`  
**Live Site**: https://futureos.live  
**API**: https://api.futureos.live  
**Repository**: https://github.com/algae514/edunexa-portal  

---

## 🚀 How to Deploy Changes

### 1. **Frontend Changes Only**
```bash
# Local development and build
npm run build

# Deploy to server
scp -r dist/* root@104.248.154.133:/var/www/edunexa/
```

### 2. **Backend Changes Only**
```bash
# Push changes to GitHub
git add .
git commit -m "Your change description"
git push

# Deploy on server
ssh root@104.248.154.133
su - deployer
cd edunexa-portal
git pull
cd backend
pm2 restart edunexa-backend
```

### 3. **Full Application Update**
```bash
# Push all changes
git add .
git commit -m "Your change description" 
git push

# Deploy on server
ssh root@104.248.154.133
su - deployer
cd edunexa-portal
git pull

# Update backend
cd backend
pm2 restart edunexa-backend

# Update frontend
cd ..
npm run build
sudo cp -r dist/* /var/www/edunexa/
sudo chown -R www-data:www-data /var/www/edunexa
```

---

## 🛠️ Environment Configuration

### Backend Environment Variables (.env)
```env
NODE_ENV=production
PORT=5000
SMTP_USER=balu.in.u@gmail.com
SMTP_PASS=legu sjok srbb ocgn
FROM_EMAIL=noreply@futureos.live
TO_EMAIL=support@futureos.live
FRONTEND_URL=https://futureos.live
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### Frontend Environment Variables (.env.production)
```env
VITE_API_URL=https://api.futureos.live
```

---

## 📋 Common Commands

### Server Management
```bash
# SSH into server
ssh root@104.248.154.133

# Switch to app user
su - deployer

# Check application status
pm2 status

# View backend logs
pm2 logs edunexa-backend

# Restart backend
pm2 restart edunexa-backend

# Check nginx status
sudo systemctl status nginx

# Check disk space
df -h

# Check memory usage
free -h
```

### Application Health Checks
```bash
# Test backend API
curl https://api.futureos.live/health

# Test frontend
curl -I https://futureos.live

# Test email endpoint
curl -X POST https://api.futureos.live/api/send-email/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"Test","lastName":"User","email":"test@example.com","subject":"Test","message":"Testing"}'
```

---

## 🔧 Troubleshooting

### Backend Issues
```bash
# Check backend logs
pm2 logs edunexa-backend --lines 50

# Restart if crashed
pm2 restart edunexa-backend

# Check port 5000 is listening
netstat -tlnp | grep :5000
```

### Frontend Issues
```bash
# Check nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx

# Check nginx logs
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate Issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates manually
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

### Email Issues
```bash
# Check backend logs for email errors
pm2 logs edunexa-backend | grep -i email

# Test email configuration
# (Check if SMTP_USER and SMTP_PASS are correct in .env)
```

---

## 📦 Directory Structure

```
/home/deployer/edunexa-portal/
├── backend/
│   ├── src/
│   ├── .env (production config)
│   └── package.json
├── frontend/
│   ├── dist/ (built files)
│   └── src/
└── docs/

/var/www/edunexa/ (nginx web root)
├── index.html
├── assets/
└── (frontend build files)
```

---

## 🚨 Emergency Procedures

### If Site is Down
1. **Check services**: `pm2 status` and `sudo systemctl status nginx`
2. **Check logs**: `pm2 logs` and `sudo tail /var/log/nginx/error.log`
3. **Restart services**: `pm2 restart all` and `sudo systemctl restart nginx`
4. **Check disk space**: `df -h` (if disk full, clean logs)

### If Email Not Working
1. **Check backend logs**: `pm2 logs edunexa-backend`
2. **Verify credentials**: Check `.env` file has correct SMTP settings
3. **Test Gmail login**: Ensure app password is still valid
4. **Restart backend**: `pm2 restart edunexa-backend`

### If Domain Not Resolving
1. **Check DNS**: `nslookup futureos.live`
2. **Check nginx config**: `sudo nginx -t`
3. **Check SSL**: `sudo certbot certificates`

---

## 🔄 Automated Deployment Script

For quick deployments, use this script:

```bash
#!/bin/bash
# Save as: deploy.sh

echo "🚀 Deploying to EduNexa Portal..."

# Build frontend
npm run build

# Deploy to server
scp -r dist/* root@104.248.154.133:/var/www/edunexa/

# Update backend
ssh root@104.248.154.133 'su - deployer -c "cd edunexa-portal && git pull && pm2 restart edunexa-backend"'

echo "✅ Deployment complete!"
echo "🌐 Check: https://futureos.live"
```

---

## 📊 Performance Monitoring

### Server Resources
- **RAM**: 512MB (check with `free -h`)
- **Disk**: 10GB (check with `df -h`) 
- **CPU**: 1 vCPU (check with `top`)
- **Swap**: 1GB enabled

### Application Metrics
- **Backend Memory**: ~25-45MB (normal)
- **Frontend**: Static files (cached by nginx)
- **SSL**: Auto-renewal enabled

---

## 🔐 Security Notes

- **Firewall**: UFW enabled (SSH, HTTP, HTTPS only)
- **User**: Non-root deployer user for applications
- **SSL**: Let's Encrypt certificates auto-renewing
- **Email**: Gmail app password (not regular password)
- **Environment**: Production secrets in .env files

---

## 📞 Support Information

**Server Details:**
- Provider: DigitalOcean
- Region: Singapore (SGP1)
- Cost: $4/month
- IP: 104.248.154.133

**Credentials:**
- Root password: `_Zerocode@2025s`
- Gmail: `balu.in.u@gmail.com`
- App Password: `legu sjok srbb ocgn`

**Important Files:**
- Backend config: `/home/deployer/edunexa-portal/backend/.env`
- Nginx config: `/etc/nginx/sites-available/edunexa`
- SSL certs: `/etc/letsencrypt/live/futureos.live/`
- PM2 config: `/home/deployer/.pm2/`

---

*Last updated: August 15, 2025*
