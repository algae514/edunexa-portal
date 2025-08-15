#!/bin/bash

# Start Services Script for EduNexa Portal
# Run this after deploying code to start/restart services

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

# Setup backend
setup_backend() {
    log "Setting up backend..."
    
    cd ~/apps/edunexa-backend || error "Backend directory not found"
    
    # Install dependencies
    npm install --production
    
    # Stop existing PM2 process if running
    pm2 delete edunexa-backend 2>/dev/null || true
    
    # Start backend with PM2
    pm2 start src/app.js --name "edunexa-backend"
    
    # Save PM2 configuration
    pm2 save
    
    cd ..
    log "Backend started ✓"
}

# Setup frontend
setup_frontend() {
    log "Setting up frontend..."
    
    if [ -d ~/apps/edunexa-frontend ]; then
        # Copy built frontend files
        sudo cp -r ~/apps/edunexa-frontend/* /var/www/edunexa/
        sudo chown -R www-data:www-data /var/www/edunexa
        log "Frontend deployed ✓"
    else
        error "Frontend directory not found"
    fi
}

# Check services status
check_services() {
    log "Checking services status..."
    
    # Check PM2 status
    pm2 status
    
    # Check Nginx status
    sudo systemctl status nginx --no-pager -l
    
    # Check if backend is responding
    sleep 2
    if curl -f http://localhost:5000/health 2>/dev/null; then
        log "Backend health check passed ✓"
    else
        warn "Backend health check failed"
    fi
}

# Main function
main() {
    log "Starting EduNexa Portal services..."
    
    setup_backend
    setup_frontend
    check_services
    
    log "All services started successfully! ✓"
    log "Backend running on: http://localhost:5000"
    log "Frontend served from: /var/www/edunexa"
    log "PM2 status: pm2 status"
    log "PM2 logs: pm2 logs edunexa-backend"
}

# Run main function
main
