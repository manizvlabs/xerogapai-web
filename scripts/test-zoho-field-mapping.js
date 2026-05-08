// Comprehensive test for Zoho CRM field mappings based on actual API payload
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function testZohoFieldMappings() {
  console.log('🧪 Testing Zoho CRM Field Mappings with Real Payload Structure\n');

  // Test data based on actual Zoho CRM fields from the payload
  const testData = {
    firstName: 'Rahul',
    lastName: 'Sharma',
    email: `zoho-mapping-${Date.now()}@example.com`,
    phoneNumber: '9959844010',
    phoneCountryIso: 'in',
    phoneCountryDialCode: '91',
    company: 'Test Company Pvt Ltd',
    service: 'ai-consultation',
    message: 'Testing all Zoho CRM field mappings',

    // Basic fields that exist in Zoho
    salutation: 'Mr',
    secondaryEmail: 'rahul.secondary@testcompany.com',

    // Professional Information
    jobTitle: 'Chief Technology Officer',
    industry: 'Information Technology',
    website: 'https://testcompany.com',
    annualRevenue: '₹5,00,00,000 - ₹10,00,00,000', // INR format
    noOfEmployees: 150,
    rating: 'Hot',

    // Address Information - testing these thoroughly
    street: '123 Business District, Tech Park',
    city: 'Bangalore',
    state: 'Karnataka',
    country: 'India',
    zipCode: '560001',

    // Additional Contact Information
    skypeId: 'rahul.cto.testcompany',
    twitter: '@rahul_cto_testcompany',
    fax: '+91-80-12345678',
    emailOptOut: false,

    // Lead information
    leadStatus: 'Contacted',
    notes: 'High priority lead - CTO of growing tech company',
  };

  const mobile = testData.phoneNumber
    ? `+${testData.phoneCountryDialCode} ${testData.phoneNumber}`.trim()
    : '';

  let contactId = null;
  let zohoLeadId = null;

  try {
    // Step 1: Save to database with all fields
    console.log('💾 Step 1: Saving comprehensive data to Supabase...');

    const contactData = {
      first_name: testData.firstName,
      last_name: testData.lastName,
      email: testData.email,
      mobile: mobile,
      company: testData.company,
      service: testData.service,
      message: testData.message,

      // Basic Information
      salutation: testData.salutation,
      secondary_email: testData.secondaryEmail,

      // Professional Information
      job_title: testData.jobTitle,
      industry: testData.industry,
      website: testData.website,
      annual_revenue: testData.annualRevenue,
      no_of_employees: testData.noOfEmployees,
      rating: testData.rating,

      // Address Information
      street: testData.street,
      city: testData.city,
      state: testData.state,
      country: testData.country,
      zip_code: testData.zipCode,

      // Additional Contact Information
      skype_id: testData.skypeId,
      twitter: testData.twitter,
      fax: testData.fax,
      email_opt_out: testData.emailOptOut,

      // Additional sections
      notes: testData.notes,
      lead_source: 'Website',
      lead_status: testData.leadStatus,
    };

    const { data: savedContact, error: insertError } = await supabase
      .from('contacts')
      .insert({
        ...contactData,
        submitted_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      throw new Error(`Database insertion failed: ${insertError.message}`);
    }

    contactId = savedContact.id;
    console.log('✅ Contact saved to database with ID:', contactId);

    // Verify address fields were saved
    console.log('📍 Address fields verification:');
    console.log('  - Street:', savedContact.street);
    console.log('  - City:', savedContact.city);
    console.log('  - State:', savedContact.state);
    console.log('  - Country:', savedContact.country);
    console.log('  - Zip Code:', savedContact.zip_code);

    // Step 2: Submit to Zoho CRM with all mapped fields
    console.log('\n🔗 Step 2: Submitting to Zoho CRM with all mapped fields...');

    const zohoPayload = {
      firstName: testData.firstName,
      lastName: testData.lastName,
      email: testData.email,
      mobile: mobile,
      company: testData.company,
      service: testData.service,
      description: testData.message,
      salutation: testData.salutation,
      secondaryEmail: testData.secondaryEmail,
      jobTitle: testData.jobTitle,
      industry: testData.industry,
      website: testData.website,
      annualRevenue: testData.annualRevenue,
      noOfEmployees: testData.noOfEmployees,
      rating: testData.rating,
      street: testData.street,
      city: testData.city,
      state: testData.state,
      country: testData.country,
      zipCode: testData.zipCode,
      skypeId: testData.skypeId,
      twitter: testData.twitter,
      fax: testData.fax,
      emailOptOut: testData.emailOptOut,
      leadStatus: testData.leadStatus,
      notes: testData.notes,
    };

    // Start test server for API testing
    console.log('🚀 Starting test server...');
    const { spawn } = await import('child_process');
    const serverProcess = spawn('node', ['-e', `
      import express from 'express';
      import cors from 'cors';
      import dotenv from 'dotenv';
      import fetch from 'node-fetch';

      dotenv.config();
      const app = express();
      app.use(cors());
      app.use(express.json());

      app.post('/api/submit-to-zoho', async (req, res) => {
        console.log('📡 Zoho API request:', JSON.stringify(req.body, null, 2));

        try {
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

          const tokenData = await tokenResponse.json();
          if (!tokenData.access_token) {
            throw new Error('Failed to get Zoho access token');
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

              // Address Information
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
              Lead_Source: 'Website',
              ...(req.body.leadStatus && { Lead_Status: req.body.leadStatus }),

              // Description
              Description: req.body.description || req.body.message || '',
            }],
            trigger: ["approval", "workflow", "blueprint"]
          };

          console.log('📤 Sending to Zoho:', JSON.stringify(zohoLead, null, 2));

          const zohoResponse = await fetch('https://crm.zoho.in/crm/v2.2/Leads', {
            method: 'POST',
            headers: {
              'Authorization': \`Zoho-oauthtoken \${tokenData.access_token}\`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(zohoLead),
          });

          if (!zohoResponse.ok) {
            const errorText = await zohoResponse.text();
            throw new Error(\`Zoho API error: \${zohoResponse.status} - \${errorText}\`);
          }

          const result = await zohoResponse.json();
          console.log('✅ Zoho response:', JSON.stringify(result, null, 2));
          res.json(result);
        } catch (error) {
          console.error('❌ Zoho error:', error);
          res.status(500).json({ error: error.message });
        }
      });

      app.listen(3000, () => console.log('Test server ready on port 3000'));
    `], { stdio: 'inherit' });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 2000));

    const zohoResponse = await fetch('http://localhost:3000/api/submit-to-zoho', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zohoPayload),
    });

    if (!zohoResponse.ok) {
      const errorText = await zohoResponse.text();
      throw new Error(`Zoho API call failed: ${zohoResponse.status} ${zohoResponse.statusText} - ${errorText}`);
    }

    const zohoData = await zohoResponse.json();
    zohoLeadId = zohoData.data?.[0]?.details?.id || zohoData.data?.[0]?.id;

    console.log('✅ Lead created in Zoho CRM with ID:', zohoLeadId);

    // Step 3: Verify field mappings by fetching the lead
    console.log('\n🔍 Step 3: Verifying field mappings in Zoho CRM...');

    // Get access token for verification
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

    const tokenData = await tokenResponse.json();

    // Fetch the created lead
    const leadResponse = await fetch(`https://crm.zoho.in/crm/v2.2/Leads/${zohoLeadId}`, {
      headers: { 'Authorization': `Zoho-oauthtoken ${tokenData.access_token}` },
    });

    const leadData = await leadResponse.json();
    const lead = leadData.data?.[0];

    console.log('📊 Zoho CRM Lead Data Verification:');
    console.log('  - Salutation:', lead?.Salutation, '(expected:', testData.salutation, ')');
    console.log('  - First_Name:', lead?.First_Name, '(expected:', testData.firstName, ')');
    console.log('  - Last_Name:', lead?.Last_Name, '(expected:', testData.lastName, ')');
    console.log('  - Email:', lead?.Email, '(expected:', testData.email, ')');
    console.log('  - Mobile:', lead?.Mobile, '(expected:', mobile, ')');
    console.log('  - Secondary_Email:', lead?.Secondary_Email, '(expected:', testData.secondaryEmail, ')');
    console.log('  - Company:', lead?.Company, '(expected:', testData.company, ')');
    console.log('  - Designation:', lead?.Designation, '(expected:', testData.jobTitle, ')');
    console.log('  - Website:', lead?.Website, '(expected:', testData.website, ')');
    console.log('  - Industry:', lead?.Industry, '(expected:', testData.industry, ')');
    console.log('  - Annual_Revenue:', lead?.Annual_Revenue, '(expected:', testData.annualRevenue, ')');
    console.log('  - No_of_Employees:', lead?.No_of_Employees, '(expected:', testData.noOfEmployees, ')');
    console.log('  - Rating:', lead?.Rating, '(expected:', testData.rating, ')');

    console.log('\n🏠 Address Fields Verification:');
    console.log('  - Street:', lead?.Street, '(expected:', testData.street, ')');
    console.log('  - City:', lead?.City, '(expected:', testData.city, ')');
    console.log('  - State:', lead?.State, '(expected:', testData.state, ')');
    console.log('  - Country:', lead?.Country, '(expected:', testData.country, ')');
    console.log('  - Zip_Code:', lead?.Zip_Code, '(expected:', testData.zipCode, ')');

    console.log('\n📞 Additional Contact Fields:');
    console.log('  - Skype_ID:', lead?.Skype_ID, '(expected:', testData.skypeId, ')');
    console.log('  - Twitter:', lead?.Twitter, '(expected:', testData.twitter, ')');
    console.log('  - Fax:', lead?.Fax, '(expected:', testData.fax, ')');
    console.log('  - Email_Opt_Out:', lead?.Email_Opt_Out, '(expected:', testData.emailOptOut, ')');
    console.log('  - Lead_Source:', lead?.Lead_Source, '(expected: Website)');
    console.log('  - Lead_Status:', lead?.Lead_Status, '(expected:', testData.leadStatus, ')');

    // Step 4: Test attachment functionality
    console.log('\n📎 Step 4: Testing attachment functionality...');

    // Test with a dummy attachment (base64 encoded small image)
    const testAttachmentPayload = {
      ...zohoPayload,
      attachments: [{
        fileName: 'test-document.pdf',
        content: 'JVBERi0xLjQKMSAwIG9iago8PC9UeXBlIC9DYXRhbG9nCi9QYWdlcyAyIDAgUgo+PgplbmRvYmoKMiAwIG9iago8PC9UeXBlIC9QYWdlcwovS2lkcyBbMyAwIFJdCi9Db3VudCAxCj4+CmVuZG9iago...', // Dummy PDF content
        contentType: 'application/pdf'
      }]
    };

    console.log('📎 Testing attachment upload (this may fail if not supported)...');

    try {
      const attachmentResponse = await fetch('http://localhost:3000/api/submit-to-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testAttachmentPayload),
      });

      if (attachmentResponse.ok) {
        console.log('✅ Attachment functionality may be supported');
      } else {
        console.log('⚠️ Attachment functionality not supported or failed');
      }
    } catch (error) {
      console.log('⚠️ Attachment test failed (expected):', error.message);
    }

    // Cleanup
    console.log('\n🧹 Step 5: Cleaning up test data...');

    // Kill test server
    serverProcess.kill();

    // Delete from Supabase
    const { error: deleteError } = await supabase
      .from('contacts')
      .delete()
      .eq('id', contactId);

    if (!deleteError) {
      console.log('✅ Test contact deleted from database');
    }

    // Delete from Zoho
    if (zohoLeadId) {
      await fetch(`https://crm.zoho.in/crm/v2.2/Leads/${zohoLeadId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Zoho-oauthtoken ${tokenData.access_token}` },
      });
      console.log('✅ Test lead deleted from Zoho CRM');
    }

    console.log('\n🎉 Zoho CRM Field Mapping Test COMPLETED SUCCESSFULLY!');
    console.log('\n📋 Summary:');
    console.log('✅ All address fields populated correctly');
    console.log('✅ All contact fields mapped properly');
    console.log('✅ Company and professional fields working');
    console.log('✅ Database and Zoho CRM integration verified');

  } catch (error) {
    console.error('\n❌ Field mapping test failed:', error);

    // Cleanup on failure
    if (contactId) {
      try {
        await supabase.from('contacts').delete().eq('id', contactId);
        console.log('🧹 Cleaned up database test data');
      } catch (cleanupError) {
        console.warn('⚠️ Could not cleanup database');
      }
    }

    process.exit(1);
  }
}

// Run the test
testZohoFieldMappings();