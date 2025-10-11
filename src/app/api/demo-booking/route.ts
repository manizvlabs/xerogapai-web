import { NextRequest, NextResponse } from 'next/server';
import { MicrosoftGraphCalendarService } from '@/lib/email/microsoft365-calendar';
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

    console.log('📅 Fetching calendar availability for:', startDate, 'to', endDate);

    try {
      // Create a fresh calendar service instance for this request
      const calendarService = new MicrosoftGraphCalendarService();
      console.log('🔧 Created calendar service instance');

      const availability = await calendarService.getCalendarAvailability(startDate, endDate);
      console.log('✅ Got availability data:', availability ? 'Has data' : 'No data');

      return NextResponse.json({
        success: true,
        availability
      });

    } catch (serviceError) {
      console.error('❌ Calendar service error:', serviceError);
      console.error('   Error type:', typeof serviceError);
      console.error('   Error message:', serviceError.message || 'No message');
      console.error('   Stack:', serviceError.stack);

      return NextResponse.json(
        { error: 'Failed to fetch calendar availability', details: serviceError.message },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Calendar availability error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch calendar availability' },
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

    // Create calendar event
    const calendarEvent = microsoft365CalendarService.generateDemoBookingEvent(bookingData);
    const calendarResult = await microsoft365CalendarService.createCalendarEvent(calendarEvent);

    if (!calendarResult.success) {
      console.error('Calendar creation failed:', calendarResult.error);
      // Continue with booking even if calendar fails
    }

    // Send confirmation email
    const emailData = microsoft365EmailService.generateDemoBookingEmail(bookingData, calendarResult);

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
      calendarEventId: calendarResult.eventId,
      joinUrl: calendarResult.joinUrl,
    });

  } catch (error) {
    console.error('Demo booking error:', error);
    return NextResponse.json(
      { error: 'Failed to book demo' },
      { status: 500 }
    );
  }
}
