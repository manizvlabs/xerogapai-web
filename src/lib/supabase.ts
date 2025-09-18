import { createClient } from '@supabase/supabase-js';

// Supabase configuration - lazy loaded
let supabaseClient: any = null;

// Get Supabase client (lazy initialization)
export const getSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase environment variables not found. Using fallback storage.');
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
        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            'apikey': supabaseAnonKey,
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'User-Agent': 'zero-website/1.0.1'
          }
        });
      }
    }
  });

  return supabaseClient;
};

// Legacy export for backward compatibility
export const supabase = getSupabaseClient();

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
    console.log('🔄 Supabase not configured, using fallback storage');
    return false;
  }

  try {
    // Get the Supabase client
    const client = getSupabaseClient();
    if (!client) {
      console.log('🔄 Supabase client not available, using fallback storage');
      return false;
    }

    // Test if contacts table exists by trying to query it
    const { error: testError } = await client
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (testError) {
      if (testError.code === 'PGRST116') {
        console.log('⚠️  Contacts table does not exist. Please create it manually in Supabase dashboard.');
        console.log('📖 See docs/deployment/SUPABASE_SETUP.md for SQL schema');
        return false;
      } else {
        throw testError;
      }
    }

    console.log('✅ Supabase database initialized successfully');
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
      const { data: contact, error } = await client
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
        })
        .select()
        .single();

      if (error) {
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
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const [totalResult, todayResult, weekResult, monthResult] = await Promise.all([
        client.from('contacts').select('*', { count: 'exact', head: true }),
        client.from('contacts').select('*', { count: 'exact', head: true }).gte('submitted_at', today.toISOString()),
        client.from('contacts').select('*', { count: 'exact', head: true }).gte('submitted_at', weekAgo.toISOString()),
        client.from('contacts').select('*', { count: 'exact', head: true }).gte('submitted_at', monthAgo.toISOString())
      ]);

      return {
        total: totalResult.count || 0,
        today: todayResult.count || 0,
        thisWeek: weekResult.count || 0,
        thisMonth: monthResult.count || 0
      };
    } catch (error) {
      console.error('Supabase error fetching stats:', error);
      throw error;
    }
  }
}
