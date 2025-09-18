// File-based storage for development when database is not available
import fs from 'fs';
import path from 'path';

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

class FileStorage {
  private dataFile: string;
  private contacts: ContactSubmission[] = [];
  private nextId = 1;

  constructor() {
    this.dataFile = path.join(process.cwd(), 'data', 'contacts.json');
    this.ensureDataDirectory();
    this.loadData();
  }

  private ensureDataDirectory() {
    const dataDir = path.dirname(this.dataFile);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  private loadData() {
    try {
      if (fs.existsSync(this.dataFile)) {
        const data = fs.readFileSync(this.dataFile, 'utf8');
        const parsed = JSON.parse(data);
        this.contacts = parsed.contacts || [];
        this.nextId = parsed.nextId || 1;
        console.log(`📁 Loaded ${this.contacts.length} contacts from file storage`);
      } else {
        console.log(`📁 No data file found at ${this.dataFile}`);
      }
    } catch (error) {
      console.error('Error loading file storage:', error);
      this.contacts = [];
      this.nextId = 1;
    }
  }

  private saveData() {
    try {
      const data = {
        contacts: this.contacts,
        nextId: this.nextId,
        lastUpdated: new Date().toISOString()
      };
      fs.writeFileSync(this.dataFile, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error saving file storage:', error);
    }
  }

  // Create a new contact submission
  createContact(data: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission {
    const contact: ContactSubmission = {
      id: this.nextId.toString(),
      ...data,
      submittedAt: new Date().toISOString(),
    };
    
    this.contacts.push(contact);
    this.nextId++;
    this.saveData();
    
    console.log(`📁 Created contact ${contact.id} in file storage`);
    return contact;
  }

  // Get all contacts with pagination and filtering
  getContacts(options: {
    page?: number;
    limit?: number;
    startDate?: string;
    endDate?: string;
    search?: string;
  } = {}): ContactResponse {
    // Always reload data from file to ensure consistency
    this.loadData();
    
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      search
    } = options;

    let filteredContacts = [...this.contacts];

    // Apply date filters
    if (startDate) {
      const start = new Date(startDate);
      filteredContacts = filteredContacts.filter(contact => 
        new Date(contact.submittedAt) >= start
      );
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // End of day
      filteredContacts = filteredContacts.filter(contact => 
        new Date(contact.submittedAt) <= end
      );
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      filteredContacts = filteredContacts.filter(contact =>
        contact.firstName.toLowerCase().includes(searchLower) ||
        contact.lastName.toLowerCase().includes(searchLower) ||
        contact.email.toLowerCase().includes(searchLower) ||
        contact.company?.toLowerCase().includes(searchLower) ||
        contact.service.toLowerCase().includes(searchLower) ||
        contact.message.toLowerCase().includes(searchLower)
      );
    }

    // Sort by submitted date (newest first)
    filteredContacts.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    const total = filteredContacts.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContacts = filteredContacts.slice(startIndex, endIndex);

    return {
      contacts: paginatedContacts,
      total,
      page,
      limit,
      totalPages
    };
  }

  // Get a single contact by ID
  getContactById(id: string): ContactSubmission | null {
    return this.contacts.find(contact => contact.id === id) || null;
  }

  // Delete a contact
  deleteContact(id: string): boolean {
    const index = this.contacts.findIndex(contact => contact.id === id);
    if (index !== -1) {
      this.contacts.splice(index, 1);
      this.saveData();
      console.log(`📁 Deleted contact ${id} from file storage`);
      return true;
    }
    return false;
  }

  // Get contact statistics
  getStats(): ContactStats {
    // Always reload data from file to ensure consistency
    this.loadData();
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    console.log(`📁 File storage stats calculation: ${this.contacts.length} total contacts`);

    return {
      total: this.contacts.length,
      today: this.contacts.filter(contact => 
        new Date(contact.submittedAt) >= today
      ).length,
      thisWeek: this.contacts.filter(contact => 
        new Date(contact.submittedAt) >= weekAgo
      ).length,
      thisMonth: this.contacts.filter(contact => 
        new Date(contact.submittedAt) >= monthAgo
      ).length,
    };
  }
}

// Export singleton instance
let fileStorageInstance: FileStorage | null = null;

export function getFileStorage(): FileStorage {
  if (!fileStorageInstance) {
    fileStorageInstance = new FileStorage();
    console.log('📁 Created new file storage instance');
  }
  return fileStorageInstance;
}
