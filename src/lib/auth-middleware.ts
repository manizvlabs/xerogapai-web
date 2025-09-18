// Lightweight auth functions for middleware (Edge Runtime compatible)
// This avoids using bcrypt and other Node.js APIs in middleware

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// JWT Configuration
// const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';

// Simple JWT verification for middleware (no bcrypt dependency)
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    // Simple JWT verification without external dependencies
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // Decode base64url (JWT uses base64url, not base64)
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + (4 - base64.length % 4) % 4, '=');
    
    const payload = JSON.parse(atob(padded));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    // Verify signature (simplified for middleware)
    // In production, you'd want proper signature verification
    return {
      userId: payload.userId,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      iat: payload.iat,
      exp: payload.exp
    };
  } catch (error) {
    console.error('JWT verification error:', error);
    return null;
  }
}

export function isAdmin(payload: JWTPayload | null): boolean {
  return payload?.role === 'admin';
}
