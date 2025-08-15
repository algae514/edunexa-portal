#!/bin/bash

# Nginx Configuration Script for EduNexa Portal

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warn() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Create Nginx configuration
create_nginx_config() {
    log "Creating Nginx configuration..."
    
    sudo tee /etc/nginx/sites-available/edunexa > /dev/null << 'EOF'
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
EOF
    
    log "Nginx configuration created ✓"
}

# Enable configuration
enable_nginx_config() {
    log "Enabling Nginx configuration..."
    
    # Remove default configuration
    sudo rm -f /etc/nginx/sites-enabled/default
    
    # Enable our configuration
    sudo ln -sf /etc/nginx/sites-available/edunexa /etc/nginx/sites-enabled/
    
    # Test configuration
    sudo nginx -t
    
    # Restart Nginx
    sudo systemctl restart nginx
    
    log "Nginx configuration enabled and restarted ✓"
}

# Install Certbot for SSL
install_certbot() {
    log "Installing Certbot for SSL certificates..."
    
    sudo apt install snapd -y
    sudo snap install core
    sudo snap refresh core
    sudo snap install --classic certbot
    sudo ln -sf /snap/bin/certbot /usr/bin/certbot
    
    log "Certbot installed ✓"
}

# Setup SSL certificates
setup_ssl() {
    log "Setting up SSL certificates..."
    
    # Get certificates for all domains
    sudo certbot --nginx -d futureos.live -d www.futureos.live -d api.futureos.live --non-interactive --agree-tos --email support@futureos.live
    
    # Test auto-renewal
    sudo certbot renew --dry-run
    
    log "SSL certificates configured ✓"
}

# Main function
main() {
    log "Configuring Nginx for EduNexa Portal..."
    
    create_nginx_config
    enable_nginx_config
    install_certbot
    
    log "Nginx configuration complete!"
    log "To setup SSL certificates, run: sudo certbot --nginx -d futureos.live -d www.futureos.live -d api.futureos.live"
    log "Note: Ensure your domains are pointing to this server before running SSL setup"
}

# Run main function
main
