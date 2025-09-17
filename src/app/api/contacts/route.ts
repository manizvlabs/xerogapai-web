import { NextRequest, NextResponse } from 'next/server';
import { ContactDatabase, initializeDatabase } from '@/lib/database';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

// GET /api/contacts - Get all contacts with pagination and filtering
export async function GET(request: NextRequest) {
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
export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed
    await initializeDatabase();
    
    const body = await request.json();
    
    // Validate required fields
    const { firstName, lastName, email, service, message } = body;
    if (!firstName || !lastName || !email || !service || !message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
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
      service: body.service.trim(),
      message: body.message.trim(),
      ipAddress,
      userAgent
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
