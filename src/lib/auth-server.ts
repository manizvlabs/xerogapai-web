import { NextRequest } from 'next/server';
import { verifyAccessToken } from './auth-middleware';

export interface ServerUser {
  id: string;
  username: string;
  email: string;
  role: string;
}

export function getServerUser(request: NextRequest): ServerUser | null {
  const token = request.cookies.get('auth-token')?.value || 
                request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!token) return null;
  
  const payload = verifyAccessToken(token);
  if (!payload) return null;
  
  return {
    id: payload.userId,
    username: payload.username,
    email: payload.email,
    role: payload.role
  };
}

export function requireServerAuth(request: NextRequest): ServerUser {
  const user = getServerUser(request);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

export function isServerAdmin(request: NextRequest): boolean {
  const user = getServerUser(request);
  return user?.role === 'admin';
}
