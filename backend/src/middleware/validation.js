const { body, validationResult } = require('express-validator');

// Validation rules for FDP registration
const validateFDPRegistration = [
  body('collegeName')
    .trim()
    .isLength({ min: 2, max: 200 })
    .withMessage('College name must be between 2 and 200 characters'),
  
  body('contactPerson')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Contact person name must be between 2 and 100 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('location')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Location must be between 2 and 100 characters'),
  
  body('expectedParticipants')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Expected participants is required'),
  
  body('preferredDates')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Preferred dates must be between 5 and 200 characters'),
  
  body('specificRequirements')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Specific requirements cannot exceed 1000 characters')
];

// Validation rules for testimonials
const validateTestimonial = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('role')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Role must be between 2 and 100 characters'),
  
  body('company')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Company must be between 2 and 100 characters'),
  
  body('course')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Course must be between 2 and 100 characters'),
  
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  
  body('testimonial')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Testimonial must be between 10 and 1000 characters')
];

// Validation rules for contact form
const validateContact = [
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name must be between 1 and 50 characters'),
  
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name must be between 1 and 50 characters'),
  
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('subject')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Subject must be between 2 and 100 characters'),
  
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  validateFDPRegistration,
  validateTestimonial,
  validateContact,
  handleValidationErrors
};
