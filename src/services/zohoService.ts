// Using global fetch (available in Node.js 18+ and Vercel)

export interface ZohoCredentials {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

export interface ZohoLeadData {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;  // Maps to Mobile field in Zoho CRM
  company?: string;
  service?: string;
  description?: string;
  // Optional consultation fields
  salutation?: string;
  secondaryEmail?: string;
  jobTitle?: string;
  companySize?: string;
  industry?: string;
  website?: string;
  annualRevenue?: string;
  noOfEmployees?: number;
  rating?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  skypeId?: string;
  twitter?: string;
  fax?: string;
  emailOptOut?: boolean;
  preferredDate?: Date;
  preferredTime?: string;
  timezone?: string;
  consultationGoals?: string;
  currentChallenges?: string;
  budget?: string;
  timeline?: string;
  additionalNotes?: string;
  consultationType?: string;
  notes?: string;
  leadSource?: string;
  leadStatus?: string;
  attachments?: unknown[]; // File attachments from formidable
}

export interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface ZohoLeadResponse {
  data: Array<{
    code: string;
    details: {
      id: string;
      Created_Time: string;
      Modified_Time: string;
      Created_By: {
        name: string;
        id: string;
      };
      Modified_By: {
        name: string;
        id: string;
      };
    };
    message: string;
    status: string;
  }>;
}

export class ZohoService {
  private credentials: ZohoCredentials;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;
  private readonly baseUrl = 'https://crm.zoho.in/crm/v2.2';
  private readonly accountsUrl = 'https://accounts.zoho.in/oauth/v2';

  constructor(credentials: ZohoCredentials) {
    this.credentials = credentials;
  }

  /**
   * Ensure we have a valid access token
   */
  private async ensureValidToken(): Promise<string> {
    // Check if we have a valid token that won't expire in the next 5 minutes
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date(Date.now() + 5 * 60 * 1000)) {
      return this.accessToken;
    }

    // Refresh the token
    return await this.refreshAccessToken();
  }

  /**
   * Refresh the access token using the refresh token
   */
  private async refreshAccessToken(): Promise<string> {
    try {
      const tokenUrl = `${this.accountsUrl}/token?refresh_token=${this.credentials.refreshToken}&client_id=${this.credentials.clientId}&client_secret=${this.credentials.clientSecret}&grant_type=refresh_token`;

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Token refresh failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const tokenData = await response.json() as ZohoTokenResponse;

      if (tokenData.access_token) {
        this.accessToken = tokenData.access_token;
        // Set expiry time (subtract 5 minutes for safety margin)
        this.tokenExpiry = new Date(Date.now() + (tokenData.expires_in - 300) * 1000);
        return this.accessToken;
      } else {
        throw new Error('Invalid token response: missing access_token');
      }
    } catch (error) {
      console.error('Error refreshing Zoho access token:', error);
      throw new Error(`Failed to refresh Zoho access token: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Create a lead in Zoho CRM
   */
  async getAccessToken(): Promise<string> {
    return await this.ensureValidToken();
  }

  async createLead(leadData: ZohoLeadData, retryCount = 0): Promise<ZohoLeadResponse> {
    const maxRetries = 3;

    try {
      const accessToken = await this.ensureValidToken();

      // Format the description with additional details
      let description = leadData.description || '';

      if (leadData.service) {
        description = `Service Interested In: ${leadData.service}\n\n${description}`;
      }

      // Add consultation details if available
      const consultationDetails = [];
      if (leadData.consultationGoals) consultationDetails.push(`Goals: ${leadData.consultationGoals}`);
      if (leadData.currentChallenges) consultationDetails.push(`Challenges: ${leadData.currentChallenges}`);
      if (leadData.budget) consultationDetails.push(`Budget: ${leadData.budget}`);
      if (leadData.timeline) consultationDetails.push(`Timeline: ${leadData.timeline}`);
      if (leadData.additionalNotes) consultationDetails.push(`Notes: ${leadData.additionalNotes}`);

      if (consultationDetails.length > 0) {
        description += `\n\nConsultation Details:\n${consultationDetails.join('\n')}`;
      }

      const payload = {
        data: [
          {
            // Basic Information
            ...(leadData.salutation && { Salutation: leadData.salutation }),
            First_Name: leadData.firstName,
            Last_Name: leadData.lastName,
            Email: leadData.email,
            ...(leadData.mobile && { Mobile: leadData.mobile }), // Maps to Mobile field
            ...(leadData.secondaryEmail && { Secondary_Email: leadData.secondaryEmail }),

            // Company Information
            ...(leadData.company && { Company: leadData.company }),
            ...(leadData.jobTitle && { Designation: leadData.jobTitle }), // Maps to Designation field
            ...(leadData.website && { Website: leadData.website }),
            ...(leadData.industry && { Industry: leadData.industry }),

            // Company Details
            ...(leadData.annualRevenue && { Annual_Revenue: leadData.annualRevenue }),
            ...(leadData.noOfEmployees && { No_of_Employees: leadData.noOfEmployees }),
            ...(leadData.rating && { Rating: leadData.rating }),

            // Address Information
            ...(leadData.street && { Street: leadData.street }),
            ...(leadData.city && { City: leadData.city }),
            ...(leadData.state && { State: leadData.state }),
            ...(leadData.country && { Country: leadData.country }),
            ...(leadData.zipCode && { Zip_Code: leadData.zipCode }),

            // Additional Contact Information
            ...(leadData.skypeId && { Skype_ID: leadData.skypeId }),
            ...(leadData.twitter && { Twitter: leadData.twitter }),
            ...(leadData.fax && { Fax: leadData.fax }),
            ...(leadData.emailOptOut !== undefined && { Email_Opt_Out: leadData.emailOptOut }),

            // Lead Information
            Lead_Source: leadData.leadSource || "Website",
            ...(leadData.leadStatus && { Lead_Status: leadData.leadStatus }),

            // Description
            Description: description,
          }
        ],
        trigger: ["approval", "workflow", "blueprint"]
      };

      const response = await fetch(`${this.baseUrl}/Leads`, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Zoho API request failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json() as ZohoLeadResponse;

      // Check if the response indicates success
      if (data.data && data.data[0] && data.data[0].status === "success") {
        return data;
      } else {
        throw new Error(`Zoho API error: ${JSON.stringify(data)}`);
      }

    } catch (error) {
      console.error(`Zoho lead creation attempt ${retryCount + 1} failed:`, error);

      // Retry logic for certain types of errors
      if (retryCount < maxRetries) {
        // Retry for network errors, token expiry, or rate limiting
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const shouldRetry =
          errorMessage.includes('Token refresh failed') ||
          errorMessage.includes('Network request failed') ||
          errorMessage.includes('ECONNRESET') ||
          errorMessage.includes('ENOTFOUND') ||
          errorMessage.includes('429'); // Rate limiting

        if (shouldRetry) {
          console.log(`Retrying Zoho lead creation (attempt ${retryCount + 2}/${maxRetries + 1})...`);
          // Reset token to force refresh on retry
          this.accessToken = null;
          this.tokenExpiry = null;
          await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1))); // Exponential backoff
          return this.createLead(leadData, retryCount + 1);
        }
      }

      throw error;
    }
  }

  /**
   * Get lead by ID
   */
  async getLead(leadId: string): Promise<Record<string, unknown>> {
    try {
      const accessToken = await this.ensureValidToken();

      const response = await fetch(`${this.baseUrl}/Leads/${leadId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get lead: ${response.status} ${response.statusText} - ${errorText}`);
      }

      return await response.json() as Record<string, unknown>;
    } catch (error) {
      console.error('Error getting Zoho lead:', error);
      throw error;
    }
  }

  /**
   * Update lead
   */
  async updateLead(leadId: string, updateData: Partial<ZohoLeadData>): Promise<ZohoLeadResponse> {
    try {
      const accessToken = await this.ensureValidToken();

      const payload = {
        data: [updateData],
      };

      const response = await fetch(`${this.baseUrl}/Leads/${leadId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update lead: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json() as ZohoLeadResponse;
      return data;
    } catch (error) {
      console.error('Error updating Zoho lead:', error);
      throw error;
    }
  }

  /**
   * Delete lead
   */
  async deleteLead(leadId: string): Promise<Record<string, unknown>> {
    try {
      const accessToken = await this.ensureValidToken();

      const response = await fetch(`${this.baseUrl}/Leads/${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete lead: ${response.status} ${response.statusText} - ${errorText}`);
      }

      return await response.json() as Record<string, unknown>;
    } catch (error) {
      console.error('Error deleting Zoho lead:', error);
      throw error;
    }
  }
}

// Factory function to create Zoho service instance
export function createZohoService(credentials?: ZohoCredentials): ZohoService | null {
  if (!credentials) {
    // Try to get from environment variables
    const clientId = process.env.ZOHO_CLIENT_ID || process.env.VITE_ZOHO_CLIENT_ID;
    const clientSecret = process.env.ZOHO_CLIENT_SECRET || process.env.VITE_ZOHO_CLIENT_SECRET;
    const refreshToken = process.env.ZOHO_REFRESH_TOKEN || process.env.VITE_ZOHO_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
      console.warn('Zoho credentials not found in environment variables');
      return null;
    }

    credentials = {
      clientId,
      clientSecret,
      refreshToken,
    };
  }

  return new ZohoService(credentials);
}