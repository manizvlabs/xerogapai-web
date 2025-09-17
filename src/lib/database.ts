import { sql } from '@vercel/postgres';
import { getFileStorage } from './file-storage';

// Global flag to track if we're using fallback
let usingFallback = true; // Default to fallback since no DB is configured
let initialized = false;

// Check if we have database environment variables
const hasDbConfig = process.env.POSTGRES_URL || process.env.DATABASE_URL;

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
  
  // If no database config, use fallback immediately
  if (!hasDbConfig) {
    console.log('🔄 No database configuration found, using in-memory storage');
    usingFallback = true;
    initialized = true;
    return false;
  }
  
  try {
    // Create contacts table
    await sql`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        company VARCHAR(255),
        service VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        ip_address INET,
        user_agent TEXT
      )
    `;

    // Create indexes for better performance
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_submitted_at ON contacts(submitted_at DESC)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email)
    `;
    
    await sql`
      CREATE INDEX IF NOT EXISTS idx_contacts_service ON contacts(service)
    `;

    console.log('✅ Database initialized successfully');
    usingFallback = false;
    initialized = true;
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    console.log('🔄 Falling back to in-memory storage for development');
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
      const result = await sql`
        INSERT INTO contacts (
          first_name, last_name, email, phone, company, service, message, ip_address, user_agent
        ) VALUES (
          ${data.firstName}, ${data.lastName}, ${data.email}, ${data.phone || null}, 
          ${data.company || null}, ${data.service}, ${data.message}, 
          ${data.ipAddress || null}, ${data.userAgent || null}
        )
        RETURNING id, first_name, last_name, email, phone, company, service, message, 
                  submitted_at, ip_address, user_agent
      `;

      const contact = result.rows[0];
      return {
        id: contact.id.toString(),
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        submittedAt: contact.submitted_at.toISOString(),
        ipAddress: contact.ip_address,
        userAgent: contact.user_agent
      };
    } catch (error) {
      console.error('Database error, falling back to file storage:', error);
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
      const {
        page = 1,
        limit = 10,
        startDate,
        endDate,
        search
      } = options;

      const offset = (page - 1) * limit;

      // Build the WHERE clause
      let whereClause = 'WHERE 1=1';
      const params: any[] = [];
      let paramCount = 0;

      if (startDate) {
        paramCount++;
        whereClause += ` AND submitted_at >= $${paramCount}`;
        params.push(startDate);
      }

      if (endDate) {
        paramCount++;
        whereClause += ` AND submitted_at <= $${paramCount}`;
        params.push(endDate);
      }

      if (search) {
        paramCount++;
        whereClause += ` AND (
          first_name ILIKE $${paramCount} OR 
          last_name ILIKE $${paramCount} OR 
          email ILIKE $${paramCount} OR 
          company ILIKE $${paramCount} OR 
          service ILIKE $${paramCount} OR 
          message ILIKE $${paramCount}
        )`;
        params.push(`%${search}%`);
      }

      // Get total count
      const countQuery = `SELECT COUNT(*) as total FROM contacts ${whereClause}`;
      const countResult = await sql.query(countQuery, params);
      const total = parseInt(countResult.rows[0].total);

      // Get paginated results
      paramCount++;
      const limitParam = `$${paramCount}`;
      paramCount++;
      const offsetParam = `$${paramCount}`;
      params.push(limit, offset);

      const dataQuery = `
        SELECT id, first_name, last_name, email, phone, company, service, message, 
               submitted_at, ip_address, user_agent
        FROM contacts 
        ${whereClause}
        ORDER BY submitted_at DESC
        LIMIT ${limitParam} OFFSET ${offsetParam}
      `;

      const dataResult = await sql.query(dataQuery, params);
      
      const contacts: ContactSubmission[] = dataResult.rows.map(row => ({
        id: row.id.toString(),
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email,
        phone: row.phone,
        company: row.company,
        service: row.service,
        message: row.message,
        submittedAt: row.submitted_at.toISOString(),
        ipAddress: row.ip_address,
        userAgent: row.user_agent
      }));

      const totalPages = Math.ceil(total / limit);

      return {
        contacts,
        total,
        page,
        limit,
        totalPages
      };
    } catch (error) {
      console.error('Database error, falling back to file storage:', error);
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
      const result = await sql`
        SELECT id, first_name, last_name, email, phone, company, service, message, 
               submitted_at, ip_address, user_agent
        FROM contacts 
        WHERE id = ${parseInt(id)}
      `;

      if (result.rows.length === 0) {
        return null;
      }

      const contact = result.rows[0];
      return {
        id: contact.id.toString(),
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        company: contact.company,
        service: contact.service,
        message: contact.message,
        submittedAt: contact.submitted_at.toISOString(),
        ipAddress: contact.ip_address,
        userAgent: contact.user_agent
      };
    } catch (error) {
      console.error('Database error, falling back to file storage:', error);
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
      const result = await sql`
        DELETE FROM contacts WHERE id = ${parseInt(id)}
      `;
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Database error, falling back to file storage:', error);
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
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
      const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

      const [totalResult, todayResult, weekResult, monthResult] = await Promise.all([
        sql`SELECT COUNT(*) as count FROM contacts`,
        sql`SELECT COUNT(*) as count FROM contacts WHERE submitted_at >= ${today.toISOString()}`,
        sql`SELECT COUNT(*) as count FROM contacts WHERE submitted_at >= ${weekAgo.toISOString()}`,
        sql`SELECT COUNT(*) as count FROM contacts WHERE submitted_at >= ${monthAgo.toISOString()}`
      ]);

      return {
        total: parseInt(totalResult.rows[0].count),
        today: parseInt(todayResult.rows[0].count),
        thisWeek: parseInt(weekResult.rows[0].count),
        thisMonth: parseInt(monthResult.rows[0].count)
      };
    } catch (error) {
      console.error('Database error, falling back to file storage:', error);
      usingFallback = true;
      return getFileStorage().getStats();
    }
  }
}
