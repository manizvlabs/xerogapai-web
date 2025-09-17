import { NextRequest, NextResponse } from 'next/server';
import { ContactDatabase, initializeDatabase } from '@/lib/database';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

// GET /api/contacts/[id] - Get a single contact by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize database if needed
    await initializeDatabase();
    
    const contact = await ContactDatabase.getContactById(params.id);
    
    if (!contact) {
      return NextResponse.json({
        success: false,
        error: 'Contact not found'
      }, { status: 404 });
    }

    const response = NextResponse.json({
      success: true,
      data: contact
    });

    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error fetching contact:', error);
    
    const response = NextResponse.json({
      success: false,
      error: 'Failed to fetch contact'
    }, { status: 500 });

    return applySecurityHeaders(response, false);
  }
}

// DELETE /api/contacts/[id] - Delete a contact by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Initialize database if needed
    await initializeDatabase();
    
    const success = await ContactDatabase.deleteContact(params.id);
    
    if (!success) {
      return NextResponse.json({
        success: false,
        error: 'Contact not found'
      }, { status: 404 });
    }

    // Log security event
    logSecurityEvent('contact_deleted', {
      contactId: params.id,
      ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
    }, request);

    const response = NextResponse.json({
      success: true,
      message: 'Contact deleted successfully'
    });

    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error deleting contact:', error);
    
    const response = NextResponse.json({
      success: false,
      error: 'Failed to delete contact'
    }, { status: 500 });

    return applySecurityHeaders(response, false);
  }
}
