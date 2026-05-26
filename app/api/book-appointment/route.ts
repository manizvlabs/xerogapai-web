import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  company?: string;
  service?: string;
  message?: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  consultationType?: string;
  consultationGoals?: string;
  currentChallenges?: string;
  budget?: string;
  timeline?: string;
  additionalNotes?: string;
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Returns a local datetime string (no Z suffix) so Google Calendar
// interprets it in the timezone specified on the event, not UTC.
const formatTimeForCalendar = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

const getConsultationDuration = (consultationType?: string): number => {
  switch (consultationType) {
    case 'discovery': return 30;
    case 'technical': return 60;
    case 'strategy': return 90;
    case 'demo': return 45;
    default: return 60;
  }
};

function formatTimeForDisplay(time: string): string {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.preferredDate || !bookingData.preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email, preferredDate, preferredTime' },
        { status: 400 }
      );
    }

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startDateTimeStr = formatTimeForCalendar(bookingData.preferredDate, bookingData.preferredTime);
    const duration = getConsultationDuration(bookingData.consultationType);
    // Compute end time by adding duration minutes to the start time string
    const [startH, startM] = bookingData.preferredTime.split(':').map(Number);
    const totalMinutes = startH * 60 + startM + duration;
    const endH = Math.floor(totalMinutes / 60);
    const endM = totalMinutes % 60;
    const endTimeStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    const endDateTimeStr = formatTimeForCalendar(bookingData.preferredDate, endTimeStr);

    const consultationTypeLabel = {
      discovery: 'Discovery Call (30 min)',
      technical: 'Technical Deep Dive (60 min)',
      strategy: 'Strategy Session (90 min)',
      demo: 'Product Demo (45 min)',
    }[bookingData.consultationType || 'technical'] || 'Consultation (60 min)';

    const event = {
      summary: `Demo: ${bookingData.firstName} ${bookingData.lastName}${bookingData.company ? ` (${bookingData.company})` : ''}`,
      description: [
        '── LEAD DETAILS ──────────────────────',
        `Name:    ${bookingData.firstName} ${bookingData.lastName}`,
        `Email:   ${bookingData.email}`,
        `Phone:   ${bookingData.mobile || 'Not provided'}`,
        `Company: ${bookingData.company || '—'}`,
        '',
        '── WHAT THEY WANT TO DEMO ────────────',
        bookingData.consultationGoals || 'Not specified',
        '',
        '── CALL DETAILS ──────────────────────',
        `Type:     ${consultationTypeLabel}`,
        `Timezone: ${bookingData.timezone}`,
        '',
        'Booked via vyaptix.com',
      ].join('\n'),
      start: {
        dateTime: startDateTimeStr,
        timeZone: bookingData.timezone,
      },
      end: {
        dateTime: endDateTimeStr,
        timeZone: bookingData.timezone,
      },
      attendees: [
        {
          email: bookingData.email,
          displayName: `${bookingData.firstName} ${bookingData.lastName}`,
        },
        {
          email: 'ajeet@vyaptix.com',
          displayName: 'Ajeet — VyaptIX',
        },
      ],
      conferenceData: {
        createRequest: {
          requestId: `vyaptix-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const calendarEvent = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      sendUpdates: 'all',
      conferenceDataVersion: 1,
    });

    const transporter = createTransporter();

    const clientEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Consultation Confirmed - VyaptIX AI</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; text-align: center;">Consultation Confirmed!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #2c3e50; margin-top: 0;">Hi ${bookingData.firstName},</h2>
            <p>Thank you for scheduling a consultation with VyaptIX AI! We're excited to discuss how we can help transform your business with AI automation.</p>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #2c3e50;">Your Consultation Details:</h3>
              <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${formatTimeForDisplay(bookingData.preferredTime)}</p>
              <p><strong>Duration:</strong> ${consultationTypeLabel}</p>
              <p><strong>Timezone:</strong> ${bookingData.timezone.replace('_', ' ')}</p>
              ${calendarEvent?.data?.id ? `<p><strong>Calendar Invite:</strong> Sent to your email</p>` : ''}
            </div>
            <p><strong>Need to reschedule?</strong> Contact us at <a href="mailto:hello@vyaptix.com" style="color: #667eea;">hello@vyaptix.com</a></p>
          </div>
          <div style="text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>Visit us at <a href="https://www.vyaptix.com" style="color: #667eea;">www.vyaptix.com</a></p>
          </div>
        </body>
      </html>
    `;

    const teamEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head><meta charset="utf-8"><title>New Demo Booking — VyaptIX</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #0D1B2A 0%, #1A52E0 100%); padding: 30px; border-radius: 10px; margin-bottom: 24px;">
            <h1 style="color: white; margin: 0; font-size: 22px;">New Demo Booking</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 8px 0 0; font-size: 14px;">
              ${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              &nbsp;·&nbsp;${formatTimeForDisplay(bookingData.preferredTime)}
              &nbsp;·&nbsp;${consultationTypeLabel}
            </p>
          </div>

          <!-- Lead details -->
          <div style="background: #f8f9fa; padding: 24px; border-radius: 10px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #2c3e50;">Lead Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; width: 140px; color: #666; font-size: 14px;">Name</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; font-weight: bold; font-size: 14px;">${bookingData.firstName} ${bookingData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; color: #666; font-size: 14px;">Email</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">
                  <a href="mailto:${bookingData.email}" style="color: #1A52E0;">${bookingData.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; color: #666; font-size: 14px;">Contact Number</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #e9ecef; font-size: 14px;">
                  <a href="tel:${bookingData.mobile}" style="color: #1A52E0;">${bookingData.mobile || 'Not provided'}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666; font-size: 14px;">Company</td>
                <td style="padding: 8px 0; font-size: 14px;">${bookingData.company || '—'}</td>
              </tr>
            </table>
          </div>

          <!-- What they want to demo -->
          <div style="background: #fff8e6; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 6px; margin-bottom: 16px;">
            <h2 style="margin: 0 0 10px; font-size: 15px; color: #92400e;">What they want to demo</h2>
            <p style="margin: 0; font-size: 14px; color: #333; white-space: pre-wrap;">${bookingData.consultationGoals || 'Not specified'}</p>
          </div>

          <!-- Calendar status -->
          ${calendarEvent?.data?.id
            ? `<div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 14px 18px; border-radius: 8px;"><p style="margin: 0; color: #155724; font-size: 13px;"><strong>✓ Calendar invite sent</strong> — event ID: ${calendarEvent.data.id}</p></div>`
            : `<div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 14px 18px; border-radius: 8px;"><p style="margin: 0; color: #721c24; font-size: 13px;"><strong>⚠ Calendar event failed</strong> — manual scheduling required</p></div>`
          }
        </body>
      </html>
    `;

    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: bookingData.email,
        subject: 'Your VyaptIX Consultation is Confirmed!',
        html: clientEmailHtml,
      });
    } catch (emailError) {
      console.error('Error sending client email:', emailError);
    }

    let founderEmailSent = false;
    let founderEmailError: string | null = null;
    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: process.env.FOUNDER_EMAIL || 'ajeet@vyaptix.com',
        replyTo: bookingData.email,
        subject: `New Demo Booking: ${bookingData.firstName} ${bookingData.lastName} — ${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at ${formatTimeForDisplay(bookingData.preferredTime)}`,
        html: teamEmailHtml,
      });
      founderEmailSent = true;
    } catch (emailError) {
      founderEmailError = emailError instanceof Error ? emailError.message : String(emailError);
      console.error('Founder notification email failed:', founderEmailError);
    }

    const meetLink = calendarEvent?.data?.conferenceData?.entryPoints
      ?.find(ep => ep.entryPointType === 'video')?.uri ?? null;

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully!',
      eventId: calendarEvent?.data?.id,
      eventLink: calendarEvent?.data?.htmlLink,
      meetLink,
      founderEmailSent,
      ...(founderEmailError && { founderEmailError }),
    });

  } catch (error) {
    console.error('Booking error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      {
        error: 'Failed to create calendar event. Please try again or contact us directly.',
        details: message,
      },
      { status: 500 }
    );
  }
}
