import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const BUSINESS_HOURS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
];

const CONSULTATION_DURATIONS: Record<string, number> = {
  discovery: 30,
  technical: 60,
  strategy: 90,
  demo: 45,
};

const createDateTime = (date: string, time: string): Date => {
  const [hours, minutes] = time.split(':').map(Number);
  const eventDate = new Date(date);
  eventDate.setHours(hours, minutes, 0, 0);
  return eventDate;
};

interface CalendarEvent {
  start: { dateTime?: string; date?: string };
  end: { dateTime?: string; date?: string };
}

const checkTimeSlotConflict = (slotStart: Date, slotEnd: Date, events: CalendarEvent[]): boolean => {
  return events.some(event => {
    const eventStart = new Date(event.start.dateTime ?? event.start.date ?? '');
    const eventEnd = new Date(event.end.dateTime ?? event.end.date ?? '');
    return slotStart < eventEnd && slotEnd > eventStart;
  });
};

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const date = searchParams.get('date');
  const consultationType = searchParams.get('consultationType') ?? undefined;

  if (!date) {
    return NextResponse.json({ error: 'Date parameter is required' }, { status: 400 });
  }

  try {
    const duration = CONSULTATION_DURATIONS[consultationType ?? ''] ?? 60;
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const calendarResponse = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = (calendarResponse.data.items ?? []) as CalendarEvent[];

    const timeSlots: TimeSlot[] = BUSINESS_HOURS.map(time => {
      const slotStart = createDateTime(date, time);
      const slotEnd = new Date(slotStart.getTime() + duration * 60 * 1000);
      const isBooked = checkTimeSlotConflict(slotStart, slotEnd, events);
      return { time, available: !isBooked, booked: isBooked };
    });

    return NextResponse.json({ date, consultationType, duration, timeSlots, totalEvents: events.length });

  } catch (error) {
    console.error('Calendar availability error:', error);

    const mockBookedSlots = ['09:00', '10:30', '14:00'];
    const timeSlots: TimeSlot[] = BUSINESS_HOURS.map(time => ({
      time,
      available: !mockBookedSlots.includes(time),
      booked: mockBookedSlots.includes(time),
    }));

    return NextResponse.json({
      date,
      consultationType,
      duration: 60,
      timeSlots,
      totalEvents: 3,
      fallback: true,
    });
  }
}
