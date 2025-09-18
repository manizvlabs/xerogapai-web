import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, isAdmin, updateUser, deleteUser } from '@/lib/auth-jwt';
import { applySecurityHeaders, logSecurityEvent } from '@/lib/security';

// PUT /api/admin/users/[id] - Update user
export async function PUT(request: NextRequest, context: { params: Promise<{ id: string }> }): Promise<Response> {
  const params = await context.params;
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
    const { username, email, role, isActive } = body;

    const updates: Record<string, unknown> = {};
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
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/users/[id] - Delete user
export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }): Promise<Response> {
  const params = await context.params;
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
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
