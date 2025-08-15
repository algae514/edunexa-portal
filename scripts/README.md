# EduNexa Portal Deployment Scripts

This directory contains scripts for deploying and managing the EduNexa Portal application.

## Scripts Overview

### 1. `deploy.sh` - Full Deployment Package
Creates a complete deployment package for production.
```bash
./scripts/deploy.sh [production|staging]
```

### 2. `server-setup.sh` - Initial Server Setup
Sets up a fresh Ubuntu server with all required dependencies.
```bash
./scripts/server-setup.sh
```

### 3. `start-services.sh` - Start Application Services
Starts/restarts the backend and frontend services.
```bash
./scripts/start-services.sh
```

### 4. `nginx-config.sh` - Configure Nginx
Sets up Nginx configuration and SSL certificates.
```bash
./scripts/nginx-config.sh
```

### 5. `quick-deploy.sh` - Fast Updates
For quick deployments after initial setup.
```bash
./scripts/quick-deploy.sh
```

### 6. `dev.sh` - Local Development
Starts local development servers.
```bash
./scripts/dev.sh
```

## Deployment Process

### Initial Server Setup
1. Create DigitalOcean droplet (Ubuntu 22.04)
2. Upload server-setup.sh to the server
3. Run: `chmod +x server-setup.sh && ./server-setup.sh`

### First Deployment
1. Run: `./scripts/deploy.sh production`
2. Upload deployment.tar.gz to server
3. Extract: `tar -xzf deployment.tar.gz`
4. Run: `cd deploy && ./start-services.sh`
5. Configure Nginx: `./nginx-config.sh`

### Subsequent Deployments
Use the quick deployment script:
1. Update SERVER_IP in `scripts/quick-deploy.sh`
2. Run: `./scripts/quick-deploy.sh`

### Local Development
Start development servers:
```bash
./scripts/dev.sh
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=https://api.futureos.live
```

### Backend (backend/.env)
```
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

## Server Requirements

- Ubuntu 22.04 LTS
- 1 vCPU, 1GB RAM minimum (DigitalOcean Basic droplet)
- Node.js 18.x
- PostgreSQL 14+
- Nginx
- PM2 process manager

## Domain Configuration

Ensure these DNS records point to your server:
- `futureos.live` → Server IP
- `www.futureos.live` → Server IP  
- `api.futureos.live` → Server IP

## SSL Certificates

SSL certificates are automatically configured using Let's Encrypt:
```bash
sudo certbot --nginx -d futureos.live -d www.futureos.live -d api.futureos.live
```

## Monitoring

### Check Application Status
```bash
pm2 status
pm2 logs edunexa-backend
sudo systemctl status nginx
```

### Health Checks
- Backend: `curl https://api.futureos.live/health`
- Frontend: `curl https://futureos.live`

## Troubleshooting

### Common Issues

1. **502 Bad Gateway**
   - Check if backend is running: `pm2 status`
   - Restart backend: `pm2 restart edunexa-backend`

2. **Domain not accessible**
   - Check DNS propagation: `nslookup futureos.live`
   - Check Nginx config: `sudo nginx -t`

3. **SSL certificate errors**
   - Renew certificates: `sudo certbot renew`
   - Check certificate status: `sudo certbot certificates`

### Log Locations
- Nginx error logs: `/var/log/nginx/error.log`
- PM2 logs: `pm2 logs`
- Application logs: `~/apps/edunexa-backend/logs/`

## Security Notes

- UFW firewall is enabled with ports 22, 80, 443 open
- All services run as non-root user
- Environment variables contain sensitive data - keep secure
- Regular system updates recommended

## Performance Optimization

- Gzip compression enabled in Nginx
- Static asset caching configured
- 1GB swap file created for memory management
- PM2 handles process restart and monitoring
