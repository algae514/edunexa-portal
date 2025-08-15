# EduNexa Email Service Backend

A Node.js/Express email service for handling form submissions from the EduNexa Portal frontend.

## Features

- ✅ SendGrid integration with SMTP fallback
- ✅ Input validation and sanitization
- ✅ Rate limiting and security middleware
- ✅ Comprehensive error handling and logging
- ✅ CORS configuration for frontend integration
- ✅ Professional email templates
- ✅ Health check endpoints

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Setup

Copy the example environment file and configure your settings:

```bash
cp .env.example .env
```

**Required Environment Variables:**

```env
# Email Service (Choose one)
SENDGRID_API_KEY=your_sendgrid_api_key_here
# OR for SMTP fallback:
# SMTP_USER=your_gmail@gmail.com
# SMTP_PASS=your_app_password

# Email Configuration
FROM_EMAIL=noreply@futureos.live
TO_EMAIL=support@futureos.live

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### 3. Start the Server

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The service will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - Service health status
- **GET** `/api/send-email/health` - Email service health

### Email Endpoints

#### 1. FDP Registration
- **POST** `/api/send-email/fdp-registration`
- **Body:**
```json
{
  "collegeName": "string (required, 2-200 chars)",
  "contactPerson": "string (required, 2-100 chars)",
  "email": "string (required, valid email)",
  "phone": "string (required, valid phone)",
  "location": "string (required, 2-100 chars)",
  "expectedParticipants": "string (required)",
  "preferredDates": "string (required, 5-200 chars)",
  "specificRequirements": "string (optional, max 1000 chars)"
}
```

#### 2. Testimonial Submission
- **POST** `/api/send-email/testimonial`
- **Body:**
```json
{
  "name": "string (required, 2-100 chars)",
  "role": "string (required, 2-100 chars)",
  "company": "string (required, 2-100 chars)",
  "course": "string (required, 2-100 chars)",
  "rating": "number (required, 1-5)",
  "testimonial": "string (required, 10-1000 chars)"
}
```

#### 3. Contact Form
- **POST** `/api/send-email/contact`
- **Body:**
```json
{
  "firstName": "string (required, 1-50 chars)",
  "lastName": "string (required, 1-50 chars)",
  "email": "string (required, valid email)",
  "phone": "string (optional, valid phone)",
  "subject": "string (required, 2-100 chars)",
  "message": "string (required, 10-2000 chars)"
}
```

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Email sent successfully",
  "messageId": "unique_message_id"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["validation error details"]
}
```

## Rate Limiting

- **Global**: 100 requests per 15 minutes per IP
- **Email endpoints**: 10 requests per 15 minutes per IP

## Security Features

- Input validation and sanitization
- CORS protection
- Helmet security headers
- Rate limiting protection
- Request size limits (10MB)
- Comprehensive error logging

## Email Templates

Professional HTML email templates are automatically generated for:

1. **FDP Registration**: Institution details and program requirements
2. **Testimonials**: Reviewer information with star ratings
3. **Contact Forms**: Professional inquiry formatting

## Deployment

### Using Railway (Recommended)

1. Push code to GitHub repository
2. Connect Railway to your repository
3. Add environment variables in Railway dashboard
4. Deploy automatically

### Using PM2 (VPS)

```bash
npm install -g pm2
pm2 start src/app.js --name "edunexa-email-service"
pm2 startup
pm2 save
```

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
SENDGRID_API_KEY=your_production_api_key
FROM_EMAIL=noreply@futureos.live
TO_EMAIL=support@futureos.live
FRONTEND_URL=https://your-frontend-domain.com
```

## Monitoring

- Logs are stored in `/logs` directory
- Health check available at `/health`
- Winston logging with structured JSON format
- Error tracking with stack traces

## Testing

Test the API endpoints using curl:

```bash
# Health check
curl http://localhost:5000/health

# Test contact form
curl -X POST http://localhost:5000/api/send-email/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Support

For issues or questions:
- Check logs in `/logs` directory
- Verify environment variables
- Ensure SendGrid API key is valid
- Check CORS configuration for frontend domain
