import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

// In-memory user store (in production, use a database)
class UserStore {
  private users: Map<string, User> = new Map();
  private refreshTokens: Map<string, { userId: string; expiresAt: Date }> = new Map();
  private initialized: boolean = false;

  constructor() {
    if (!this.initialized) {
      this.initializeDefaultAdmin();
      this.initialized = true;
    }
  }

  private async initializeDefaultAdmin() {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);
    
    const adminUser: User = {
      id: '1',
      username: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@zerodigital.ai',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      isActive: true
    };

    this.users.set(adminUser.id, adminUser);
    this.users.set(adminUser.username, adminUser); // For username lookup
    
    console.log('Default admin user initialized:', {
      username: adminUser.username,
      email: adminUser.email,
      role: adminUser.role,
      isActive: adminUser.isActive,
      passwordSet: !!adminUser.password
    });
    
    // Debug: Check if user is stored correctly
    const storedUser = this.users.get(adminUser.username);
    console.log('User storage verification:', {
      username: adminUser.username,
      stored: !!storedUser,
      storedUsername: storedUser?.username,
      storedRole: storedUser?.role
    });
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'password'> & { password: string }): Promise<User> {
    const id = (this.users.size + 1).toString();
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    const user: User = {
      id,
      username: userData.username,
      email: userData.email,
      password: hashedPassword,
      role: userData.role,
      createdAt: new Date(),
      isActive: userData.isActive
    };

    this.users.set(id, user);
    this.users.set(userData.username, user);
    
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const user = this.users.get(username);
    console.log('findUserByUsername:', {
      username,
      found: !!user,
      userKeys: Array.from(this.users.keys()),
      user: user ? { id: user.id, username: user.username, role: user.role } : null
    });
    return user || null;
  }

  async updateUser(id: string, updates: Partial<Omit<User, 'id' | 'password'>>): Promise<User | null> {
    const user = this.users.get(id);
    if (!user) return null;

    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    this.users.set(updatedUser.username, updatedUser);
    
    return updatedUser;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = this.users.get(id);
    if (!user) return false;

    this.users.delete(id);
    this.users.delete(user.username);
    return true;
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    const users: Omit<User, 'password'>[] = [];
    for (const [key, user] of this.users.entries()) {
      if (key === user.id) { // Avoid duplicates
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        users.push(userWithoutPassword);
      }
    }
    return users;
  }

  // Refresh token management
  storeRefreshToken(token: string, userId: string, expiresAt: Date): void {
    this.refreshTokens.set(token, { userId, expiresAt });
  }

  getRefreshToken(token: string): { userId: string; expiresAt: Date } | null {
    const tokenData = this.refreshTokens.get(token);
    if (!tokenData) return null;

    if (tokenData.expiresAt < new Date()) {
      this.refreshTokens.delete(token);
      return null;
    }

    return tokenData;
  }

  revokeRefreshToken(token: string): void {
    this.refreshTokens.delete(token);
  }

  revokeAllUserTokens(userId: string): void {
    for (const [token, data] of this.refreshTokens.entries()) {
      if (data.userId === userId) {
        this.refreshTokens.delete(token);
      }
    }
  }
}

// Global UserStore instance to ensure true singleton
let userStore: UserStore;

// Singleton getter
function getUserStore(): UserStore {
  if (!userStore) {
    userStore = new UserStore();
    console.log('UserStore singleton created:', { instanceId: Math.random() });
  }
  return userStore;
}

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'zerodigital-super-secret-jwt-key-2024-production';
const JWT_EXPIRES_IN = '15m'; // 15 minutes
const REFRESH_TOKEN_EXPIRES_IN = '7d'; // 7 days

// Log JWT configuration for debugging
console.log('JWT Configuration:', {
  hasSecret: !!process.env.JWT_SECRET,
  secretLength: JWT_SECRET.length,
  expiresIn: JWT_EXPIRES_IN
});

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
    const decoded = jwt.verify(token, JWT_SECRET, {
      issuer: 'zerodigital.ai',
      audience: 'zerodigital-users'
    }) as JWTPayload;
    
    return decoded;
  } catch {
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
    const store = getUserStore();
    console.log('Authenticating user:', { username, passwordLength: password.length });
    console.log('UserStore instance check:', { userStoreKeys: Array.from(store['users'].keys()) });
    
    const user = await store.findUserByUsername(username);
    console.log('User found:', { user: user ? { id: user.id, username: user.username, isActive: user.isActive } : null });
    
    if (!user || !user.isActive) {
      console.log('Authentication failed: User not found or inactive');
      return { success: false, error: 'Invalid credentials' };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password validation:', { isValidPassword });
    
    if (!isValidPassword) {
      console.log('Authentication failed: Invalid password');
      return { success: false, error: 'Invalid credentials' };
    }

    // Update last login
    await store.updateUser(user.id, { lastLogin: new Date() });

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken();
    
    console.log('Authentication successful:', {
      userId: user.id,
      username: user.username,
      tokenGenerated: !!accessToken,
      refreshTokenGenerated: !!refreshToken
    });
    
    // Store refresh token
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    store.storeRefreshToken(refreshToken, user.id, refreshExpiresAt);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return { 
      success: true, 
      user: userWithoutPassword, 
      token: accessToken,
      refreshToken 
    };
  } catch {
    return { success: false, error: 'Authentication failed' };
  }
}

export async function refreshAccessToken(refreshToken: string): Promise<AuthResult> {
  try {
    // Verify refresh token
    if (!verifyRefreshToken(refreshToken)) {
      return { success: false, error: 'Invalid refresh token' };
    }

    // Check if refresh token exists in store
    const store = getUserStore();
    const tokenData = store.getRefreshToken(refreshToken);
    if (!tokenData) {
      return { success: false, error: 'Refresh token not found' };
    }

    // Get user
    const user = await store.findUserById(tokenData.userId);
    if (!user || !user.isActive) {
      return { success: false, error: 'User not found or inactive' };
    }

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
    const store = getUserStore();
    store.revokeRefreshToken(refreshToken);
    return true;
  } catch {
    return false;
  }
}

// Middleware Functions
export function requireAuth(token: string | null): JWTPayload | null {
  if (!token) return null;
  return verifyAccessToken(token);
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
    const store = getUserStore();
    // Check if user already exists
    const existingUser = await store.findUserByUsername(userData.username);
    if (existingUser) {
      return { success: false, error: 'Username already exists' };
    }

    const user = await store.createUser({
      ...userData,
      isActive: true
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch {
    return { success: false, error: 'Failed to create user' };
  }
}

export async function getAllUsers(): Promise<Omit<User, 'password'>[]> {
  const store = getUserStore();
  return store.getAllUsers();
}

export async function updateUser(id: string, updates: Partial<Omit<User, 'id' | 'password'>>): Promise<AuthResult> {
  try {
    const store = getUserStore();
    const user = await store.updateUser(id, updates);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  } catch {
    return { success: false, error: 'Failed to update user' };
  }
}

export async function deleteUser(id: string): Promise<AuthResult> {
  try {
    const store = getUserStore();
    const success = await store.deleteUser(id);
    if (!success) {
      return { success: false, error: 'User not found' };
    }

    return { success: true };
  } catch {
    return { success: false, error: 'Failed to delete user' };
  }
}

// Export user store getter for direct access if needed
export { getUserStore };
