import { NextRequest, NextResponse } from 'next/server';
import { ContactDatabase, initializeDatabase } from '@/lib/database';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';
import { withRateLimit } from '@/lib/rate-limit';

// GET /api/contacts - Get all contacts with pagination and filtering
async function getContactsHandler(request: NextRequest): Promise<Response> {
  try {
    // Initialize database if needed
    await initializeDatabase();
    
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const startDate = searchParams.get('startDate') || undefined;
    const endDate = searchParams.get('endDate') || undefined;
    const search = searchParams.get('search') || undefined;

    const result = await ContactDatabase.getContacts({
      page,
      limit,
      startDate,
      endDate,
      search
    });

    const response = NextResponse.json({
      success: true,
      data: result
    });

    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    const response = NextResponse.json({
      success: false,
      error: 'Failed to fetch contacts'
    }, { status: 500 });

    return applySecurityHeaders(response, false);
  }
}

// POST /api/contacts - Create a new contact submission
async function postContactsHandler(request: NextRequest): Promise<Response> {
  try {
    // Initialize database if needed
    await initializeDatabase();
    
    const body = await request.json();
    
    // Validate required fields - consultation forms may have different required fields
    const { firstName, lastName, email } = body;
    if (!firstName || !lastName || !email) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: firstName, lastName, and email are required'
      }, { status: 400 });
    }

    // Get client IP and user agent
    const ipAddress = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Create contact submission
    const contact = await ContactDatabase.createContact({
      firstName: body.firstName.trim(),
      lastName: body.lastName.trim(),
      email: body.email.trim(),
      phone: body.phone?.trim(),
      company: body.company?.trim(),
      service: body.service?.trim() || 'Consultation Request',
      message: body.message?.trim() || 'Consultation booking request',
      ipAddress,
      userAgent,
      // Consultation-specific fields
      jobTitle: body.jobTitle?.trim(),
      companySize: body.companySize?.trim(),
      industry: body.industry?.trim(),
      website: body.website?.trim(),
      preferredDate: body.preferredDate?.trim(),
      preferredTime: body.preferredTime?.trim(),
      timezone: body.timezone?.trim(),
      consultationGoals: body.consultationGoals?.trim(),
      currentChallenges: body.currentChallenges?.trim(),
      budget: body.budget?.trim(),
      timeline: body.timeline?.trim(),
      additionalNotes: body.additionalNotes?.trim(),
      consultationType: body.consultationType?.trim()
    });

    // Log security event
    logSecurityEvent('contact_form_submission', {
      contactId: contact.id,
      email: contact.email,
      service: contact.service,
      ipAddress
    }, request);

    const response = NextResponse.json({
      success: true,
      message: 'Contact form submitted successfully',
      data: { id: contact.id }
    });

    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error creating contact:', error);
    
    const response = NextResponse.json({
      success: false,
      error: 'Failed to submit contact form'
    }, { status: 500 });

    return applySecurityHeaders(response, false);
  }
}

export const GET = withRateLimit(getContactsHandler, 'api');
export const POST = withRateLimit(postContactsHandler, 'contact');
