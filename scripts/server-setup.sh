#!/bin/bash

# Server Setup Script for EduNexa Portal
# Run this on the Digital Ocean droplet

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

# Update system
setup_system() {
    log "Updating system packages..."
    sudo apt update && sudo apt upgrade -y
    
    log "Installing essential packages..."
    sudo apt install -y curl wget git unzip software-properties-common
}

# Install Node.js
install_nodejs() {
    log "Installing Node.js 18.x..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
    
    # Verify installation
    node_version=$(node --version)
    npm_version=$(npm --version)
    log "Node.js installed: $node_version"
    log "npm installed: $npm_version"
}

# Install PostgreSQL
install_postgresql() {
    log "Installing PostgreSQL..."
    sudo apt install postgresql postgresql-contrib -y
    
    # Start and enable PostgreSQL
    sudo systemctl start postgresql
    sudo systemctl enable postgresql
    
    log "PostgreSQL installed and started ✓"
}

# Install PM2
install_pm2() {
    log "Installing PM2 process manager..."
    sudo npm install -g pm2
    
    # Setup PM2 startup script
    pm2 startup | grep -E '^sudo' | sh || true
    
    log "PM2 installed ✓"
}

# Install Nginx
install_nginx() {
    log "Installing Nginx..."
    sudo apt install nginx -y
    
    # Start and enable Nginx
    sudo systemctl start nginx
    sudo systemctl enable nginx
    
    log "Nginx installed and started ✓"
}

# Setup firewall
setup_firewall() {
    log "Setting up UFW firewall..."
    
    # Enable firewall
    sudo ufw --force enable
    
    # Allow necessary ports
    sudo ufw allow ssh
    sudo ufw allow 'Nginx Full'
    sudo ufw allow 80
    sudo ufw allow 443
    
    log "Firewall configured ✓"
}

# Create application directories
setup_directories() {
    log "Creating application directories..."
    
    mkdir -p ~/apps
    sudo mkdir -p /var/www/edunexa
    sudo chown -R $USER:$USER /var/www/edunexa
    
    log "Directories created ✓"
}

# Setup swap file (important for 512MB droplet)
setup_swap() {
    log "Setting up swap file..."
    
    # Check if swap already exists
    if [ -f /swapfile ]; then
        warn "Swap file already exists, skipping..."
        return
    fi
    
    # Create 1GB swap file
    sudo fallocate -l 1G /swapfile
    sudo chmod 600 /swapfile
    sudo mkswap /swapfile
    sudo swapon /swapfile
    
    # Make permanent
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    
    log "Swap file created ✓"
}

# Main setup function
main() {
    log "Starting server setup for EduNexa Portal..."
    
    setup_system
    install_nodejs
    install_postgresql
    install_pm2
    install_nginx
    setup_firewall
    setup_directories
    setup_swap
    
    log "Server setup complete! ✓"
    log "Next steps:"
    log "1. Setup database: sudo -u postgres createdb edunexa_db"
    log "2. Deploy application code"
    log "3. Configure Nginx"
    log "4. Setup SSL certificates"
}

# Run main function
main
