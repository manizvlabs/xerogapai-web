import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, company, service, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // For now, we'll log the form data and simulate sending an email
    // In production, you would integrate with an email service like SendGrid, Mailgun, etc.
    console.log('Contact Form Submission:', {
      name: `${firstName} ${lastName}`,
      email,
      phone,
      company,
      service,
      message,
      timestamp: new Date().toISOString(),
    });

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
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

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
