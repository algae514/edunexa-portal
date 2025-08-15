const winston = require('winston');

// Initialize logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log' })
  ]
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error('Application error', {
    error: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Default error response
  let statusCode = 500;
  let message = 'Internal server error';

  // Handle specific error types
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  } else if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  } else if (err.message.includes('Failed to send email')) {
    statusCode = 503;
    message = 'Email service temporarily unavailable';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
};

// 404 handler
const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
};

module.exports = {
  errorHandler,
  notFoundHandler
};
