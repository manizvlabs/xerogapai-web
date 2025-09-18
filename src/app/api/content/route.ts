import { NextRequest, NextResponse } from 'next/server';
import { applySecurityHeaders } from '@/lib/security';
import { contentStore } from '@/lib/content-store';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const section = searchParams.get('section');

    if (section && contentStore[section as keyof typeof contentStore]) {
      const response = NextResponse.json({
        success: true,
        section,
        content: contentStore[section as keyof typeof contentStore]
      });
      return applySecurityHeaders(response, false);
    }

    const response = NextResponse.json({
      success: true,
      content: contentStore
    });
    return applySecurityHeaders(response, false);
  } catch (error) {
    console.error('Error fetching content:', error);
    const response = NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    return applySecurityHeaders(response, false);
  }
}
