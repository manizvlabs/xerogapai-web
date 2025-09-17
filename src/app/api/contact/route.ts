import { NextRequest, NextResponse } from 'next/server';
import { withRateLimit } from '@/lib/rate-limit';
import { sanitizeInput, isValidEmail, isValidPhone, logSecurityEvent } from '@/lib/security';

async function contactHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, service, message } = body;

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(firstName || ''),
      lastName: sanitizeInput(lastName || ''),
      email: sanitizeInput(email || ''),
      phone: sanitizeInput(phone || ''),
      company: sanitizeInput(company || ''),
      service: sanitizeInput(service || ''),
      message: sanitizeInput(message || '')
    };

    // Validate required fields
    if (!sanitizedData.firstName || !sanitizedData.lastName || !sanitizedData.email || !sanitizedData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone format if provided
    if (sanitizedData.phone && !isValidPhone(sanitizedData.phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Log the sanitized form data
    console.log('Contact Form Submission:', {
      name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      company: sanitizedData.company,
      service: sanitizedData.service,
      message: sanitizedData.message,
      timestamp: new Date().toISOString(),
    });

    // Log security event
    logSecurityEvent('contact_form_submission', {
      email: sanitizedData.email,
      company: sanitizedData.company
    }, request);

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Here you would typically send the email using your preferred service
    // Example with a hypothetical email service:
    /*
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'info@zerodigital.ai',
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    // Send email using your preferred service
    await sendEmail(emailData);
    */

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.'
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    
    // Log security event for errors
    logSecurityEvent('contact_form_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, request);
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export const POST = withRateLimit(contactHandler, 'contact');

// Example function for sending emails (replace with your actual email service)
// async function sendEmail(emailData: { to: string; subject: string; text: string; html: string }) {
//   // This is where you would integrate with your email service
//   // For example:
//   // - SendGrid
//   // - Mailgun
//   // - AWS SES
//   // - Resend
//   // - etc.
//
//   console.log('Email would be sent:', emailData);
//   return true;
// }
