# Microsoft Graph API Setup for Office 365 Email Integration

## Why Use Microsoft Graph API?

Since Microsoft deprecated app passwords for new Office 365 accounts, **Microsoft Graph API with OAuth 2.0** is the modern, secure way to send emails from your Office 365 account.

## Prerequisites

- **Azure AD Premium or Microsoft 365 Business subscription**
- **Global Administrator access** to your Azure AD tenant
- **Office 365 Business account** with email sending permissions

---

## Step 1: Access Azure Portal

1. Go to [Azure Portal](https://portal.azure.com)
2. Sign in with your Office 365 administrator account
3. Navigate to **"Azure Active Directory"** in the left sidebar

---

## Step 2: Register Application

1. In Azure AD, click **"App registrations"** → **"New registration"**
2. Enter application details:
   - **Name:** `XeroGap AI Email Service`
   - **Supported account types:** `Accounts in this organizational directory only`
   - **Redirect URI:** Leave blank (not needed for client credentials flow)
3. Click **"Register"**

**Note:** We're using **client credentials flow** (application permissions), not user authentication, so no redirect URI is required.

---

## Step 3: Configure API Permissions

1. In your new app registration, go to **"API permissions"**
2. Click **"Add a permission"**
3. Select **"Microsoft Graph"**
4. Choose **"Application permissions"** (select "daemon without signed-in user")
5. Search for and add these permissions:
   - `Mail.Send` - Send mail as any user
   - `Mail.ReadWrite` - Read and write mail (optional, for advanced features)
6. Click **"Grant admin consent"** for your organization

**Why "daemon without signed-in user"?**
- **Application permissions** allow the app to act without a user present
- **Daemon** means background service/application-only authentication
- This enables your website to send emails automatically without user interaction

---

## Step 4: Create Client Secret

1. Go to **"Certificates & secrets"**
2. Click **"New client secret"**
3. Configure:
   - **Description:** `Email service secret`
   - **Expires:** `24 months` (recommended)
4. Click **"Add"**
5. **⚠️ IMPORTANT:** Copy the secret value immediately - you won't see it again!

---

## Step 5: Get Required IDs

1. **Application (client) ID:** Found on the app overview page
2. **Directory (tenant) ID:** Found on the app overview page (same as your Azure AD tenant ID)
3. **Client Secret:** The value you copied in Step 4

---

## Step 6: Configure Environment Variables

Add these to your `.env.local` file:

```bash
# Microsoft Graph API Configuration (RECOMMENDED for modern Office 365)
MS_GRAPH_CLIENT_ID="your-application-client-id-here"
MS_GRAPH_CLIENT_SECRET="your-client-secret-here"
MS_GRAPH_TENANT_ID="your-directory-tenant-id-here"
```

---

## Step 7: Test the Integration

Run the email test script:

```bash
npm run test-email
```

This will:
- ✅ Verify your Graph API credentials
- ✅ Send a test assessment report email
- ✅ Confirm everything is working

---

## Troubleshooting

### "Insufficient privileges" Error
- Ensure you've granted admin consent for the `Mail.Send` permission
- Verify the account has an Office 365 license

### "Invalid client" Error
- Double-check your Client ID and Tenant ID
- Ensure the app registration is in the correct Azure AD directory

### "Invalid secret" Error
- Verify you're using the client secret value (not the secret ID)
- Create a new secret if the old one expired

---

## Security Best Practices

- 🔐 **Rotate secrets regularly** (every 6-12 months)
- 👥 **Use least-privilege permissions** (only Mail.Send)
- 📊 **Monitor usage** in Azure AD audit logs
- 🚫 **Never commit secrets** to version control

---

## Need Help?

If you encounter issues:

1. Check the [Microsoft Graph documentation](https://docs.microsoft.com/en-us/graph/)
2. Verify all permissions are granted
3. Test with a simple email first
4. Contact your IT administrator for Azure AD access

---

## Alternative: SMTP with Basic Auth

If Graph API setup is too complex, you can still use SMTP with basic authentication, but this requires:

1. Disabling 2FA on the sending account (not recommended)
2. Using the account password directly in SMTP_PASS

**⚠️ This approach is less secure and not recommended for production use.**

```bash
# SMTP Configuration (if Graph API is not possible)
SMTP_HOST="smtp.office365.com"
SMTP_PORT="587"
SMTP_SECURE="false"
SMTP_USER="your-email@yourdomain.com"
SMTP_PASS="your-actual-account-password"  # ⚠️ Not recommended
```
