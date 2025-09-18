import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-jwt';
import { applySecurityHeaders } from '@/lib/security';
import { withRateLimit } from '@/lib/rate-limit';

async function verifyAuthHandler(request: NextRequest): Promise<Response> {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    console.log('Verify auth request:', {
      hasToken: !!token,
      tokenLength: token?.length,
      cookies: request.cookies.getAll().map(c => c.name)
    });

    if (!token) {
      console.log('No token provided');
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = requireAuth(token);
    console.log('Token verification result:', { payload: payload ? { userId: payload.userId, username: payload.username } : null });

    if (!payload) {
      console.log('Invalid token');
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    // Return user info
    const response = NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        username: payload.username,
        email: payload.email,
        role: payload.role
      }
    });

    return applySecurityHeaders(response, true);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(verifyAuthHandler, 'api');
