import { createClient } from '@supabase/supabase-js';

// Supabase configuration - lazy loaded
let supabaseClient: ReturnType<typeof createClient> | null = null;

// Get Supabase client (lazy initialization)
export const getSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    },
    global: {
      fetch: (url, options = {}) => {
        // Preserve original headers and add required Supabase headers
        const headers = {
          ...options.headers,
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'User-Agent': 'zero-website/1.0.1'
        };

        // Ensure Content-Type is set for JSON requests
        if (options.body && !headers['Content-Type']) {
          headers['Content-Type'] = 'application/json';
        }

        return fetch(url, {
          ...options,
          headers
        });
      }
    }
  });

  return supabaseClient;
};

// Legacy export for backward compatibility
export const supabase = getSupabaseClient();

<<<<<<< HEAD
// Get Supabase service role client (bypasses RLS)
export const getSupabaseServiceClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  });
};

=======
>>>>>>> main
// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(supabaseUrl && supabaseAnonKey);
};

// Database schema types
export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  submitted_at: string;
  ip_address?: string;
  user_agent?: string;
}

export interface ContactStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
}

<<<<<<< HEAD
// User database schema types
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

export interface RefreshTokenSubmission {
  id: string;
  token: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

=======
>>>>>>> main
export interface ContactResponse {
  contacts: ContactSubmission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Initialize database schema
export async function initializeSupabaseDatabase() {
  if (!isSupabaseConfigured()) {
<<<<<<< HEAD
    
=======
    console.log('🔄 Supabase not configured, using fallback storage');
>>>>>>> main
    return false;
  }

  try {
    // Get the Supabase client
    const client = getSupabaseClient();
    if (!client) {
<<<<<<< HEAD
      
=======
      console.log('🔄 Supabase client not available, using fallback storage');
>>>>>>> main
      return false;
    }

    // Test if contacts table exists by trying to query it
    const { error: testError } = await client
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (testError) {
      if (testError.code === 'PGRST116') {
<<<<<<< HEAD
        
        
=======
        console.log('⚠️  Contacts table does not exist. Please create it manually in Supabase dashboard.');
        console.log('📖 See docs/deployment/SUPABASE_SETUP.md for SQL schema');
>>>>>>> main
        return false;
      } else {
        throw testError;
      }
    }

<<<<<<< HEAD
    
=======
    console.log('✅ Supabase database initialized successfully');
>>>>>>> main
    return true;
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    return false;
  }
}

// Contact operations
export class SupabaseContactDatabase {
  // Create a new contact submission
  static async createContact(data: Omit<ContactSubmission, 'id' | 'submitted_at'>): Promise<ContactSubmission> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      // Use insert-only approach to avoid RLS issues and duplicates
      const { error: insertError } = await client
        .from('contacts')
        .insert({
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone || null,
          company: data.company || null,
          service: data.service,
          message: data.message,
          ip_address: data.ip_address || null,
          user_agent: data.user_agent || null
        });

      if (insertError) {
        throw insertError;
      }

      // Since we can't get the inserted data due to RLS, create a mock response
      // This works around RLS limitations without creating duplicates
      const mockId = Date.now().toString();
      return {
        id: mockId,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        submitted_at: new Date().toISOString(),
        ip_address: data.ip_address,
        user_agent: data.user_agent
      };
    } catch (error) {
      console.error('Supabase error creating contact:', error);
      throw error;
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
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const {
        page = 1,
        limit = 10,
        startDate,
        endDate,
        search
      } = options;

      const offset = (page - 1) * limit;

      // Build query
      let query = client
        .from('contacts')
        .select('*', { count: 'exact' });

      // Apply filters
      if (startDate) {
        query = query.gte('submitted_at', startDate);
      }

      if (endDate) {
        query = query.lte('submitted_at', endDate);
      }

      if (search) {
        query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%,service.ilike.%${search}%,message.ilike.%${search}%`);
      }

      // Apply pagination and ordering
      const { data: contacts, error, count } = await query
        .order('submitted_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        throw error;
      }

      const total = count || 0;
      const totalPages = Math.ceil(total / limit);

      return {
        contacts: contacts?.map(contact => ({
          id: contact.id.toString(),
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
          company: contact.company,
          service: contact.service,
          message: contact.message,
          submitted_at: contact.submitted_at,
          ip_address: contact.ip_address,
          user_agent: contact.user_agent
        })) || [],
        total,
        page,
        limit,
        totalPages
      };
    } catch (error) {
      console.error('Supabase error fetching contacts:', error);
      throw error;
    }
  }

  // Get a single contact by ID
  static async getContactById(id: string): Promise<ContactSubmission | null> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data: contact, error } = await client
        .from('contacts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw error;
      }

      return {
        id: contact.id.toString(),
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        submitted_at: contact.submitted_at,
        ip_address: contact.ip_address,
        user_agent: contact.user_agent
      };
    } catch (error) {
      console.error('Supabase error fetching contact:', error);
      throw error;
    }
  }

  // Delete a contact
  static async deleteContact(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await client
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Supabase error deleting contact:', error);
      throw error;
    }
  }

  // Get contact statistics
  static async getStats(): Promise<ContactStats> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      // Simpler approach: get all contacts and calculate stats in memory
      // This avoids the complex count queries that seem to be failing
      const { data: contacts, error } = await client
        .from('contacts')
        .select('submitted_at');

      if (error) {
        console.error('❌ Error fetching contacts:', error);
        throw error;
      }

      if (!contacts || contacts.length === 0) {
        return { total: 0, today: 0, thisWeek: 0, thisMonth: 0 };
      }

      const now = new Date();
      const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      let todayCount = 0;
      let weekCount = 0;
      let monthCount = 0;

      // Calculate stats by iterating through contacts
      for (const contact of contacts) {
        const submittedAt = new Date(contact.submitted_at);

        if (submittedAt >= today) {
          todayCount++;
        }
        if (submittedAt >= weekAgo) {
          weekCount++;
        }
        if (submittedAt >= monthAgo) {
          monthCount++;
        }
      }

      const stats = {
        total: contacts.length,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount
      };

      return stats;
    } catch (error) {
      console.error('❌ Supabase error fetching stats:', error);
      throw error;
    }
  }
}
<<<<<<< HEAD

// User database operations
export class SupabaseUserDatabase {
  // Create a new user
  static async createUser(data: Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>): Promise<UserSubmission> {
    // Use service role client to bypass RLS policies
    const client = getSupabaseServiceClient();
    if (!client) {
      
      const fallbackClient = getSupabaseClient();
      if (!fallbackClient) {
        throw new Error('Supabase not configured');
      }
      // Try with fallback client (may fail due to RLS)
      try {
        const { data: insertedUser, error: insertError } = await fallbackClient
          .from('users')
          .insert({
            username: data.username,
            email: data.email,
            password_hash: data.password_hash,
            role: data.role,
            is_active: data.is_active
          })
          .select()
          .single();

        if (insertError) {
          throw insertError;
        }

        return {
          id: insertedUser.id.toString(),
          username: insertedUser.username,
          email: insertedUser.email,
          password_hash: insertedUser.password_hash,
          role: insertedUser.role,
          is_active: insertedUser.is_active,
          created_at: insertedUser.created_at,
          updated_at: insertedUser.updated_at,
          last_login: insertedUser.last_login
        };
      } catch (fallbackError) {
        
        throw fallbackError;
      }
    }

    try {
      const { data: insertedUser, error: insertError } = await client
        .from('users')
        .insert({
          username: data.username,
          email: data.email,
          password_hash: data.password_hash,
          role: data.role,
          is_active: data.is_active
        })
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      return {
        id: insertedUser.id.toString(),
        username: insertedUser.username,
        email: insertedUser.email,
        password_hash: insertedUser.password_hash,
        role: insertedUser.role,
        is_active: insertedUser.is_active,
        created_at: insertedUser.created_at,
        updated_at: insertedUser.updated_at,
        last_login: insertedUser.last_login
      };
    } catch (error) {
      console.error('Supabase service role error creating user:', error);
      throw error;
    }
  }

  // Get user by username
  static async getUserByUsername(username: string): Promise<UserSubmission | null> {
    // Use service role client for authentication (bypasses RLS)
    const client = getSupabaseServiceClient();
    if (!client) {
      
      const fallbackClient = getSupabaseClient();
      if (!fallbackClient) {
        throw new Error('Supabase not configured');
      }
      // For fallback, try with anon key (might fail due to RLS)
      try {
        const { data: user, error } = await fallbackClient
          .from('users')
          .select('*')
          .eq('username', username)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            return null; // No rows found
          }
          throw error;
        }

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          password_hash: user.password_hash,
          role: user.role,
          is_active: user.is_active,
          created_at: user.created_at,
          updated_at: user.updated_at,
          last_login: user.last_login
        };
      } catch (fallbackError) {
        
        throw fallbackError;
      }
    }

    try {
      const { data: user, error } = await client
        .from('users')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw error;
      }

      if (!user) {
        return null;
      }

      return {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      };
    } catch (error) {
      console.error('Supabase error fetching user by username:', error);
      throw error;
    }
  }

  // Get user by ID
  static async getUserById(id: string): Promise<UserSubmission | null> {
    // Use service role client for authentication (bypasses RLS)
    const client = getSupabaseServiceClient();
    if (!client) {
      
      const fallbackClient = getSupabaseClient();
      if (!fallbackClient) {
        throw new Error('Supabase not configured');
      }
      // For fallback, try with anon key (might fail due to RLS)
      try {
        const { data: user, error } = await fallbackClient
          .from('users')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            return null; // No rows found
          }
          throw error;
        }

        if (!user) {
          return null;
        }

        return {
          id: user.id.toString(),
          username: user.username,
          email: user.email,
          password_hash: user.password_hash,
          role: user.role,
          is_active: user.is_active,
          created_at: user.created_at,
          updated_at: user.updated_at,
          last_login: user.last_login
        };
      } catch (fallbackError) {
        
        throw fallbackError;
      }
    }

    try {
      const { data: user, error } = await client
        .from('users')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw error;
      }

      if (!user) {
        return null;
      }

      return {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      };
    } catch (error) {
      console.error('Supabase error fetching user by ID:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id: string, updates: Partial<Omit<UserSubmission, 'id' | 'created_at' | 'updated_at'>>): Promise<UserSubmission | null> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data: user, error } = await client
        .from('users')
        .update({
          username: updates.username,
          email: updates.email,
          password_hash: updates.password_hash,
          role: updates.role,
          is_active: updates.is_active,
          last_login: updates.last_login
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (!user) {
        return null;
      }

      return {
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      };
    } catch (error) {
      console.error('Supabase error updating user:', error);
      throw error;
    }
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await client
        .from('users')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Supabase error deleting user:', error);
      throw error;
    }
  }

  // Get all users
  static async getAllUsers(): Promise<UserSubmission[]> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { data: users, error } = await client
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return users?.map(user => ({
        id: user.id.toString(),
        username: user.username,
        email: user.email,
        password_hash: user.password_hash,
        role: user.role,
        is_active: user.is_active,
        created_at: user.created_at,
        updated_at: user.updated_at,
        last_login: user.last_login
      })) || [];
    } catch (error) {
      console.error('Supabase error fetching all users:', error);
      throw error;
    }
  }

  // Store refresh token
  static async storeRefreshToken(token: string, userId: string, expiresAt: Date): Promise<void> {
    // Use service role client to bypass RLS policies
    const client = getSupabaseServiceClient();
    if (!client) {
      
      const fallbackClient = getSupabaseClient();
      if (!fallbackClient) {
        throw new Error('Supabase not configured');
      }
      // Try with fallback client (may fail due to RLS)
      try {
        const { error } = await fallbackClient
          .from('refresh_tokens')
          .insert({
            token: token,
            user_id: parseInt(userId),
            expires_at: expiresAt.toISOString()
          });

        if (error) {
          throw error;
        }
        return;
      } catch (fallbackError) {
        
        throw fallbackError;
      }
    }

    try {
      const { error } = await client
        .from('refresh_tokens')
        .insert({
          token: token,
          user_id: parseInt(userId),
          expires_at: expiresAt.toISOString()
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Supabase service role error storing refresh token:', error);
      throw error;
    }
  }

  // Get refresh token
  static async getRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null> {
    // Use service role client to bypass RLS policies
    const client = getSupabaseServiceClient();
    if (!client) {
      
      const fallbackClient = getSupabaseClient();
      if (!fallbackClient) {
        throw new Error('Supabase not configured');
      }
      // Try with fallback client (may fail due to RLS)
      try {
        const { data: tokenData, error } = await fallbackClient
          .from('refresh_tokens')
          .select('*')
          .eq('token', token)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
            return null; // No rows found
          }
          throw error;
        }

        // Check if token is expired
        const expiresAt = new Date(tokenData.expires_at);
        if (expiresAt < new Date()) {
          // Clean up expired token
          await fallbackClient
            .from('refresh_tokens')
            .delete()
            .eq('token', token);
          return null;
        }

        return {
          userId: tokenData.user_id.toString(),
          expiresAt: expiresAt
        };
      } catch (fallbackError) {
        
        throw fallbackError;
      }
    }

    try {
      const { data: tokenData, error } = await client
        .from('refresh_tokens')
        .select('*')
        .eq('token', token)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No rows found
        }
        throw error;
      }

      // Check if token is expired
      const expiresAt = new Date(tokenData.expires_at);
      if (expiresAt < new Date()) {
        // Clean up expired token
        await client
          .from('refresh_tokens')
          .delete()
          .eq('token', token);
        return null;
      }

      return {
        userId: tokenData.user_id.toString(),
        expiresAt: expiresAt
      };
    } catch (error) {
      console.error('Supabase error fetching refresh token:', error);
      throw error;
    }
  }

  // Revoke refresh token
  static async revokeRefreshToken(token: string): Promise<void> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await client
        .from('refresh_tokens')
        .delete()
        .eq('token', token);

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Supabase error revoking refresh token:', error);
      throw error;
    }
  }

  // Revoke all user tokens
  static async revokeAllUserTokens(userId: string): Promise<void> {
    const client = getSupabaseClient();
    if (!client) {
      throw new Error('Supabase not configured');
    }

    try {
      const { error } = await client
        .from('refresh_tokens')
        .delete()
        .eq('user_id', parseInt(userId));

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Supabase error revoking all user tokens:', error);
      throw error;
    }
  }
}
=======
>>>>>>> main
