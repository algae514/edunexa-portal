#!/bin/bash

# Create DigitalOcean Droplet for EduNexa Portal
# This script creates a droplet but you can also use the web interface

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

# Configuration
DROPLET_NAME="edunexa-portal-server"
DROPLET_SIZE="s-1vcpu-1gb"  # $6/month
DROPLET_REGION="blr1"  # Bangalore
DROPLET_IMAGE="ubuntu-22-04-x64"

show_instructions() {
    log "EduNexa Portal Server Creation Instructions"
    echo ""
    echo "=== OPTION 1: Manual Droplet Creation (Recommended for learning) ==="
    echo ""
    echo "1. Go to DigitalOcean dashboard: https://cloud.digitalocean.com/droplets"
    echo "2. Click 'Create Droplet'"
    echo "3. Configure:"
    echo "   - Image: Ubuntu 22.04 LTS"
    echo "   - Plan: Basic - \$6/month (1 vCPU, 1GB RAM)"
    echo "   - Region: Bangalore 1 (blr1) - closest to your location"
    echo "   - Authentication: SSH Key (add your public key)"
    echo "   - Hostname: $DROPLET_NAME"
    echo ""
    echo "4. After creation, note the IP address"
    echo "5. Update scripts/quick-deploy.sh with SERVER_IP"
    echo "6. Upload and run setup scripts"
    echo ""
    echo "=== OPTION 2: DigitalOcean App Platform (Recommended for production) ==="
    echo ""
    echo "1. Go to: https://cloud.digitalocean.com/apps"
    echo "2. Click 'Create App'"
    echo "3. Connect your GitHub repository"
    echo "4. Use the app-spec.json configuration"
    echo "5. Estimated cost: \$12-15/month"
    echo "6. Automatic deployments, SSL, scaling"
    echo ""
    echo "=== OPTION 3: Use our deployment scripts ==="
    echo ""
    echo "After creating droplet manually:"
    echo "1. ssh root@YOUR_DROPLET_IP"
    echo "2. Create user: adduser deployer && usermod -aG sudo deployer"
    echo "3. Setup SSH keys for deployer user"
    echo "4. Exit and ssh deployer@YOUR_DROPLET_IP"
    echo "5. Upload server-setup.sh and run it"
    echo "6. Use deploy.sh to create deployment package"
    echo "7. Use quick-deploy.sh for updates"
    echo ""
}

show_dns_instructions() {
    echo ""
    echo "=== DNS Configuration for futureos.live ==="
    echo ""
    echo "Add these A records in GoDaddy DNS:"
    echo "Type: A, Name: @, Value: YOUR_DROPLET_IP"
    echo "Type: A, Name: www, Value: YOUR_DROPLET_IP"
    echo "Type: A, Name: api, Value: YOUR_DROPLET_IP"
    echo ""
    echo "Wait 15 minutes to 24 hours for DNS propagation"
    echo "Test with: nslookup futureos.live"
    echo ""
}

show_cost_breakdown() {
    echo ""
    echo "=== Cost Breakdown ==="
    echo ""
    echo "Manual Droplet:"
    echo "- DigitalOcean Droplet: \$6/month"
    echo "- Domain: Already owned"
    echo "- Total: \$6/month"
    echo ""
    echo "App Platform:"
    echo "- Frontend (Static Site): \$3/month"
    echo "- Backend (Basic): \$12/month"
    echo "- Domain: Already owned"
    echo "- Total: \$15/month"
    echo ""
    echo "App Platform benefits:"
    echo "- Automatic deployments"
    echo "- Built-in SSL certificates"
    echo "- Auto-scaling"
    echo "- Monitoring & logs"
    echo "- No server management"
    echo ""
}

main() {
    show_instructions
    show_dns_instructions
    show_cost_breakdown
    
    echo ""
    log "Next steps:"
    echo "1. Choose your deployment method above"
    echo "2. For manual droplet: Update SERVER_IP in scripts/quick-deploy.sh"
    echo "3. For App Platform: Push code to GitHub and use app-spec.json"
    echo "4. Configure DNS records for futureos.live"
    echo ""
    log "All deployment scripts are ready in the ./scripts/ directory"
    log "Run ./scripts/dev.sh to test locally first"
}

main
