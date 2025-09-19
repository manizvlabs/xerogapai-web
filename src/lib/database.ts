import { getFileStorage } from './file-storage';
import {
  SupabaseContactDatabase,
  SupabaseUserDatabase,
  initializeSupabaseDatabase,
  isSupabaseConfigured,
  type ContactSubmission as SupabaseContactSubmission,
  type UserSubmission as SupabaseUserSubmission
} from './supabase';

// Check if we have Supabase configuration
const hasSupabaseConfig = isSupabaseConfigured();

// Global flag to track if we're using fallback
let usingFallback = false; // Default to trying Supabase first
let initialized = false;

// Database initialized

export interface ContactSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  submittedAt: string;
  ipAddress?: string;
  userAgent?: string;
}

export interface ContactStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

// User database types
export interface UserSubmission {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface ContactResponse {
  contacts: ContactSubmission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Initialize the database schema
export async function initializeDatabase() {
  

  if (initialized) {
    
    return usingFallback ? false : true;
  }

  // If no Supabase config, use fallback immediately
  if (!hasSupabaseConfig) {
    
    usingFallback = true;
    initialized = true;
    return false;
  }

  try {
    
    // Initialize Supabase database
    const success = await initializeSupabaseDatabase();

    if (success) {
      
      usingFallback = false;
      initialized = true;
      return true;
    } else {
      
      usingFallback = true;
      initialized = true;
      return false;
    }
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    
    usingFallback = true;
    initialized = true;
    return false;
  }
}

// Contact operations
export class ContactDatabase {
  // Create a new contact submission
  static async createContact(data: Omit<ContactSubmission, 'id' | 'submittedAt'>): Promise<ContactSubmission> {
    

    if (usingFallback) {
      
      return getFileStorage().createContact(data);
    }

    try {
      
      // Convert to Supabase format
      const supabaseData: Omit<SupabaseContactSubmission, 'id' | 'submitted_at'> = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        ip_address: data.ipAddress,
        user_agent: data.userAgent
      };

      const supabaseContact = await SupabaseContactDatabase.createContact(supabaseData);
      

      // Convert back to our format
      return {
        id: supabaseContact.id,
        firstName: supabaseContact.first_name,
        lastName: supabaseContact.last_name,
        email: supabaseContact.email,
        phone: supabaseContact.phone,
        company: supabaseContact.company,
        service: supabaseContact.service,
        message: supabaseContact.message,
        submittedAt: supabaseContact.submitted_at,
        ipAddress: supabaseContact.ip_address,
        userAgent: supabaseContact.user_agent
      };
    } catch (error) {
      console.error('❌ Supabase error, falling back to file storage:', error);
      usingFallback = true;
      
      return getFileStorage().createContact(data);
    }
  }

  // Get contacts with pagination and filtering
  static async getContacts(options: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
  } = {}): Promise<ContactResponse> {
    if (usingFallback) {
      return getFileStorage().getContacts(options);
    }
    
    try {
      const supabaseResponse = await SupabaseContactDatabase.getContacts(options);
      
      // Convert to our format
      const contacts: ContactSubmission[] = supabaseResponse.contacts.map(contact => ({
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        submittedAt: contact.submitted_at,
        ipAddress: contact.ip_address,
        userAgent: contact.user_agent
      }));

      return {
        contacts,
        total: supabaseResponse.total,
        page: supabaseResponse.page,
        limit: supabaseResponse.limit,
        totalPages: supabaseResponse.totalPages
      };
    } catch (error) {
      console.error('Supabase error, falling back to file storage:', error);
      usingFallback = true;
      return getFileStorage().getContacts(options);
    }
  }

  // Get a single contact by ID
  static async getContactById(id: string): Promise<ContactSubmission | null> {
    if (usingFallback) {
      return getFileStorage().getContactById(id);
    }
    
    try {
      const supabaseContact = await SupabaseContactDatabase.getContactById(id);
      
      if (!supabaseContact) {
        return null;
      }

      // Convert to our format
      return {
        id: supabaseContact.id,
        firstName: supabaseContact.first_name,
        lastName: supabaseContact.last_name,
        email: supabaseContact.email,
        phone: supabaseContact.phone,
        company: supabaseContact.company,
        service: supabaseContact.service,
        message: supabaseContact.message,
        submittedAt: supabaseContact.submitted_at,
        ipAddress: supabaseContact.ip_address,
        userAgent: supabaseContact.user_agent
      };
    } catch (error) {
      console.error('Supabase error, falling back to file storage:', error);
      usingFallback = true;
      return getFileStorage().getContactById(id);
    }
  }

  // Delete a contact
  static async deleteContact(id: string): Promise<boolean> {
    if (usingFallback) {
      return getFileStorage().deleteContact(id);
    }
    
    try {
      return await SupabaseContactDatabase.deleteContact(id);
    } catch (error) {
      console.error('Supabase error, falling back to file storage:', error);
      usingFallback = true;
      return getFileStorage().deleteContact(id);
    }
  }

  // Get contact statistics
  static async getStats(): Promise<ContactStats> {
    if (usingFallback) {
      return getFileStorage().getStats();
    }

    try {
      const supabaseStats = await SupabaseContactDatabase.getStats();
      return {
        total: supabaseStats.total,
        today: supabaseStats.today,
        thisWeek: supabaseStats.thisWeek,
        thisMonth: supabaseStats.thisMonth
      };
    } catch (error) {
      console.error('Supabase error, falling back to file storage:', error);
      usingFallback = true;
      return getFileStorage().getStats();
    }
  }
}

// User database operations
export class UserDatabase {
  // Create a new user
  static async createUser(data: Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<UserSubmission> {
    

    if (usingFallback) {
      // For now, we'll use a simple fallback - in production you might want to implement file storage
      
      throw new Error('User creation requires Supabase database');
    }

    try {
      
      // Convert to Supabase format
      const supabaseData: Omit<SupabaseUserSubmission, 'id' | 'created_at' | 'updated_at'> = {
        username: data.username,
        email: data.email,
        password_hash: data.password_hash,
        role: data.role,
        is_active: data.is_active
      };

      const supabaseUser = await SupabaseUserDatabase.createUser(supabaseData);
      

      // Convert back to our format
      return {
        id: supabaseUser.id,
        username: supabaseUser.username,
        email: supabaseUser.email,
        password_hash: supabaseUser.password_hash,
        role: supabaseUser.role,
        is_active: supabaseUser.is_active,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
        last_login: supabaseUser.last_login
      };
    } catch (error) {
      console.error('❌ Supabase error, user creation failed:', error);
      throw error;
    }
  }

  // Get user by username
  static async getUserByUsername(username: string): Promise<UserSubmission | null> {
    if (usingFallback) {
      
      return null;
    }

    try {
      const supabaseUser = await SupabaseUserDatabase.getUserByUsername(username);

      if (!supabaseUser) {
        return null;
      }

      // Convert to our format
      return {
        id: supabaseUser.id,
        username: supabaseUser.username,
        email: supabaseUser.email,
        password_hash: supabaseUser.password_hash,
        role: supabaseUser.role,
        is_active: supabaseUser.is_active,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
        last_login: supabaseUser.last_login
      };
    } catch (error) {
      console.error('Supabase error, falling back to null:', error);
      usingFallback = true;
      return null;
    }
  }

  // Get user by ID
  static async getUserById(id: string): Promise<UserSubmission | null> {
    if (usingFallback) {
      
      return null;
    }

    try {
      const supabaseUser = await SupabaseUserDatabase.getUserById(id);

      if (!supabaseUser) {
        return null;
      }

      // Convert to our format
      return {
        id: supabaseUser.id,
        username: supabaseUser.username,
        email: supabaseUser.email,
        password_hash: supabaseUser.password_hash,
        role: supabaseUser.role,
        is_active: supabaseUser.is_active,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
        last_login: supabaseUser.last_login
      };
    } catch (error) {
      console.error('Supabase error, falling back to null:', error);
      usingFallback = true;
      return null;
    }
  }

  // Update user
  static async updateUser(id: string, updates: Partial<Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>>): Promise<UserSubmission | null> {
    if (usingFallback) {
      
      return null;
    }

    try {
      const supabaseUser = await SupabaseUserDatabase.updateUser(id, updates);

      if (!supabaseUser) {
        return null;
      }

      // Convert to our format
      return {
        id: supabaseUser.id,
        username: supabaseUser.username,
        email: supabaseUser.email,
        password_hash: supabaseUser.password_hash,
        role: supabaseUser.role,
        is_active: supabaseUser.is_active,
        created_at: supabaseUser.created_at,
        updated_at: supabaseUser.updated_at,
        last_login: supabaseUser.last_login
      };
    } catch (error) {
      console.error('Supabase error, falling back to null:', error);
      usingFallback = true;
      return null;
    }
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    if (usingFallback) {
      
      return false;
    }

    try {
      return await SupabaseUserDatabase.deleteUser(id);
    } catch (error) {
      console.error('Supabase error, falling back to false:', error);
      usingFallback = true;
      return false;
    }
  }

  // Get all users
  static async getAllUsers(): Promise<UserSubmission[]> {
    if (usingFallback) {
      
      return [];
    }

    try {
      const supabaseUsers = await SupabaseUserDatabase.getAllUsers();

      // Convert to our format
      return supabaseUsers.map(user => ({
        id: user.id,
        username: user.username,
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      }));
    } catch (error) {
      console.error('Supabase error, falling back to empty array:', error);
      usingFallback = true;
      return [];
    }
  }

  // Store refresh token
  static async storeRefreshToken(token: string, userId: string, expiresAt: Date): Promise<void> {
    if (usingFallback) {
      
      return;
    }

    try {
      await SupabaseUserDatabase.storeRefreshToken(token, userId, expiresAt);
    } catch (error) {
      console.error('Supabase error storing refresh token:', error);
      usingFallback = true;
    }
  }

  // Get refresh token
  static async getRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null> {
    if (usingFallback) {
      
      return null;
    }

    try {
      return await SupabaseUserDatabase.getRefreshToken(token);
    } catch (error) {
      console.error('Supabase error getting refresh token:', error);
      usingFallback = true;
      return null;
    }
  }

  // Revoke refresh token
  static async revokeRefreshToken(token: string): Promise<void> {
    if (usingFallback) {
      
      return;
    }

    try {
      await SupabaseUserDatabase.revokeRefreshToken(token);
    } catch (error) {
      console.error('Supabase error revoking refresh token:', error);
      usingFallback = true;
    }
  }

  // Revoke all user tokens
  static async revokeAllUserTokens(userId: string): Promise<void> {
    if (usingFallback) {
      
      return;
    }

    try {
      await SupabaseUserDatabase.revokeAllUserTokens(userId);
    } catch (error) {
      console.error('Supabase error revoking all user tokens:', error);
      usingFallback = true;
    }
  }
}
