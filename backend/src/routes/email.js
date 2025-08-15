const express = require('express');
const rateLimit = require('express-rate-limit');
const emailService = require('../services/emailService');
const {
  validateFDPRegistration,
  validateTestimonial,
  validateContact,
  handleValidationErrors
} = require('../middleware/validation');

const router = express.Router();

// Rate limiting for email endpoints
const emailRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
  message: {
    success: false,
    message: 'Too many email requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Apply rate limiting to all email routes
router.use(emailRateLimit);

// FDP Registration Email Endpoint
router.post('/fdp-registration', 
  validateFDPRegistration,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const formData = req.body;
      
      // Generate email content
      const { subject, html } = emailService.generateFDPRegistrationEmail(formData);
      
      // Send email
      const result = await emailService.sendEmail({
        to: process.env.TO_EMAIL,
        subject,
        html
      });

      res.status(200).json({
        success: true,
        message: 'FDP registration request sent successfully',
        messageId: result.messageId
      });
    } catch (error) {
      next(error);
    }
  }
);

// Testimonial Email Endpoint
router.post('/testimonial',
  validateTestimonial,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const formData = req.body;
      
      // Generate email content
      const { subject, html } = emailService.generateTestimonialEmail(formData);
      
      // Send email
      const result = await emailService.sendEmail({
        to: process.env.TO_EMAIL,
        subject,
        html
      });

      res.status(200).json({
        success: true,
        message: 'Testimonial submitted successfully',
        messageId: result.messageId
      });
    } catch (error) {
      next(error);
    }
  }
);

// Contact Form Email Endpoint
router.post('/contact',
  validateContact,
  handleValidationErrors,
  async (req, res, next) => {
    try {
      const formData = req.body;
      
      // Generate email content
      const { subject, html } = emailService.generateContactEmail(formData);
      
      // Send email
      const result = await emailService.sendEmail({
        to: process.env.TO_EMAIL,
        subject,
        html
      });

      res.status(200).json({
        success: true,
        message: 'Contact form submitted successfully',
        messageId: result.messageId
      });
    } catch (error) {
      next(error);
    }
  }
);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Email service is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
