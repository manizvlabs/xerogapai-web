# Microsoft Graph API Setup for Demo Calendar Integration

## Overview

The demo page now uses **Outlook calendar integration exclusively** using Microsoft Graph API. When users book a demo through the quick booking form, they can add it directly to their Outlook calendar with a Teams meeting link.

## Setup Instructions

### 1. Azure Portal Configuration

Follow the detailed setup guide in `docs/security/microsoft-graph-setup.md` to:

1. Register a new application in Azure AD
2. Configure API permissions (`Mail.Send`, `Calendars.ReadWrite`)
3. Create a client secret
4. Note down the Application ID, Tenant ID, and Client Secret

### 2. Environment Variables

Add these values to your `.env.local` file:

```bash
# Microsoft Graph API Configuration (for Outlook Calendar Integration)
MS_GRAPH_CLIENT_ID="your-application-client-id-here"
MS_GRAPH_CLIENT_SECRET="your-client-secret-here"
MS_GRAPH_TENANT_ID="your-directory-tenant-id-here"
```

### 3. Required API Permissions

Make sure your Azure app registration has these permissions:

- **Mail.Send** - Send confirmation emails
- **Calendars.ReadWrite** - Create calendar events
- **User.Read** - Basic profile access

### 4. Test the Integration

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:3000/demo`
3. Book a demo appointment
4. Click "Add Demo to Outlook Calendar" in the confirmation screen
5. The event should be created in your Outlook calendar with a Teams meeting link

## Features

- ✅ **Outlook Calendar Integration**: Creates calendar events directly in Outlook for demo bookings
- ✅ **Teams Meeting Integration**: Includes Teams meeting links for online demos
- ✅ **Dark Mode Support**: All booking forms adapt to light/dark themes
- ✅ **Quick Booking Form**: Simple form-based booking (no external Calendly dependency)
- ✅ **Error Handling**: Graceful fallbacks if Graph API is not configured
- ✅ **Responsive Design**: Works on all device sizes

## Troubleshooting

### "Microsoft Graph API credentials not configured"
- Ensure all three environment variables are set in `.env.local`
- Verify the credentials are correct and not expired

### "Insufficient permissions"
- Grant admin consent for the required permissions in Azure Portal
- Ensure the app has `Calendars.ReadWrite` permission

### "Calendar event creation failed"
- Check that the user's account has an Office 365 license
- Verify the app registration is in the correct Azure AD tenant

## Security Notes

- Client secrets expire after 24 months (recommended)
- Use application permissions (not delegated) for background operations
- Monitor API usage in Azure AD audit logs
- Never commit credentials to version control

## Next Steps

Once configured, the Outlook calendar integration will work automatically for all demo bookings made through the quick booking form. Users will receive calendar invites with Teams meeting links directly in their Outlook calendar.
