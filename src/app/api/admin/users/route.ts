import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, isAdmin, getAllUsers, createUser } from '@/lib/auth-jwt';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

// GET /api/admin/users - Get all users
async function getUsersHandler(request: NextRequest): Promise<Response> {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '') || null;

    const payload = requireAuth(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const users = await getAllUsers();
    
    const response = NextResponse.json({
      success: true,
      users
    });

    return applySecurityHeaders(response, true);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/admin/users - Create new user
async function createUserHandler(request: NextRequest): Promise<Response> {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value ||
                  request.headers.get('authorization')?.replace('Bearer ', '') || null;

    const payload = requireAuth(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username, email, password, role } = body;

    // Validate input
    if (!username || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Username, email, password, and role are required' },
        { status: 400 }
      );
    }

    if (!['admin', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be admin or user' },
        { status: 400 }
      );
    }

    const result = await createUser({
      username,
      email,
      password,
      role: role as 'admin' | 'user'
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Log user creation
    logSecurityEvent('user_created', {
      createdBy: payload.userId,
      newUserId: result.user?.id,
      newUsername: result.user?.username
    }, request);

    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    return applySecurityHeaders(response, true);
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


export const GET = withRateLimit(getUsersHandler, 'admin');
export const POST = withRateLimit(createUserHandler, 'admin');
