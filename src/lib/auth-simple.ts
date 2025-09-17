// Simple authentication system compatible with Edge Runtime
// For production, consider using a proper auth service like Auth0, Clerk, or NextAuth.js

export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
}

export interface AuthResult {
  success: boolean;
  user?: User;
  token?: string;
  error?: string;
}

// Simple token generation (not cryptographically secure - for demo only)
function generateSimpleToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    timestamp: Date.now()
  };
  
  // Base64 encode the payload (not secure - for demo only)
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Simple token verification (not cryptographically secure - for demo only)
function verifySimpleToken(token: string): User | null {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - payload.timestamp;
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return null;
    }
    
    return {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role
    };
  } catch (error) {
    return null;
  }
}

// Simple password hashing (not secure - for demo only)
function hashPassword(password: string): string {
  // In production, use proper password hashing
  return Buffer.from(password).toString('base64');
}

function verifyPassword(password: string, hashedPassword: string): boolean {
  return hashPassword(password) === hashedPassword;
}

// Admin credentials - In production, store in database with proper hashing
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASSWORD || 'admin123', // Change this in production!
  email: process.env.ADMIN_EMAIL || 'admin@zerodigital.ai',
  role: 'admin'
};

// Authenticate user
export async function authenticateUser(username: string, password: string): Promise<AuthResult> {
  try {
    // In production, fetch from database
    if (username !== ADMIN_CREDENTIALS.username) {
      return { success: false, error: 'Invalid credentials' };
    }

    // In production, compare with hashed password from database
    const isValidPassword = password === ADMIN_CREDENTIALS.password;
    
    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }

    const user: User = {
      id: '1',
      username: ADMIN_CREDENTIALS.username,
      email: ADMIN_CREDENTIALS.email,
      role: ADMIN_CREDENTIALS.role
    };

    const token = generateSimpleToken(user);

    return { success: true, user, token };
  } catch (error) {
    return { success: false, error: 'Authentication failed' };
  }
}

// Middleware to check authentication
export function requireAuth(token: string | null): User | null {
  if (!token) {
    return null;
  }

  return verifySimpleToken(token);
}

// Check if user has admin role
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin';
}

// Generate JWT token (placeholder for compatibility)
export function generateToken(user: User): string {
  return generateSimpleToken(user);
}

// Verify JWT token (placeholder for compatibility)
export function verifyToken(token: string): User | null {
  return verifySimpleToken(token);
}

// Hash password (placeholder for compatibility)
export async function hashPasswordAsync(password: string): Promise<string> {
  return hashPassword(password);
}

// Verify password (placeholder for compatibility)
export async function verifyPasswordAsync(password: string, hashedPassword: string): Promise<boolean> {
  return verifyPassword(password, hashedPassword);
}
