import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth-jwt';
import { applySecurityHeaders } from '@/lib/security';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const payload = requireAuth(token);

    if (!payload) {
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
