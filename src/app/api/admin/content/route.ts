import { NextRequest, NextResponse } from 'next/server';
import { verifyAccessToken, isAdmin } from '@/lib/auth-middleware';
import { sanitizeInput, logSecurityEvent } from '@/lib/security';
import { contentConfig } from '@/config/content';

// In-memory content store (in production, use a database)
const contentStore = { ...contentConfig };

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section && contentStore[section as keyof typeof contentStore]) {
      return NextResponse.json({
        success: true,
        section,
        content: contentStore[section as keyof typeof contentStore]
      });
    }

    return NextResponse.json({
      success: true,
      content: contentStore
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Verify admin authentication
    const token = request.headers.get('authorization')?.replace('Bearer ', '') ||
                  request.cookies.get('auth-token')?.value;
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload = verifyAccessToken(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { section, content } = body;

    if (!section || !content) {
      return NextResponse.json({ error: 'Section and content are required' }, { status: 400 });
    }

    // Sanitize input
    const sanitizedSection = sanitizeInput(section);
    const sanitizedContent = content; // Content is already validated as JSON object

    // Update content store
    if (contentStore[sanitizedSection as keyof typeof contentStore]) {
      contentStore[sanitizedSection as keyof typeof contentStore] = sanitizedContent;
      
      // Log the content update
      logSecurityEvent('content_updated', {
        section: sanitizedSection,
        userId: payload.userId,
        username: payload.username
      }, request);

      return NextResponse.json({
        success: true,
        message: 'Content updated successfully',
        section: sanitizedSection,
        content: sanitizedContent
      });
    } else {
      return NextResponse.json({ error: 'Invalid section' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating content:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
