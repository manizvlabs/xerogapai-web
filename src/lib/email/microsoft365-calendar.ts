import { Client } from '@microsoft/microsoft-graph-client';
import { ClientSecretCredential } from '@azure/identity';
import moment from 'moment';

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
  private _graphClient: Client | null = null;
  private readonly isConfigured: boolean;
  private readonly userId: string;
  private _initializationPromise: Promise<void> | null = null;

  get graphClient() {
    return this._graphClient;
  }

  constructor() {
    this.isConfigured = !!(process.env.MS_GRAPH_CLIENT_ID && process.env.MS_GRAPH_CLIENT_SECRET && process.env.MS_GRAPH_TENANT_ID);

    // Use the provided Object ID for the user (manish@xerogap.com)
    this.userId = process.env.MS_GRAPH_OBJECT_ID || '44dcba14-cfef-49e7-bfb9-fda4b477ed8e';

    if (this.isConfigured) {
      // Initialize Graph client asynchronously and store the promise
      this._initializationPromise = this.initializeGraphClient();
    }
  }

  private async initializeGraphClient() {
    if (!this.isConfigured) {
      throw new Error('Microsoft Graph API credentials not configured for calendar integration');
    }

    try {
      // First, test the credentials by getting a token
      const credential = new ClientSecretCredential(
        process.env.MS_GRAPH_TENANT_ID!,
        process.env.MS_GRAPH_CLIENT_ID!,
        process.env.MS_GRAPH_CLIENT_SECRET!
      );

      const tokenResponse = await credential.getToken('https://graph.microsoft.com/.default');
      if (!tokenResponse || !tokenResponse.token) {
        throw new Error('Failed to acquire access token');
      }

      // Initialize the Graph client
      this._graphClient = Client.initWithMiddleware({
        authProvider: {
          getAccessToken: async () => {
            const token = await credential.getToken('https://graph.microsoft.com/.default');
            return token.token;
          }
        }
      });
    } catch (error) {
      console.error('❌ Failed to initialize Microsoft Graph client:', error);
      console.error('   Error details:', error.message || error);
      this._graphClient = null;
      throw error; // Re-throw to prevent silent failures
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (this._initializationPromise) {
      await this._initializationPromise;
    }
  }

  async createCalendarEvent(event: CalendarEvent): Promise<CalendarResponse> {
    if (!this.isConfigured) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    // Ensure Graph client is initialized before using it
    await this.ensureInitialized();

    if (!this._graphClient) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    try {
      let joinUrl = undefined;
      let result = null;

      try {
        // Method 1: Try to create Teams meeting using /me/onlineMeetings endpoint
        let teamsMeeting;
        try {
          teamsMeeting = await this._graphClient
            .api(`/users/${this.userId}/onlineMeetings`)
            .post({
              startDateTime: event.start.dateTime,
              endDateTime: event.end.dateTime,
              subject: event.subject,
              participants: {
                attendees: event.attendees?.map(attendee => ({
                  emailAddress: {
                    address: attendee.emailAddress.address,
                    name: attendee.emailAddress.name || attendee.emailAddress.address
                  }
                })) || []
              }
            });
        } catch (teamsError) {
          console.warn('⚠️ Teams meeting creation failed:', teamsError.message);
          teamsMeeting = null;
        }

        // Method 2: If Teams meeting creation failed, try creating calendar event with Teams
        if (!teamsMeeting) {
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
            isOnlineMeeting: true,
            onlineMeetingProvider: 'teamsForBusiness'
          };

          result = await this._graphClient
            .api(`/users/${this.userId}/events`)
            .post(calendarEvent);

        } else {
          // Method 3: Create calendar event and link it to the Teams meeting
          const calendarEvent = {
            subject: event.subject,
            start: event.start,
            end: event.end,
            body: event.body || {
              contentType: 'html',
              content: `<p>Demo booking confirmation</p><p>Please join the Teams meeting using the link below.</p><p><a href="${teamsMeeting.joinWebUrl}">Join Teams Meeting</a></p>`
            },
            location: {
              displayName: 'Microsoft Teams Meeting',
              locationUri: teamsMeeting.joinWebUrl
            },
            attendees: event.attendees || [],
            isOnlineMeeting: true,
            onlineMeetingUrl: teamsMeeting.joinWebUrl
          };

          result = await this._graphClient
            .api(`/users/${this.userId}/events`)
            .post(calendarEvent);

        }

        // Extract Teams meeting URL with comprehensive logic
        let joinUrl = undefined;

        // Priority order for meeting URLs:
        if (teamsMeeting && teamsMeeting.joinWebUrl) {
          joinUrl = teamsMeeting.joinWebUrl;
        } else if (result.onlineMeetingUrl) {
          joinUrl = result.onlineMeetingUrl;
        } else if (result.onlineMeeting && result.onlineMeeting.joinWebUrl) {
          joinUrl = result.onlineMeeting.joinWebUrl;
        } else if (result.onlineMeeting && result.onlineMeeting.joinUrl) {
          joinUrl = result.onlineMeeting.joinUrl;
        } else if (result.webLink && result.isOnlineMeeting) {
          // Fallback: Use webLink if marked as online meeting
          joinUrl = result.webLink;
        } else if (result.webLink) {
          // Final fallback: Use calendar link
          joinUrl = result.webLink;
        }

      } catch (onlineMeetingError) {
        console.error('❌ All Teams meeting creation methods failed:', onlineMeetingError.message);
        console.error('Falling back to regular calendar event...');

        // Fallback: Create regular calendar event without Teams meeting
        const calendarEvent = {
          subject: event.subject,
          start: event.start,
          end: event.end,
          body: event.body || {
            contentType: 'html',
            content: `<p>Demo booking confirmation</p><p>You will receive a separate Teams meeting invitation.</p>`
          },
          location: event.location,
          attendees: event.attendees || []
        };

        result = await this._graphClient
          .api(`/users/${this.userId}/events`)
          .post(calendarEvent);

        joinUrl = result.webLink; // Use calendar link as fallback
      }

      return {
        id: result.id,
        subject: result.subject,
        hasOnlineMeeting: !!result.isOnlineMeeting,
        onlineMeetingUrl: result.onlineMeetingUrl,
        webLink: result.webLink,
        joinUrl: joinUrl,
        resultKeys: Object.keys(result)
      };

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
    if (!this.isConfigured) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    // Ensure Graph client is initialized before using it
    await this.ensureInitialized();

    if (!this._graphClient) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    try {
      await this._graphClient.api(`/users/${this.userId}`).get();
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
    // Check if Graph API is properly configured
    if (!this.isConfigured) {
      // Return mock data for development when not configured
      return this.getMockAvailability(startDate, endDate);
    }

    // Ensure Graph client is initialized before using it
    await this.ensureInitialized();

    // Check if Graph API is properly initialized
    if (!this._graphClient) {
      // Return mock data for development when not configured
      return this.getMockAvailability(startDate, endDate);
    }

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

      const freeBusyResponse = await this._graphClient
        .api(`/users/${this.userId}/calendar/getSchedule`)
        .post(freeBusyQuery);
      // Get existing events to show as busy slots - use IST timezone for filtering
      const eventsResponse = await this._graphClient
        .api(`/users/${this.userId}/events`)
        .filter(`start/dateTime ge '${startDate}T00:00:00' and end/dateTime le '${endDate}T23:59:59'`)
        .select('subject,start,end,isAllDay')
        .top(100)
        .get();

      // Process free/busy data
      const freeSlots: Array<{ date: string; time: string; available: boolean }> = [];
      const busySlots: Array<{ date: string; time: string; subject: string; isDemoBooking?: boolean }> = [];

      // Process events - handle IST timezone properly
      if (eventsResponse.value && eventsResponse.value.length > 0) {
        eventsResponse.value.forEach((event: any) => {
          if (!event.isAllDay) {
            // Microsoft Graph API returns datetime in UTC by default
            // Convert UTC to IST (+5:30 hours)
            const startDateTimeUTC = new Date(event.start.dateTime);
            const startDateTimeIST = new Date(startDateTimeUTC.getTime() + (5.5 * 60 * 60 * 1000));

            // Format for IST display
            const date = moment(startDateTimeIST).format('YYYY-MM-DD');
            const time = startDateTimeIST.toTimeString().slice(0, 5); // HH:MM format

            busySlots.push({
              date,
              time,
              subject: event.subject || 'Busy',
              isDemoBooking: event.subject?.toLowerCase().includes('demo')
            });
          }
        });
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
            const dateString = moment(currentDate).format('YYYY-MM-DD');

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
      const date = moment(currentDate).add(i, 'days').toDate();
      const dateString = moment(date).format('YYYY-MM-DD');

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
  async testTeamsMeetingCreation(): Promise<{ success: boolean; teamsUrl?: string; error?: string }> {
    if (!this.isConfigured || !this._graphClient) {
      return {
        success: false,
        error: 'Microsoft Graph API credentials not configured'
      };
    }

    try {
      const testMeeting = await this._graphClient
        .api(`/users/${this.userId}/onlineMeetings`)
        .post({
          startDateTime: new Date().toISOString(),
          endDateTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour later
          subject: 'Test Teams Meeting Creation'
        });

      return {
        success: true,
        teamsUrl: testMeeting.joinWebUrl
      };
    } catch (error) {
      console.error('❌ Test Teams meeting creation failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

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
