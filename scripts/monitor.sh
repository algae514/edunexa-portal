#!/bin/bash

# Monitoring Script for EduNexa Portal

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
}

# Check system resources
check_system() {
    log "=== System Resources ==="
    
    # CPU usage
    cpu_usage=$(top -bn1 | grep "Cpu(s)" | awk '{print $2}' | awk -F'%' '{print $1}')
    echo "CPU Usage: ${cpu_usage}%"
    
    # Memory usage
    free -h
    
    # Disk usage
    echo ""
    df -h
    
    # Load average
    echo ""
    uptime
}

# Check services status
check_services() {
    log "=== Services Status ==="
    
    # PM2 status
    echo "PM2 Processes:"
    pm2 status || warn "PM2 not running or not found"
    
    echo ""
    echo "Nginx Status:"
    sudo systemctl status nginx --no-pager -l | head -5
    
    echo ""
    echo "PostgreSQL Status:"
    sudo systemctl status postgresql --no-pager -l | head -5
}

# Check application health
check_app_health() {
    log "=== Application Health ==="
    
    # Backend health check
    if curl -f -s http://localhost:5000/health > /dev/null; then
        log "Backend: ✓ Healthy"
    else
        error "Backend: ✗ Unhealthy"
    fi
    
    # Check if frontend files exist
    if [ -f "/var/www/edunexa/index.html" ]; then
        log "Frontend: ✓ Files deployed"
    else
        warn "Frontend: ✗ Files missing"
    fi
    
    # Check domain accessibility (if on server)
    if command -v dig &> /dev/null; then
        if dig +short futureos.live | grep -q "^[0-9]"; then
            log "DNS: ✓ futureos.live resolves"
        else
            warn "DNS: ✗ futureos.live not resolving"
        fi
    fi
}

# Check logs for errors
check_logs() {
    log "=== Recent Logs ==="
    
    echo "PM2 Logs (last 20 lines):"
    pm2 logs --lines 20 || warn "No PM2 logs available"
    
    echo ""
    echo "Nginx Error Logs (last 10 lines):"
    sudo tail -10 /var/log/nginx/error.log 2>/dev/null || warn "No Nginx error logs"
}

# Performance metrics
check_performance() {
    log "=== Performance Metrics ==="
    
    # Network connections
    echo "Active connections:"
    ss -tuln | grep -E ':80|:443|:5000' || echo "No web connections found"
    
    echo ""
    echo "Process memory usage:"
    ps aux --sort=-%mem | head -10
}

# SSL certificate check
check_ssl() {
    log "=== SSL Certificate Status ==="
    
    if command -v certbot &> /dev/null; then
        sudo certbot certificates 2>/dev/null || warn "No SSL certificates found"
    else
        warn "Certbot not installed"
    fi
}

# Generate summary report
generate_summary() {
    log "=== Summary Report ==="
    
    # Count issues
    issues=0
    
    # Check critical services
    if ! pgrep -f "node.*5000" > /dev/null; then
        error "❌ Backend process not running"
        ((issues++))
    else
        log "✅ Backend process running"
    fi
    
    if ! sudo systemctl is-active nginx --quiet; then
        error "❌ Nginx not running"
        ((issues++))
    else
        log "✅ Nginx running"
    fi
    
    # Check disk space
    disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
    if [ "$disk_usage" -gt 80 ]; then
        warn "⚠️  High disk usage: ${disk_usage}%"
        ((issues++))
    else
        log "✅ Disk usage OK: ${disk_usage}%"
    fi
    
    # Check memory
    mem_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
    if [ "$mem_usage" -gt 90 ]; then
        warn "⚠️  High memory usage: ${mem_usage}%"
        ((issues++))
    else
        log "✅ Memory usage OK: ${mem_usage}%"
    fi
    
    echo ""
    if [ $issues -eq 0 ]; then
        log "🎉 All systems operational!"
    else
        warn "⚠️  Found $issues issues that need attention"
    fi
}

# Main function
main() {
    log "EduNexa Portal System Monitor"
    echo ""
    
    check_system
    echo ""
    check_services
    echo ""
    check_app_health
    echo ""
    check_ssl
    echo ""
    generate_summary
    
    echo ""
    log "Monitoring complete. Run 'pm2 monit' for real-time monitoring."
}

# Handle script arguments
case "${1:-}" in
    "system")
        check_system
        ;;
    "services")
        check_services
        ;;
    "health")
        check_app_health
        ;;
    "logs")
        check_logs
        ;;
    "performance")
        check_performance
        ;;
    "ssl")
        check_ssl
        ;;
    *)
        main
        ;;
esac
