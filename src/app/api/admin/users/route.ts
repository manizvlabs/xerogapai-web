import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, isAdmin, getAllUsers, createUser, updateUser, deleteUser } from '@/lib/auth-jwt';
import { withRateLimit } from '@/lib/rate-limit';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

// GET /api/admin/users - Get all users
async function getUsersHandler(request: NextRequest): Promise<Response> {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
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
  } catch (error) {
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
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
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
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/users/[id] - Update user
async function updateUserHandler(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    const payload = requireAuth(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { username, email, role, isActive } = body;

    const updates: any = {};
    if (username !== undefined) updates.username = username;
    if (email !== undefined) updates.email = email;
    if (role !== undefined) {
      if (!['admin', 'user'].includes(role)) {
        return NextResponse.json(
          { error: 'Invalid role. Must be admin or user' },
          { status: 400 }
        );
      }
      updates.role = role;
    }
    if (isActive !== undefined) updates.isActive = isActive;

    const result = await updateUser(params.id, updates);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Log user update
    logSecurityEvent('user_updated', {
      updatedBy: payload.userId,
      targetUserId: params.id,
      updates: Object.keys(updates)
    }, request);

    const response = NextResponse.json({
      success: true,
      user: result.user
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
async function deleteUserHandler(request: NextRequest, { params }: { params: { id: string } }): Promise<Response> {
  try {
    // Check authentication
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '');
    
    const payload = requireAuth(token);
    if (!payload || !isAdmin(payload)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Prevent admin from deleting themselves
    if (payload.userId === params.id) {
      return NextResponse.json(
        { error: 'Cannot delete your own account' },
        { status: 400 }
      );
    }

    const result = await deleteUser(params.id);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    // Log user deletion
    logSecurityEvent('user_deleted', {
      deletedBy: payload.userId,
      targetUserId: params.id
    }, request);

    const response = NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

    return applySecurityHeaders(response, true);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const GET = withRateLimit(getUsersHandler, 'admin');
export const POST = withRateLimit(createUserHandler, 'admin');
export const PUT = withRateLimit(updateUserHandler, 'admin');
export const DELETE = withRateLimit(deleteUserHandler, 'admin');
