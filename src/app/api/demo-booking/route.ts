import { NextRequest, NextResponse } from 'next/server';
import { MicrosoftGraphCalendarService, microsoft365CalendarService } from '@/lib/email/microsoft365-calendar';
import { microsoft365EmailService } from '@/lib/email/microsoft365-email';

// Force reload the module to get fresh service instances
delete require.cache[require.resolve('@/lib/email/microsoft365-calendar')];

// GET endpoint for calendar availability
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

// Test endpoint for Teams meeting creation
export async function PATCH(request: NextRequest) {
  try {
    // Create a fresh calendar service instance for this request
    const calendarService = new MicrosoftGraphCalendarService();

    // Test Teams meeting creation
    const testResult = await calendarService.testTeamsMeetingCreation();

    return NextResponse.json({
      success: true,
      testResult
    });

  } catch (error) {
    console.error('Teams meeting test error:', error);
    return NextResponse.json(
      { error: 'Failed to test Teams meeting creation' },
      { status: 500 }
    );
  }
}

// POST endpoint for demo booking
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookingData = body as {
      firstName: string;
      lastName: string;
      email: string;
      companyName: string;
      preferredDate: string;
      preferredTime: string;
      timezone: string;
      consultationType: string;
      bookingMethod: string;
    };

    // Validate required fields
    if (!bookingData.firstName || !bookingData.lastName || !bookingData.email || !bookingData.preferredDate || !bookingData.preferredTime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create calendar event - use fresh service instance
    console.log('📅 Creating calendar event for booking...');
    const calendarService = new MicrosoftGraphCalendarService();
    const calendarEvent = calendarService.generateDemoBookingEvent(bookingData);
    console.log('📅 Generated calendar event data');

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

    // For testing purposes, use a real email address that can receive emails
    const testEmail = 'manish.08.hbti@gmail.com';

    // Send confirmation email - use real email for testing
    const emailData = microsoft365EmailService.generateDemoBookingEmail({
      ...bookingData,
      email: testEmail // Override with real email for testing
    }, calendarResult);

    // Send the confirmation email
    try {
      const emailResult = await microsoft365EmailService.sendEmail(emailData);
      if (!emailResult.success) {
        console.warn('Failed to send confirmation email:', emailResult.error);
      }
    } catch (emailError) {
      console.warn('Email sending failed:', emailError);
      // Continue with booking even if email fails
    }

    // Store booking data in database (for now, just log it)
    console.log('Demo booking stored:', {
      ...bookingData,
      calendarEventId: calendarResult.eventId,
      calendarJoinUrl: calendarResult.joinUrl,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: 'Demo booked successfully',
      calendarEventId: calendarResult.eventId || null,
      joinUrl: calendarResult.joinUrl || null,
      calendarResult: calendarResult, // Include full result for debugging
    });

  } catch (error) {
    console.error('Demo booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book demo' },
      { status: 500 }
    );
  }
}
