import { NextRequest, NextResponse } from 'next/server';
import { MicrosoftGraphCalendarService } from '@/lib/email/microsoft365-calendar';
import { microsoft365EmailService } from '@/lib/email/microsoft365-email';
import { ContactDatabase, initializeDatabase } from '@/lib/database';

// GET endpoint for calendar availability (reuses demo-booking logic)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing startDate or endDate parameters' },
        { status: 400 }
      );
    }

    // Create a fresh calendar service instance for this request
    const calendarService = new MicrosoftGraphCalendarService();
    const availability = await calendarService.getCalendarAvailability(startDate, endDate);

    return NextResponse.json({
      success: true,
      availability
    });

  } catch (error) {
    console.error('❌ Calendar availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar availability' },
      { status: 500 }
    );
  }
}

// POST endpoint for consultation booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingData = body as {
      firstName: string;
      lastName: string;
      email: string;
      companyName: string;
      phone?: string;
      preferredDate: string;
      preferredTime: string;
      timezone: string;
      consultationType: string;
    };

    // Validate required fields
    if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.preferredDate || !bookingData.preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Initialize database if needed
    await initializeDatabase();

    // Store consultation booking in database as contact
    const contact = await ContactDatabase.createContact({
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone || '',
      company: bookingData.companyName,
      service: 'consultation_booking',
      message: `Consultation booking: ${bookingData.consultationType} on ${bookingData.preferredDate} at ${bookingData.preferredTime}`,
    });

    // Create calendar event - use fresh service instance
    console.log('📅 Creating calendar event for consultation booking...');
    const calendarService = new MicrosoftGraphCalendarService();

    // Generate consultation event (30 minutes instead of 60)
    const startDateTime = new Date(`${bookingData.preferredDate}T${bookingData.preferredTime}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60 * 1000); // 30 minutes

    const calendarEvent = {
      subject: `Consultation: ${bookingData.firstName} ${bookingData.lastName} - ${bookingData.companyName}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: bookingData.timezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: bookingData.timezone
      },
      body: {
        contentType: 'html',
        content: `
          <h3>XeroGap AI Consultation Booking</h3>
          <p><strong>Client:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
          <p><strong>Company:</strong> ${bookingData.companyName}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Phone:</strong> ${bookingData.phone || 'Not provided'}</p>
          <p><strong>Type:</strong> ${bookingData.consultationType}</p>
          <p><strong>Duration:</strong> 30 minutes</p>
          <br>
          <p>Please review the client's AI readiness assessment results and prepare recommendations for their AI implementation journey.</p>
        `
      },
      location: {
        displayName: 'Microsoft Teams Meeting'
      },
      attendees: [
        {
          emailAddress: {
            address: bookingData.email,
            name: `${bookingData.firstName} ${bookingData.lastName}`
          },
          type: 'required'
        }
      ],
      isOnlineMeeting: true,
      onlineMeetingProvider: 'teamsForBusiness'
    };

    console.log('📅 Generated consultation calendar event data');

    let calendarResult;
    try {
      calendarResult = await calendarService.createCalendarEvent(calendarEvent);
      console.log('📅 Calendar creation result:', calendarResult);

      if (calendarResult.success) {
        console.log('✅ Calendar event created successfully');
        console.log('📅 Join URL:', calendarResult.joinUrl);
      } else {
        console.error('❌ Calendar creation failed:', calendarResult.error);
      }
    } catch (error) {
      console.error('❌ Calendar creation threw error:', error);
      calendarResult = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }

    // Send confirmation email
    const emailData = {
      to: bookingData.email,
      subject: `Consultation Booked: AI Readiness Discussion - ${startDateTime.toLocaleDateString()}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Consultation Booking Confirmation</title>
        </head>
        <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f8fafc;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">

            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700;">Consultation Booked Successfully!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9; font-size: 16px;">Your AI readiness consultation is confirmed</p>
            </div>

            <!-- Booking Details -->
            <div style="padding: 40px 30px;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Consultation Details</h2>
              <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Name:</span>
                  <span style="color: #1e293b; font-weight: 500;">${bookingData.firstName} ${bookingData.lastName}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Email:</span>
                  <span style="color: #1e293b; font-weight: 500;">${bookingData.email}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Company:</span>
                  <span style="color: #1e293b; font-weight: 500;">${bookingData.companyName || 'Not provided'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Phone:</span>
                  <span style="color: #1e293b; font-weight: 500;">${bookingData.phone || 'Not provided'}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Date:</span>
                  <span style="color: #1e293b; font-weight: 500;">${startDateTime.toLocaleDateString()}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                  <span style="color: #64748b;">Time:</span>
                  <span style="color: #1e293b; font-weight: 500;">${startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                  <span style="color: #64748b;">Duration:</span>
                  <span style="color: #1e293b; font-weight: 500;">30 minutes</span>
                </div>
              </div>

              ${calendarResult?.joinUrl ? `
                <div style="background-color: #f0f9ff; border: 1px solid #3b82f6; border-radius: 8px; padding: 20px; margin-bottom: 20px;">
                  <h3 style="color: #1e40af; margin: 0 0 10px 0;">📅 Calendar Invite Sent!</h3>
                  <p style="margin: 0; color: #1e40af;">
                    A calendar invite has been added to your Outlook calendar with a Teams meeting link.
                    <a href="${calendarResult.joinUrl}" style="color: #3b82f6; text-decoration: underline;">Join Meeting</a>
                  </p>
                </div>
              ` : ''}

              <!-- What to Expect -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #92400e; margin: 0 0 10px 0;">What to Expect</h3>
                <ul style="margin: 0; padding-left: 20px; color: #92400e;">
                  <li>Review of your AI readiness assessment results</li>
                  <li>Discussion of your specific business challenges</li>
                  <li>Custom AI implementation recommendations</li>
                  <li>Q&A session with our AI experts</li>
                </ul>
              </div>

              <!-- Preparation Tips -->
              <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 20px;">
                <h3 style="color: #059669; margin: 0 0 10px 0;">Preparation Tips</h3>
                <ul style="margin: 0; padding-left: 20px; color: #059669;">
                  <li>Have your assessment results ready for review</li>
                  <li>Prepare specific questions about AI implementation</li>
                  <li>Ensure you have a stable internet connection</li>
                  <li>Be ready to discuss your current technology stack</li>
                </ul>
              </div>
            </div>

            <!-- CTA Buttons -->
            <div style="padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/assessment"
                 style="display: inline-block; background-color: #667eea; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600; margin-right: 15px;">
                Take AI Assessment
              </a>
              <a href="${process.env.NEXT_PUBLIC_SITE_DOMAIN || 'https://xerogap.com'}/contact"
                 style="display: inline-block; background-color: #10b981; color: white; text-decoration: none; padding: 15px 30px; border-radius: 8px; font-weight: 600;">
                Contact Support
              </a>
            </div>

            <!-- Footer -->
            <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #64748b; font-size: 14px;">
                Questions about your consultation? Reply to this email or contact us at
                <a href="mailto:support@xerogap.com" style="color: #667eea;">support@xerogap.com</a>
              </p>
              <p style="margin: 10px 0 0 0; color: #94a3b8; font-size: 12px;">
                © 2025 XeroGap AI. All rights reserved.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
      text: `
Consultation Booking Confirmation

Consultation Details:
- Name: ${bookingData.firstName} ${bookingData.lastName}
- Email: ${bookingData.email}
- Company: ${bookingData.companyName || 'Not provided'}
- Phone: ${bookingData.phone || 'Not provided'}
- Date: ${startDateTime.toLocaleDateString()}
- Time: ${startDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${endDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
- Duration: 30 minutes

${calendarResult?.joinUrl ? `Calendar invite sent with Teams meeting link: ${calendarResult.joinUrl}` : ''}

What to Expect:
- Review of your AI readiness assessment results
- Discussion of your specific business challenges
- Custom AI implementation recommendations
- Q&A session with our AI experts

Preparation Tips:
- Have your assessment results ready for review
- Prepare specific questions about AI implementation
- Ensure you have a stable internet connection
- Be ready to discuss your current technology stack

Questions? Contact us at support@xerogap.com
      `,
    };

    // Send the confirmation email
    try {
      const emailResult = await microsoft365EmailService.sendEmail(emailData);
      if (!emailResult.success) {
        console.warn('Failed to send consultation confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.warn('Consultation email sending failed:', emailError);
      // Continue with booking even if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully',
      calendarEventId: calendarResult.eventId || null,
      joinUrl: calendarResult.joinUrl || null,
      contactId: contact.id,
      calendarResult: calendarResult, // Include full result for debugging
    });

  } catch (error) {
    console.error('Consultation booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book consultation' },
      { status: 500 }
    );
  }
}
