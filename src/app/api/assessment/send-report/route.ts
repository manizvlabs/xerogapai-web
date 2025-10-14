import { NextRequest, NextResponse } from 'next/server';
import { sanitizeInput, isValidEmail, logSecurityEvent } from '@/lib/security';
import { microsoft365EmailService, EmailData } from '@/lib/email/microsoft365-email';

async function sendAssessmentReportHandler(request: NextRequest) {
  try {
    const body = await request.json();
    const { assessmentData, userEmail } = body;

    // Validate required fields
    if (!assessmentData || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: assessmentData and userEmail' },
        { status: 400 }
      );
    }

    // Validate email format
    const sanitizedEmail = sanitizeInput(userEmail);
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get client IP for tracking
    const ipAddress = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Send the assessment report email directly (avoid duplicate email from lead sequence)
    console.log('Attempting to send assessment report to:', sanitizedEmail);

    // Use template service to render email with PDF attachment
    const templateSvc = await import('@/lib/email/templates/templateService').then(m => m.templateService);
    const emailData: EmailData = await templateSvc.renderAssessmentReportEmail(assessmentData);

    // Override the recipient email
    emailData.to = sanitizedEmail;

    const result = await microsoft365EmailService.sendEmail(emailData);

    console.log('Email service result:', result);

    if (result.success) {
      // Log successful email send
      logSecurityEvent('assessment_report_sent', {
        email: sanitizedEmail,
        messageId: result.messageId,
        ipAddress
      }, request);

      return NextResponse.json(
        {
          success: true,
          message: 'Assessment report sent successfully',
          messageId: result.messageId
        },
        { status: 200 }
      );
    } else {
      // Log failed email send
      logSecurityEvent('assessment_report_failed', {
        email: sanitizedEmail,
        error: result.error,
        ipAddress
      }, request);

      return NextResponse.json(
        { error: 'Failed to send assessment report', details: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Assessment report API error:', error);

    // Log security event for errors
    logSecurityEvent('assessment_report_error', {
      error: error instanceof Error ? error.message : 'Unknown error'
    }, request);

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export const POST = sendAssessmentReportHandler;
