#!/bin/bash

# EduNexa Portal Deployment Script
# Usage: ./scripts/deploy.sh [production|staging]

set -e

# Configuration
PROJECT_NAME="edunexa-portal"
DOMAIN="futureos.live"
API_DOMAIN="api.futureos.live"
DEPLOY_ENV=${1:-production}

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

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

# Check if we have required environment variables
check_env() {
    if [ ! -f ".env" ]; then
        error "Missing .env file. Please create one based on .env.example"
    fi
    
    if [ ! -f "backend/.env" ]; then
        error "Missing backend/.env file. Please create one based on backend/.env.example"
    fi
    
    log "Environment files found ✓"
}

# Install dependencies
install_dependencies() {
    log "Installing frontend dependencies..."
    npm install
    
    log "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
}

# Build frontend
build_frontend() {
    log "Building frontend for $DEPLOY_ENV..."
    
    if [ "$DEPLOY_ENV" = "production" ]; then
        npm run build
    else
        npm run build:dev
    fi
    
    log "Frontend build complete ✓"
}

# Archive code for deployment
create_deployment_archive() {
    log "Creating deployment archive..."
    
    # Create temporary directory
    mkdir -p temp/deploy
    
    # Copy frontend build
    cp -r dist temp/deploy/frontend
    
    # Copy backend
    cp -r backend temp/deploy/
    
    # Copy deployment files
    cp scripts/server-setup.sh temp/deploy/
    cp scripts/start-services.sh temp/deploy/
    cp scripts/nginx-config.sh temp/deploy/
    
    # Create archive
    cd temp
    tar -czf ../deployment.tar.gz deploy/
    cd ..
    
    # Cleanup
    rm -rf temp
    
    log "Deployment archive created: deployment.tar.gz ✓"
}

# Main deployment function
main() {
    log "Starting EduNexa Portal deployment for $DEPLOY_ENV environment"
    
    check_env
    install_dependencies
    build_frontend
    create_deployment_archive
    
    log "Deployment package ready!"
    log "Next steps:"
    log "1. Upload deployment.tar.gz to your server"
    log "2. Run: tar -xzf deployment.tar.gz"
    log "3. Run: cd deploy && ./server-setup.sh"
    log "4. Run: ./start-services.sh"
    
    # Show upload command
    if [ -n "$SERVER_IP" ]; then
        log "Upload command:"
        echo "scp deployment.tar.gz deployer@$SERVER_IP:~/"
    else
        warn "Set SERVER_IP environment variable to get upload command"
    fi
}

# Run main function
main
