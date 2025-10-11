import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';

export interface CalendarEvent {
  subject: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  body?: {
    contentType: 'html' | 'text';
    content: string;
  };
  location?: {
    displayName: string;
  };
  attendees?: Array<{
    emailAddress: {
      address: string;
      name?: string;
    };
    type: 'required' | 'optional';
  }>;
  isOnlineMeeting?: boolean;
  onlineMeetingProvider?: 'teamsForBusiness' | 'skypeForBusiness' | 'skypeForConsumer';
}

export interface CalendarResponse {
  success: boolean;
  eventId?: string;
  joinUrl?: string;
  error?: string;
}

// Microsoft Graph Calendar implementation
class MicrosoftGraphCalendarService {
  private graphClient: Client | null = null;
  private readonly isConfigured: boolean;
  private readonly userId: string;

  constructor() {
    this.isConfigured = !!(process.env.MS_GRAPH_CLIENT_ID && process.env.MS_GRAPH_CLIENT_SECRET && process.env.MS_GRAPH_TENANT_ID);

    // Use the provided Object ID for the user (manish@xerogap.com)
    this.userId = process.env.MS_GRAPH_OBJECT_ID || '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';

    if (this.isConfigured) {
      // Initialize Graph client asynchronously
      this.initializeGraphClient().catch(error => {
        console.error('Failed to initialize Graph client during construction:', error);
      });
    }
  }

  private async initializeGraphClient() {
    if (!this.isConfigured) {
      throw new Error('Microsoft Graph API credentials not configured for calendar integration');
    }

    try {
      console.log('🔧 Initializing Microsoft Graph client...');

      // First, test the credentials by getting a token
      const credential = new ClientSecretCredential(
        process.env.MS_GRAPH_TENANT_ID!,
        process.env.MS_GRAPH_CLIENT_ID!,
        process.env.MS_GRAPH_CLIENT_SECRET!
      );

      console.log('🔑 Testing token acquisition...');
      const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Failed to acquire access token');
      }
      console.log('✅ Access token acquired successfully');

      // Initialize the Graph client
      this.graphClient = Client.initWithMiddleware({
        authProvider: {
          getAccessToken: async () => {
            const token = await credential.getToken('https://graph.microsoft.com/.default');
            return token.token;
          }
        }
      });
      console.log('✅ Microsoft Graph client initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Microsoft Graph client:', error);
      console.error('   Error details:', error.message || error);
      this.graphClient = null;
      throw error; // Re-throw to prevent silent failures
    }
  }

  async createCalendarEvent(event: CalendarEvent): Promise<CalendarResponse> {
    if (!this.isConfigured || !this.graphClient) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    try {
      const calendarEvent = {
        subject: event.subject,
        start: event.start,
        end: event.end,
        body: event.body || {
          contentType: 'html',
          content: `<p>Demo booking confirmation</p><p>Please join the meeting at the scheduled time.</p>`
        },
        location: event.location,
        attendees: event.attendees || [],
        isOnlineMeeting: event.isOnlineMeeting || true,
        onlineMeetingProvider: event.onlineMeetingProvider || 'teamsForBusiness'
      };

      const result = await this.graphClient
        .api(`/users/${this.userId}/events`)
        .post(calendarEvent);

      // Extract join URL if it's an online meeting
      let joinUrl = undefined;
      if (result.onlineMeetingUrl) {
        joinUrl = result.onlineMeetingUrl;
      }

      return {
        success: true,
        eventId: result.id,
        joinUrl: joinUrl
      };

    } catch (error) {
      console.error('Graph API calendar error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Calendar event creation failed'
      };
    }
  }

  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    if (!this.isConfigured || !this.graphClient) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    try {
      await this.graphClient.api(`/users/${this.userId}`).get();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Graph API connection failed'
      };
    }
  }

  // Get calendar availability and existing bookings
  async getCalendarAvailability(startDate: string, endDate: string): Promise<{
    freeSlots: Array<{ date: string; time: string; available: boolean }>;
    busySlots: Array<{ date: string; time: string; subject: string; isDemoBooking?: boolean }>;
    workingHours: { start: string; end: string };
  }> {
    console.log('🔍 Checking calendar configuration...');
    console.log('   isConfigured:', this.isConfigured);
    console.log('   graphClient exists:', !!this.graphClient);

    // If configured but Graph client not initialized, try to initialize it
    if (this.isConfigured && !this.graphClient) {
      console.log('🔄 Graph client not initialized, attempting to initialize...');
      try {
        await this.initializeGraphClient();
      } catch (error) {
        console.log('❌ Failed to initialize Graph client, using mock data');
        return this.getMockAvailability(startDate, endDate);
      }
    }

    if (!this.isConfigured || !this.graphClient) {
      console.log('❌ Graph API not configured or client not initialized, using mock data');
      // Return mock data for development when not configured
      return this.getMockAvailability(startDate, endDate);
    }

    console.log('✅ Graph API configured, making real API calls...');

    try {
      // Use configurable timezone for proper calendar operations
      const userTimezone = process.env.MS_GRAPH_TIMEZONE || 'Asia/Kolkata'; // Default to IST

      // Get free/busy information using IST timezone
      const freeBusyQuery = {
        schedules: [this.userId],
        startTime: {
          dateTime: `${startDate}T00:00:00`,
          timeZone: userTimezone
        },
        endTime: {
          dateTime: `${endDate}T23:59:59`,
          timeZone: userTimezone
        },
        availabilityViewInterval: 60 // 60-minute intervals
      };

      console.log('📅 Calling Microsoft Graph API for free/busy with IST timezone...');
      const freeBusyResponse = await this.graphClient
        .api(`/users/${this.userId}/calendar/getSchedule`)
        .post(freeBusyQuery);
      console.log('✅ Free/busy response received');

      // Get existing events to show as busy slots - use IST timezone for filtering
      console.log('📅 Calling Microsoft Graph API for events with IST timezone...');
      const eventsResponse = await this.graphClient
        .api(`/users/${this.userId}/events`)
        .filter(`start/dateTime ge '${startDate}T00:00:00' and end/dateTime le '${endDate}T23:59:59'`)
        .select('subject,start,end,isAllDay')
        .top(100)
        .get();
      console.log(`✅ Events response received: ${eventsResponse.value?.length || 0} events found`);

      // Process free/busy data
      const freeSlots: Array<{ date: string; time: string; available: boolean }> = [];
      const busySlots: Array<{ date: string; time: string; subject: string; isDemoBooking?: boolean }> = [];

      console.log('📊 Processing events response...');
      console.log('   Events found:', eventsResponse.value?.length || 0);

      // Process events - handle IST timezone properly
      if (eventsResponse.value && eventsResponse.value.length > 0) {
        console.log('✅ Found real calendar events!');
        eventsResponse.value.forEach((event: any) => {
          if (!event.isAllDay) {
            // Debug the raw event data
            console.log(`   📅 Raw event data:`, {
              subject: event.subject,
              startDateTime: event.start.dateTime,
              startTimeZone: event.start.timeZone,
              endDateTime: event.end.dateTime,
              endTimeZone: event.end.timeZone
            });

            // Microsoft Graph API returns datetime in UTC by default
            // We need to convert from UTC to IST
            const startDateTimeUTC = new Date(event.start.dateTime);

            // Convert UTC to IST (+5:30 hours)
            const startDateTimeIST = new Date(startDateTimeUTC.getTime() + (5.5 * 60 * 60 * 1000));

            // Format the date and time properly for IST display
            const date = startDateTimeIST.toISOString().split('T')[0];
            const time = startDateTimeIST.toTimeString().slice(0, 5); // HH:MM format

            console.log(`   📅 Event: ${event.subject} at ${date} ${time} IST (converted from UTC)`);

            busySlots.push({
              date,
              time,
              subject: event.subject || 'Busy',
              isDemoBooking: event.subject?.toLowerCase().includes('demo')
            });
          }
        });
        console.log(`✅ Processed ${busySlots.length} busy slots from real calendar`);
      } else {
        console.log('⚠️ No events found in calendar for this date range');
        console.log('   This could mean:');
        console.log('   - No events scheduled in the selected date range');
        console.log('   - Events are in a different calendar');
        console.log('   - Using working hours logic to generate available slots');
      }

      // Generate available time slots (9 AM - 5 PM, Monday-Friday)
      const workingHours = { start: '09:00', end: '17:00' };
      const currentDate = new Date(startDate);
      const endDateObj = new Date(endDate);

      while (currentDate <= endDateObj) {
        const dayOfWeek = currentDate.getDay();
        if (dayOfWeek >= 1 && dayOfWeek <= 5) { // Monday to Friday
          for (let hour = 9; hour < 17; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            const dateString = currentDate.toISOString().split('T')[0];

            // Check if this slot is already booked
            const isBooked = busySlots.some(slot =>
              slot.date === dateString && slot.time === timeString
            );

            if (!isBooked) {
              freeSlots.push({
                date: dateString,
                time: timeString,
                available: true
              });
            }
          }
        }
        currentDate.setDate(currentDate.getDate() + 1);
      }

      console.log('🎯 Final result summary:');
      console.log(`   Free slots: ${freeSlots.length}`);
      console.log(`   Busy slots: ${busySlots.length}`);
      console.log(`   Working hours: ${workingHours.start} - ${workingHours.end}`);

      return {
        freeSlots,
        busySlots,
        workingHours
      };

    } catch (error) {
      console.error('❌ Microsoft Graph API call failed:', error);
      console.error('   This means the calendar integration is not working properly.');
      console.error('   Error details:', error.message || error);
      console.error('   Falling back to mock data for demonstration purposes.');
      // Fallback to mock data only when API actually fails
      return this.getMockAvailability(startDate, endDate);
    }
  }

  private getMockAvailability(startDate: string, endDate: string): {
    freeSlots: Array<{ date: string; time: string; available: boolean }>;
    busySlots: Array<{ date: string; time: string; subject: string; isDemoBooking?: boolean }>;
    workingHours: { start: string; end: string };
  } {
    const freeSlots: Array<{ date: string; time: string; available: boolean }> = [];
    const busySlots: Array<{ date: string; time: string; subject: string; isDemoBooking?: boolean }> = [];

    // Mock some busy slots for demo purposes
    const mockBusySlots = [
      { date: '2025-10-13', time: '10:00', subject: 'Team Meeting' },
      { date: '2025-10-13', time: '14:00', subject: 'Client Call' },
      { date: '2025-10-14', time: '11:00', subject: 'Product Demo' },
      { date: '2025-10-15', time: '09:00', subject: 'Internal Review' },
      { date: '2025-10-15', time: '15:00', subject: 'AI Demo: John Smith - Acme Corp' },
    ];

    mockBusySlots.forEach(slot => {
      busySlots.push({
        ...slot,
        isDemoBooking: slot.subject.toLowerCase().includes('demo')
      });
    });

    // Generate available time slots for the next 7 days
    const currentDate = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      for (let hour = 9; hour < 17; hour++) {
        const timeString = `${hour.toString().padStart(2, '0')}:00`;

        // Check if this slot is in the mock busy slots
        const isBooked = mockBusySlots.some(slot =>
          slot.date === dateString && slot.time === timeString
        );

        if (!isBooked) {
          freeSlots.push({
            date: dateString,
            time: timeString,
            available: true
          });
        }
      }
    }

    return {
      freeSlots,
      busySlots,
      workingHours: { start: '09:00', end: '17:00' }
    };
  }

  // Generate demo booking calendar event
  generateDemoBookingEvent(bookingData: {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    preferredDate: string;
    preferredTime: string;
    timezone: string;
    consultationType: string;
  }): CalendarEvent {
    // Use configurable timezone for the user's calendar
    const userTimezone = process.env.MS_GRAPH_TIMEZONE || 'Asia/Kolkata'; // Default to IST

    // Create datetime objects with IST timezone
    const startDateTimeString = `${bookingData.preferredDate}T${bookingData.preferredTime}:00`;
    const startDateTime = new Date(startDateTimeString);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour meeting

    console.log(`📅 Creating calendar event in IST timezone:`);
    console.log(`   Start: ${startDateTime.toISOString()} (${userTimezone})`);
    console.log(`   End: ${endDateTime.toISOString()} (${userTimezone})`);

    return {
      subject: `Demo: ${bookingData.firstName} ${bookingData.lastName} - ${bookingData.companyName}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: userTimezone
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: userTimezone
      },
      body: {
        contentType: 'html',
        content: `
          <h3>XeroGap AI Demo Booking</h3>
          <p><strong>Client:</strong> ${bookingData.firstName} ${bookingData.lastName}</p>
          <p><strong>Company:</strong> ${bookingData.companyName}</p>
          <p><strong>Email:</strong> ${bookingData.email}</p>
          <p><strong>Type:</strong> ${bookingData.consultationType}</p>
          <p><strong>Duration:</strong> 60 minutes</p>
          <br>
          <p>Please prepare a brief overview of your current processes and pain points for the demo.</p>
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
  }
}

// Create a function to get a fresh service instance to avoid stale state
const createCalendarService = () => new MicrosoftGraphCalendarService();

export { MicrosoftGraphCalendarService };
export const microsoft365CalendarService = createCalendarService();
