# EduNexa Portal - Production Deployment Guide

## Overview
This guide covers deploying the complete EduNexa Portal with backend email service to production.

## Architecture
- **Frontend**: React + TypeScript + Vite (Static Site)
- **Backend**: Node.js + Express (Email Service API)
- **Email Service**: SendGrid (recommended) or SMTP fallback

## Prerequisites
- Domain name configured
- SendGrid account (or SMTP credentials)
- Hosting platform account (Railway, Vercel, Netlify, etc.)

---

## Backend Deployment

### Option 1: Railway (Recommended)

1. **Push to GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Initial backend commit"
   git remote add origin https://github.com/yourusername/edunexa-backend.git
   git push -u origin main
   ```

2. **Deploy on Railway**
   - Connect Railway to your GitHub repository
   - Set environment variables in Railway dashboard:
   ```env
   NODE_ENV=production
   PORT=5000
   SENDGRID_API_KEY=your_production_sendgrid_key
   FROM_EMAIL=noreply@futureos.live
   TO_EMAIL=support@futureos.live
   FRONTEND_URL=https://your-frontend-domain.com
   ```

3. **Custom Domain** (Optional)
   - Add custom domain in Railway dashboard
   - Update DNS records as instructed

### Option 2: Heroku

1. **Install Heroku CLI and login**
   ```bash
   heroku login
   ```

2. **Create and deploy**
   ```bash
   cd backend
   heroku create edunexa-email-service
   heroku config:set NODE_ENV=production
   heroku config:set SENDGRID_API_KEY=your_key
   heroku config:set FROM_EMAIL=noreply@futureos.live
   heroku config:set TO_EMAIL=support@futureos.live
   heroku config:set FRONTEND_URL=https://your-frontend-domain.com
   git push heroku main
   ```

### Option 3: VPS with PM2

1. **Server Setup**
   ```bash
   # Install Node.js, npm, PM2
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo npm install -g pm2
   ```

2. **Deploy Code**
   ```bash
   # Clone and setup
   git clone https://github.com/yourusername/edunexa-backend.git
   cd edunexa-backend
   npm install
   
   # Configure environment
   cp .env.example .env
   # Edit .env with production values
   
   # Start with PM2
   pm2 start src/app.js --name "edunexa-email-service"
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Build Configuration**
   ```bash
   # Create vercel.json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

2. **Environment Variables in Vercel**
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

3. **Deploy**
   ```bash
   npx vercel
   # Follow prompts and configure domain
   ```

### Option 2: Netlify

1. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Environment Variables in Netlify**
   ```env
   VITE_API_URL=https://your-backend-domain.com
   ```

### Option 3: Static Hosting (GitHub Pages, S3, etc.)

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your static hosting service

---

## Email Service Configuration

### SendGrid Setup (Recommended)

1. **Create SendGrid Account**
   - Sign up at https://sendgrid.com
   - Verify your sender email domain

2. **Create API Key**
   - Go to Settings > API Keys
   - Create new key with "Mail Send" permissions
   - Copy the key for environment variables

3. **Domain Authentication** (Important for deliverability)
   - Go to Settings > Sender Authentication
   - Authenticate your domain
   - Add DNS records as instructed

### SMTP Fallback Setup

If not using SendGrid, configure SMTP:

```env
# Instead of SENDGRID_API_KEY, use:
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**Gmail App Password Setup:**
1. Enable 2-factor authentication
2. Generate app password: Account > Security > App passwords
3. Use the generated password (not your regular password)

---

## Domain and DNS Configuration

### Frontend Domain
Point your main domain to frontend hosting:
```
A record: @ → Frontend hosting IP
CNAME: www → your-frontend-domain.com
```

### Backend Subdomain
Point API subdomain to backend hosting:
```
CNAME: api → your-backend-domain.com
```

### Email Domain
Configure SPF, DKIM, DMARC for email deliverability:
```
TXT record: @ → "v=spf1 include:sendgrid.net ~all"
TXT record: _dmarc → "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"
```

---

## Environment Variables Summary

### Backend (.env)
```env
NODE_ENV=production
PORT=5000
SENDGRID_API_KEY=SG.your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
TO_EMAIL=support@yourdomain.com
FRONTEND_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### Frontend (.env)
```env
VITE_API_URL=https://api.yourdomain.com
```

---

## Testing Production Deployment

### Backend Health Check
```bash
curl https://api.yourdomain.com/health
```

### Email API Test
```bash
curl -X POST https://api.yourdomain.com/api/send-email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message"
  }'
```

### Frontend Test
1. Visit https://yourdomain.com
2. Test all forms (Contact, Testimonials, FDP Registration)
3. Verify payment flow completion
4. Check access control on protected pages

---

## Monitoring and Maintenance

### Backend Monitoring
- Monitor logs for errors
- Set up uptime monitoring (UptimeRobot, Pingdom)
- Monitor email delivery rates

### Performance Optimization
- Enable gzip compression
- Configure CDN for static assets
- Monitor Core Web Vitals

### Security Checklist
- ✅ HTTPS enabled
- ✅ CORS properly configured
- ✅ Rate limiting active
- ✅ Input validation working
- ✅ Error handling not exposing sensitive data

---

## Troubleshooting

### Common Issues

**Email not sending:**
- Check SendGrid API key is valid
- Verify domain authentication
- Check rate limits
- Review server logs

**CORS errors:**
- Ensure FRONTEND_URL matches actual domain
- Check protocol (http vs https)
- Verify domain spelling

**Form submissions failing:**
- Check API endpoint URLs
- Verify environment variables
- Test backend health endpoint

### Support
For deployment issues:
- Check server logs in hosting platform
- Verify all environment variables
- Test API endpoints individually
- Contact hosting platform support if needed

---

## Cost Estimation

### Monthly Costs (Approximate)
- **Frontend Hosting**: $0-10 (Vercel/Netlify free tier)
- **Backend Hosting**: $5-20 (Railway/Heroku)
- **Email Service**: $0-15 (SendGrid free: 100 emails/day)
- **Domain**: $10-15/year
- **Total**: ~$15-45/month

### Scaling Considerations
- SendGrid: Up to 40K emails/month on free tier
- Backend: Can handle ~1000 form submissions/day
- Frontend: Unlimited traffic on most platforms

This deployment setup is production-ready and suitable for payment gateway approval.
