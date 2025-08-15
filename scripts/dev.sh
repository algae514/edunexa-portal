#!/bin/bash

# Local Development Server Script for EduNexa Portal

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

# Check environment files
check_env() {
    if [ ! -f ".env" ]; then
        warn "Frontend .env file not found, creating from example..."
        cp .env.example .env
    fi
    
    if [ ! -f "backend/.env" ]; then
        warn "Backend .env file not found, creating from example..."
        cp backend/.env.example backend/.env
    fi
    
    log "Environment files checked ✓"
}

# Install dependencies
install_deps() {
    log "Installing frontend dependencies..."
    npm install
    
    log "Installing backend dependencies..."
    cd backend
    npm install
    cd ..
    
    log "Dependencies installed ✓"
}

# Start services in development mode
start_dev_servers() {
    log "Starting development servers..."
    
    # Kill any existing processes on our ports
    pkill -f "node.*5000" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    # Start backend in background
    cd backend
    npm run dev &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 2
    
    # Start frontend in background
    npm run dev &
    FRONTEND_PID=$!
    
    # Store PIDs for cleanup
    echo $BACKEND_PID > .backend.pid
    echo $FRONTEND_PID > .frontend.pid
    
    log "Development servers started!"
    log "Frontend: http://localhost:5173"
    log "Backend: http://localhost:5000"
    log "Backend health: http://localhost:5000/health"
    
    # Wait for user to stop
    log "Press Ctrl+C to stop servers..."
    
    # Trap Ctrl+C to cleanup
    trap cleanup EXIT
    
    # Wait for processes
    wait $FRONTEND_PID $BACKEND_PID 2>/dev/null
}

# Cleanup function
cleanup() {
    log "Stopping development servers..."
    
    if [ -f .backend.pid ]; then
        kill $(cat .backend.pid) 2>/dev/null || true
        rm .backend.pid
    fi
    
    if [ -f .frontend.pid ]; then
        kill $(cat .frontend.pid) 2>/dev/null || true
        rm .frontend.pid
    fi
    
    # Kill any remaining processes
    pkill -f "node.*5000" 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    
    log "Development servers stopped ✓"
}

# Main function
main() {
    log "Starting EduNexa Portal in development mode..."
    
    check_env
    install_deps
    start_dev_servers
}

# Run main function
main
