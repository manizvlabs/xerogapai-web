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
      summary: `VyaptIX Consultation: ${bookingData.firstName} ${bookingData.lastName}`,
      description: `
Consultation Type: ${consultationTypeLabel}
Client: ${bookingData.firstName} ${bookingData.lastName}
Email: ${bookingData.email}
Phone: ${bookingData.mobile || 'Not provided'}
Company: ${bookingData.company || 'Not provided'}
Service Interest: ${bookingData.service || 'Not specified'}

Goals: ${bookingData.consultationGoals || 'Not specified'}
Challenges: ${bookingData.currentChallenges || 'Not specified'}
Budget: ${bookingData.budget || 'Not specified'}
Timeline: ${bookingData.timeline || 'Not specified'}

Additional Notes: ${bookingData.additionalNotes || 'None'}
Message: ${bookingData.message || 'None'}

Booked via VyaptIX Website Contact Form
      `.trim(),
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
        <head><meta charset="utf-8"><title>New Consultation Booking - VyaptIX AI</title></head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0; text-align: center;">New Consultation Booked!</h1>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 10px;">
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #2c3e50;">Client Information:</h3>
              <p><strong>Name:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
              <p><strong>Email:</strong> ${bookingData.email}</p>
              <p><strong>Phone:</strong> ${bookingData.mobile || 'Not provided'}</p>
              <p><strong>Company:</strong> ${bookingData.company || 'Not provided'}</p>
              <p><strong>Service Interest:</strong> ${bookingData.service || 'Not specified'}</p>
            </div>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <h3 style="margin-top: 0; color: #2c3e50;">Consultation Details:</h3>
              <p><strong>Date:</strong> ${new Date(bookingData.preferredDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> ${formatTimeForDisplay(bookingData.preferredTime)}</p>
              <p><strong>Type:</strong> ${consultationTypeLabel}</p>
              <p><strong>Timezone:</strong> ${bookingData.timezone.replace('_', ' ')}</p>
              <p><strong>Budget:</strong> ${bookingData.budget || 'Not specified'}</p>
              <p><strong>Timeline:</strong> ${bookingData.timeline || 'Not specified'}</p>
            </div>
            ${bookingData.consultationGoals ? `<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;"><h4 style="margin-top: 0;">Goals:</h4><p>${bookingData.consultationGoals}</p></div>` : ''}
            ${bookingData.currentChallenges ? `<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;"><h4 style="margin-top: 0;">Challenges:</h4><p>${bookingData.currentChallenges}</p></div>` : ''}
            ${bookingData.message ? `<div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;"><h4 style="margin-top: 0;">Message:</h4><p>${bookingData.message}</p></div>` : ''}
            ${calendarEvent?.data?.id
              ? `<div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0;"><p style="margin: 0; color: #155724;"><strong>Calendar Event Created:</strong> ${calendarEvent.data.id}</p></div>`
              : `<div style="background: #f8d7da; border: 1px solid #f5c6cb; padding: 15px; border-radius: 8px; margin: 20px 0;"><p style="margin: 0; color: #721c24;"><strong>Calendar Event Failed:</strong> Manual scheduling may be required</p></div>`
            }
          </div>
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

    try {
      await transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
        to: process.env.SMTP_USER,
        subject: `New Consultation Booked: ${bookingData.firstName} ${bookingData.lastName}`,
        html: teamEmailHtml,
      });
    } catch (emailError) {
      console.error('Error sending team email:', emailError);
    }

    const meetLink = calendarEvent?.data?.conferenceData?.entryPoints
      ?.find(ep => ep.entryPointType === 'video')?.uri ?? null;

    return NextResponse.json({
      success: true,
      message: 'Consultation booked successfully!',
      eventId: calendarEvent?.data?.id,
      eventLink: calendarEvent?.data?.htmlLink,
      meetLink,
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
