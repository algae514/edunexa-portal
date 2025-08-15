const sgMail = require('@sendgrid/mail');
const nodemailer = require('nodemailer');
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
    new winston.transports.File({ filename: 'logs/email.log' })
  ]
});

class EmailService {
  constructor() {
    this.initializeServices();
  }

  initializeServices() {
    // Prioritize SMTP over SendGrid for simplicity
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
      this.useSendGrid = false;
      logger.info('Gmail SMTP initialized successfully');
    } else if (process.env.SENDGRID_API_KEY) {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      this.useSendGrid = true;
      logger.info('SendGrid initialized as fallback');
    } else {
      logger.warn('No email service configured. Add SMTP_USER/SMTP_PASS or SENDGRID_API_KEY');
    }
  }

  async sendEmail({ to, subject, html, text }) {
    try {
      const emailData = {
        from: process.env.FROM_EMAIL,
        to: to || process.env.TO_EMAIL,
        subject,
        html,
        text: text || this.stripHtml(html)
      };

      let result;
      if (this.useSendGrid) {
        result = await sgMail.send(emailData);
        logger.info('Email sent via SendGrid', { messageId: result[0].headers['x-message-id'] });
      } else {
        result = await this.transporter.sendMail(emailData);
        logger.info('Email sent via SMTP', { messageId: result.messageId });
      }

      return { success: true, messageId: result.messageId || result[0].headers['x-message-id'] };
    } catch (error) {
      logger.error('Email sending failed', { error: error.message });
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  stripHtml(html) {
    return html.replace(/<[^>]*>/g, '');
  }

  // Email template generators
  generateFDPRegistrationEmail(data) {
    const subject = `FDP Registration Request - ${data.collegeName}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Faculty Development Program Registration</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Institution Details</h3>
          <p><strong>College Name:</strong> ${data.collegeName}</p>
          <p><strong>Contact Person:</strong> ${data.contactPerson}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Location:</strong> ${data.location}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Program Requirements</h3>
          <p><strong>Expected Participants:</strong> ${data.expectedParticipants}</p>
          <p><strong>Preferred Dates:</strong> ${data.preferredDates}</p>
          ${data.specificRequirements ? `<p><strong>Specific Requirements:</strong><br>${data.specificRequirements}</p>` : ''}
        </div>

        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            This request was submitted through the FutureOS website.<br>
            Please respond within 24-48 hours to confirm the FDP schedule.
          </p>
        </div>
      </div>
    `;
    return { subject, html };
  }

  generateTestimonialEmail(data) {
    const subject = `New Testimonial Submission - ${data.name}`;
    const stars = '⭐'.repeat(data.rating) + '☆'.repeat(5 - data.rating);
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Testimonial Received</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Reviewer Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Role:</strong> ${data.role}</p>
          <p><strong>Company:</strong> ${data.company}</p>
          <p><strong>Course:</strong> ${data.course}</p>
        </div>

        <div style="background-color: #fefce8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #a16207; margin-top: 0;">Rating & Review</h3>
          <p><strong>Rating:</strong> ${stars} (${data.rating}/5)</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin-top: 10px;">
            <p style="font-style: italic; margin: 0;">"${data.testimonial}"</p>
          </div>
        </div>

        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            This testimonial was submitted through the FutureOS website.<br>
            Review and approve for public display if appropriate.
          </p>
        </div>
      </div>
    `;
    return { subject, html };
  }

  generateContactEmail(data) {
    const subject = `Contact Form Submission - ${data.subject}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
          <p><strong>Subject:</strong> ${data.subject}</p>
        </div>

        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">Message</h3>
          <div style="background-color: white; padding: 15px; border-radius: 5px;">
            <p style="margin: 0; white-space: pre-line;">${data.message}</p>
          </div>
        </div>

        <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <p style="color: #6b7280; font-size: 14px;">
            This message was sent through the FutureOS contact form.<br>
            Please respond to the sender at: <a href="mailto:${data.email}">${data.email}</a>
          </p>
        </div>
      </div>
    `;
    return { subject, html };
  }
}

module.exports = new EmailService();
