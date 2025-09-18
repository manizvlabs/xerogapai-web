import { getFileStorage } from './file-storage';
import { 
  SupabaseContactDatabase, 
  initializeSupabaseDatabase, 
  isSupabaseConfigured,
  type ContactSubmission as SupabaseContactSubmission,
  type ContactStats as SupabaseContactStats,
  type ContactResponse as SupabaseContactResponse
} from './supabase';

// Global flag to track if we're using fallback
let usingFallback = true; // Default to fallback since no DB is configured
let initialized = false;

// Check if we have Supabase configuration
const hasSupabaseConfig = isSupabaseConfigured();

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
    console.log('🔄 No Supabase configuration found, using file storage');
    usingFallback = true;
    initialized = true;
    return false;
  }
  
  try {
    // Initialize Supabase database
    const success = await initializeSupabaseDatabase();
    
    if (success) {
      console.log('✅ Supabase database initialized successfully');
      usingFallback = false;
      initialized = true;
      return true;
    } else {
      throw new Error('Supabase initialization failed');
    }
  } catch (error) {
    console.error('❌ Supabase initialization failed:', error);
    console.log('🔄 Falling back to file storage');
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
      console.error('Supabase error, falling back to file storage:', error);
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
