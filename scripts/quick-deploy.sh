#!/bin/bash

# Quick Deployment Script for EduNexa Portal
# Run this for fast updates after initial setup

set -e

# Configuration
SERVER_IP="YOUR_SERVER_IP"
SERVER_USER="deployer"

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

# Check if SERVER_IP is set
check_config() {
    if [ "$SERVER_IP" = "YOUR_SERVER_IP" ]; then
        error "Please set SERVER_IP in this script or as environment variable"
    fi
    
    log "Target server: $SERVER_IP"
}

# Build and package
build_and_package() {
    log "Building frontend..."
    npm run build
    
    log "Creating quick deployment package..."
    tar -czf quick-deploy.tar.gz dist/ backend/src/ backend/package.json
    
    log "Package created: quick-deploy.tar.gz"
}

# Deploy to server
deploy_to_server() {
    log "Uploading to server..."
    scp quick-deploy.tar.gz $SERVER_USER@$SERVER_IP:~/
    
    log "Extracting and updating on server..."
    ssh $SERVER_USER@$SERVER_IP << 'EOF'
        # Extract package
        tar -xzf quick-deploy.tar.gz
        
        # Update frontend
        sudo cp -r dist/* /var/www/edunexa/
        sudo chown -R www-data:www-data /var/www/edunexa
        
        # Update backend
        cd ~/apps/edunexa-backend
        cp -r ~/backend/src/* src/
        cp ~/backend/package.json .
        
        # Restart backend
        npm install --production
        pm2 restart edunexa-backend
        
        # Cleanup
        cd ~
        rm -rf quick-deploy.tar.gz dist/ backend/
        
        echo "Deployment complete!"
EOF
    
    # Cleanup local files
    rm -f quick-deploy.tar.gz
    
    log "Quick deployment completed successfully! ✓"
}

# Check deployment
check_deployment() {
    log "Checking deployment status..."
    
    # Check backend health
    if curl -f http://$SERVER_IP:5000/health 2>/dev/null; then
        log "Backend is healthy ✓"
    else
        warn "Backend health check failed"
    fi
    
    # Check if frontend is accessible
    if curl -f http://$SERVER_IP 2>/dev/null | grep -q "<!DOCTYPE html>"; then
        log "Frontend is accessible ✓"
    else
        warn "Frontend accessibility check failed"
    fi
}

# Main function
main() {
    log "Starting quick deployment..."
    
    check_config
    build_and_package
    deploy_to_server
    check_deployment
    
    log "Quick deployment finished!"
    log "Your app should be available at: http://$SERVER_IP"
}

# Run main function
main
