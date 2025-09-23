import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
// Simple password validation function
function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Minimum length
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  // Uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Number
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Special character
  if (!/[^A-Za-z0-9]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
import { UserDatabase } from './database';

// Initialize admin user on startup
async function initializeAdminUser() {
  try {

    // Check if Supabase is configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-ref') || supabaseKey.includes('your-anon-key')) {
      return;
    }

    const existingAdmin = await UserDatabase.getUserByUsername('admin');
    if (existingAdmin) {
      return;
    }

    // Use the exact password from .env.local
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not set in .env.local');
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    // Create admin user in database
    const adminUser = await UserDatabase.createUser({
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@zerodigital.ai',
      password_hash: hashedPassword,
      role: 'admin',
      is_active: true
    });

  } catch (error) {
    console.error('Failed to initialize admin user:', error);
    // In development, we can continue without admin user
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
}

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  password: string; // hashed
  role: 'admin' | 'user';
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export interface AuthResult {
  success: boolean;
  user?: Omit<User, 'password'>;
  token?: string;
  refreshToken?: string;
  error?: string;
}

export interface JWTPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

// JWT Configuration
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET || 'p4s028GCng2A52WfnWbBukY7xUmVlgtBGlEPtY+sWKi/LW39d2GU9+nX2fHEpPakzsTrq9M3IaMr/Mp7eIlDYw==';
console.log('JWT_SECRET loaded:', JWT_SECRET ? '✅' : '❌');
const JWT_EXPIRES_IN = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 days


// JWT Token Generation
export function generateAccessToken(user: User): string {
  const payload: Omit<JWTPayload, 'iat' | 'exp'> = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    issuer: 'zerodigital.ai',
    audience: 'zerodigital-users'
  });
}

export function generateRefreshToken(): string {
  return jwt.sign({}, JWT_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: 'zerodigital.ai',
    audience: 'zerodigital-refresh'
  });
}

// JWT Token Verification
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    console.log('verifyAccessToken: Verifying with JWT_SECRET:', JWT_SECRET.substring(0, 10) + '...');
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'zerodigital.ai',
      audience: 'zerodigital-users'
    }) as JWTPayload;
    console.log('verifyAccessToken: Successfully decoded token');
    return decoded;
  } catch (error) {
    console.log('verifyAccessToken: Verification failed:', error.message);
    return null;
  }
}

export function verifyRefreshToken(token: string): boolean {
  try {
    jwt.verify(token, JWT_SECRET, {
      issuer: 'zerodigital.ai',
      audience: 'zerodigital-refresh'
    });
    return true;
  } catch {
    return false;
  }
}

// Authentication Functions
export async function authenticateUser(username: string, password: string): Promise<AuthResult> {
  try {

    let dbUser;
    try {
      dbUser = await UserDatabase.getUserByUsername(username);
    } catch (dbError) {
      console.error('Database error during user lookup:', dbError);
      return { success: false, error: 'Database connection failed' };
    }

    if (!dbUser || !dbUser.is_active) {
      return { success: false, error: 'Invalid credentials' };
    }

    const isValidPassword = await bcrypt.compare(password, dbUser.password_hash);

    if (!isValidPassword) {
      return { success: false, error: 'Invalid credentials' };
    }

    // Update last login
    try {
      await UserDatabase.updateUser(dbUser.id, { last_login: new Date().toISOString() });
    } catch (updateError) {
      // Don't fail the authentication for this, just log it
      console.error('Failed to update last login:', updateError);
    }

    // Convert database user to our User format
    const user: User = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password_hash,
      role: dbUser.role,
      createdAt: new Date(dbUser.created_at),
      lastLogin: dbUser.last_login ? new Date(dbUser.last_login) : undefined,
      isActive: dbUser.is_active
    };

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();

    // Store refresh token
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    try {
      await UserDatabase.storeRefreshToken(refreshToken, user.id, refreshExpiresAt);
    } catch (tokenError) {
      // Don't fail the authentication for this, just log it
      console.error('Failed to store refresh token:', tokenError);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token: accessToken,
      refreshToken
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<AuthResult> {
  try {
    // Verify refresh token
    if (!verifyRefreshToken(refreshToken)) {
      return { success: false, error: 'Invalid refresh token' };
    }

    // Check if refresh token exists in database
    const tokenData = await UserDatabase.getRefreshToken(refreshToken);
    if (!tokenData) {
      return { success: false, error: 'Refresh token not found' };
    }

    // Get user
    const dbUser = await UserDatabase.getUserById(tokenData.userId);
    if (!dbUser || !dbUser.is_active) {
      return { success: false, error: 'User not found or inactive' };
    }

    // Convert to our User format
    const user: User = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password_hash,
      role: dbUser.role,
      createdAt: new Date(dbUser.created_at),
      lastLogin: dbUser.last_login ? new Date(dbUser.last_login) : undefined,
      isActive: dbUser.is_active
    };

    // Generate new access token
    const newAccessToken = generateAccessToken(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return {
      success: true,
      user: userWithoutPassword,
      token: newAccessToken
    };
  } catch {
    return { success: false, error: 'Token refresh failed' };
  }
}

export async function revokeToken(refreshToken: string): Promise<boolean> {
  try {
    await UserDatabase.revokeRefreshToken(refreshToken);
    return true;
  } catch {
    return false;
  }
}

// Middleware Functions
export function requireAuth(token: string | null): JWTPayload | null {
  if (!token) {
    console.log('requireAuth: No token provided');
    return null;
  }
  console.log('requireAuth: Verifying token:', token.substring(0, 20) + '...');
  const result = verifyAccessToken(token);
  console.log('requireAuth: Verification result:', !!result);
  return result;
}

export function isAdmin(payload: JWTPayload | null): boolean {
  return payload?.role === 'admin';
}

// User Management Functions
export async function createUser(userData: {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}): Promise<AuthResult> {
  try {
    // Validate password strength
    const passwordValidation = validatePassword(userData.password);
    if (!passwordValidation.isValid) {
      return {
        success: false,
        error: `Password does not meet requirements: ${passwordValidation.errors.join(', ')}`
      };
    }

    // Check if user already exists
    const existingUser = await UserDatabase.getUserByUsername(userData.username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userData.password, 12);

    const dbUser = await UserDatabase.createUser({
      username: userData.username,
      email: userData.email,
      password_hash: hashedPassword,
      role: userData.role,
      is_active: true
    });

    // Convert to our User format
    const user: User = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password_hash,
      role: dbUser.role,
      createdAt: new Date(dbUser.created_at),
      lastLogin: dbUser.last_login ? new Date(dbUser.last_login) : undefined,
      isActive: dbUser.is_active
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch {
    return { success: false, error: 'Failed to create user' };
  }
}

export async function getAllUsers(): Promise<Omit<User, 'password'>[]> {
  const dbUsers = await UserDatabase.getAllUsers();

  return dbUsers.map(dbUser => ({
    id: dbUser.id,
    username: dbUser.username,
    email: dbUser.email,
    role: dbUser.role,
    createdAt: new Date(dbUser.created_at),
    lastLogin: dbUser.last_login ? new Date(dbUser.last_login) : undefined,
    isActive: dbUser.is_active
  }));
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'password'>>): Promise<AuthResult> {
  try {
    const dbUser = await UserDatabase.updateUser(id, updates);
    if (!dbUser) {
      return { success: false, error: 'User not found' };
    }

    // Convert to our User format
    const user: User = {
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      password: dbUser.password_hash,
      role: dbUser.role,
      createdAt: new Date(dbUser.created_at),
      lastLogin: dbUser.last_login ? new Date(dbUser.last_login) : undefined,
      isActive: dbUser.is_active
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch {
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(id: string): Promise<AuthResult> {
  try {
    const success = await UserDatabase.deleteUser(id);
    if (!success) {
      return { success: false, error: 'User not found' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete user' };
  }
}

// Initialize admin user on module load
initializeAdminUser();