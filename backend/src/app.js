require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Import routes and middleware
const emailRoutes = require('./routes/email');
const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Ensure logs directory exists
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Initialize logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'app.log') })
  ]
});

// Global rate limiting
const globalRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Security and middleware setup
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174'
    ].filter(Boolean);
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(globalRateLimit);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging
app.use((req, res, next) => {
  logger.info('HTTP Request', {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Email service is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/send-email', emailRoutes);

// 404 handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Email service running on port ${PORT}`, {
    port: PORT,
    environment: process.env.NODE_ENV || 'development'
  });
  console.log(`🚀 Email service running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

module.exports = app;
