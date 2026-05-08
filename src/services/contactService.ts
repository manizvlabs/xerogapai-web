import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export interface ContactData {
  first_name: string;
  last_name: string;
  email: string;
  mobile?: string | null;  // Maps to Mobile field in Zoho CRM
  company?: string | null;
  service?: string | null;
  message?: string | null;
  job_title?: string | null;
  salutation?: string | null;
  company_size?: string | null;
  industry?: string | null;
  website?: string | null;
  annual_revenue?: string | null;
  no_of_employees?: number | null;
  rating?: string | null;
  street?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  zip_code?: string | null;
  skype_id?: string | null;
  secondary_email?: string | null;
  twitter?: string | null;
  fax?: string | null;
  email_opt_out?: boolean | null;
  preferred_date?: Date | null;
  preferred_time?: string | null;
  timezone?: string | null;
  consultation_goals?: string | null;
  current_challenges?: string | null;
  budget?: string | null;
  timeline?: string | null;
  additional_notes?: string | null;
  consultation_type?: string | null;
  notes?: string | null;
  attachments?: Record<string, unknown>[];
  lead_status?: string | null;
  lead_source?: string | null;
}

export interface Contact extends ContactData {
  id: number;
  submitted_at: string;
  ip_address?: string | null;
  user_agent?: string | null;
  assessment_data?: Record<string, unknown> | null;
  assessment_completed_at?: string | null;
  assessment_score?: number | null;
  assessment_readiness_level?: string | null;
}

export class ContactService {
  /**
   * Create a new contact record
   */
  static async createContact(data: ContactData): Promise<Contact> {
    try {
      if (!supabase) {
        throw new Error(
          'Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
        );
      }

      const { data: contact, error } = await supabase
        .from('contacts')
        .insert({
          ...data,
          submitted_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (error) {
        throw new Error(`Database error: ${error.message}`);
      }

      return contact;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Failed to save contact information');
    }
  }

  // Additional methods can be implemented later using Supabase client
  // For now, we only need createContact for the form submission
}

// Export singleton instance
export default ContactService;
