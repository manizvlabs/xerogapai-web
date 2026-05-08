// Test server for Zoho CRM field mapping tests
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

console.log('🔍 Environment variables loaded:');
console.log('  ZOHO_CLIENT_ID:', process.env.ZOHO_CLIENT_ID ? 'Set' : 'Not set');
console.log('  ZOHO_CLIENT_SECRET:', process.env.ZOHO_CLIENT_SECRET ? 'Set' : 'Not set');
console.log('  ZOHO_REFRESH_TOKEN:', process.env.ZOHO_REFRESH_TOKEN ? 'Set (length: ' + process.env.ZOHO_REFRESH_TOKEN.length + ')' : 'Not set');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/api/submit-to-zoho', async (req, res) => {
  console.log('📡 Zoho API request received');
  console.log('Request body keys:', Object.keys(req.body));

  try {
    // Get access token
    console.log('🔑 Requesting Zoho access token...');
    const tokenResponse = await fetch('https://accounts.zoho.in/oauth/v2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        refresh_token: process.env.ZOHO_REFRESH_TOKEN,
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token',
      }),
    });

    console.log('🔑 Token response status:', tokenResponse.status);
    const tokenData = await tokenResponse.json();
    console.log('🔑 Token response:', JSON.stringify(tokenData, null, 2));

    if (!tokenData.access_token) {
      throw new Error(`Failed to get Zoho access token: ${JSON.stringify(tokenData)}`);
    }

    // Use the exact field mappings from zohoService.ts
    const zohoLead = {
      data: [{
        // Basic Information
        ...(req.body.salutation && { Salutation: req.body.salutation }),
        First_Name: req.body.firstName,
        Last_Name: req.body.lastName,
        Email: req.body.email,
        ...(req.body.mobile && { Mobile: req.body.mobile }),
        ...(req.body.secondaryEmail && { Secondary_Email: req.body.secondaryEmail }),

        // Company Information
        ...(req.body.company && { Company: req.body.company }),
        ...(req.body.jobTitle && { Designation: req.body.jobTitle }),
        ...(req.body.website && { Website: req.body.website }),
        ...(req.body.industry && { Industry: req.body.industry }),

        // Company Details
        ...(req.body.annualRevenue && { Annual_Revenue: req.body.annualRevenue }),
        ...(req.body.noOfEmployees && { No_of_Employees: req.body.noOfEmployees }),
        ...(req.body.rating && { Rating: req.body.rating }),

        // Address Information - testing these thoroughly
        ...(req.body.street && { Street: req.body.street }),
        ...(req.body.city && { City: req.body.city }),
        ...(req.body.state && { State: req.body.state }),
        ...(req.body.country && { Country: req.body.country }),
        ...(req.body.zipCode && { Zip_Code: req.body.zipCode }),

        // Additional Contact Information
        ...(req.body.skypeId && { Skype_ID: req.body.skypeId }),
        ...(req.body.twitter && { Twitter: req.body.twitter }),
        ...(req.body.fax && { Fax: req.body.fax }),
        ...(req.body.emailOptOut !== undefined && { Email_Opt_Out: req.body.emailOptOut }),

        // Lead Information
        Lead_Source: req.body.leadSource || 'Website',
        ...(req.body.leadStatus && { Lead_Status: req.body.leadStatus }),

        // Description
        Description: req.body.description || req.body.message || '',
      }],
      trigger: ["approval", "workflow", "blueprint"]
    };

    console.log('📤 Sending to Zoho with fields:', Object.keys(zohoLead.data[0]));

    const zohoResponse = await fetch('https://crm.zoho.in/crm/v2.2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${tokenData.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zohoLead),
    });

    if (!zohoResponse.ok) {
      const errorText = await zohoResponse.text();
      console.error('❌ Zoho API Error:', zohoResponse.status, errorText);
      throw new Error(`Zoho API error: ${zohoResponse.status} - ${errorText}`);
    }

    const result = await zohoResponse.json();
    console.log('✅ Zoho response received');

    // Log the created lead details
    if (result.data && result.data[0]) {
      console.log('📊 Created lead fields:');
      const lead = result.data[0];
      console.log('  - ID:', lead.details?.id || lead.id);
      console.log('  - Salutation:', lead.Salutation);
      console.log('  - First_Name:', lead.First_Name);
      console.log('  - Last_Name:', lead.Last_Name);
      console.log('  - Email:', lead.Email);
      console.log('  - Mobile:', lead.Mobile);
      console.log('  - Company:', lead.Company);
      console.log('  - Designation:', lead.Designation);
      console.log('  - Street:', lead.Street);
      console.log('  - City:', lead.City);
      console.log('  - State:', lead.State);
      console.log('  - Country:', lead.Country);
      console.log('  - Zip_Code:', lead.Zip_Code);
      console.log('  - Annual_Revenue:', lead.Annual_Revenue);
      console.log('  - Lead_Source:', lead.Lead_Source);
    }

    res.json(result);
  } catch (error) {
    console.error('❌ Zoho submission error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Zoho API: http://localhost:${PORT}/api/submit-to-zoho`);
});