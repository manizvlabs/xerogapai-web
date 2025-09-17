// Fallback in-memory storage for development when database is not available
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

class ContactStoreFallback {
  private contacts: ContactSubmission[] = [];
  private nextId = 1;

  // Create a new contact submission
  createContact(data: Omit<ContactSubmission, 'id' | 'submittedAt'>): ContactSubmission {
    const contact: ContactSubmission = {
      id: this.nextId.toString(),
      ...data,
      submittedAt: new Date().toISOString(),
    };
    
    this.contacts.push(contact);
    this.nextId++;
    
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
    const {
      page = 1,
      limit = 10,
      startDate,
      endDate,
      search
    } = options;

    let filteredContacts = [...this.contacts];

    // Filter by date range
    if (startDate || endDate) {
      filteredContacts = filteredContacts.filter(contact => {
        const contactDate = new Date(contact.submittedAt);
        const start = startDate ? new Date(startDate) : new Date('1900-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-12-31');
        
        return contactDate >= start && contactDate <= end;
      });
    }

    // Filter by search term
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

    // Sort by submission date (newest first)
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
      return true;
    }
    return false;
  }

  // Get contact statistics
  getStats(): ContactStats {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

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
export const contactStoreFallback = new ContactStoreFallback();
