# Consultation Form Testing Guide

This guide explains how to test the consultation form API and functionality.

## 🎯 Overview

Two test scripts are available for testing consultation form submissions:

1. **`test-consultation-api.mjs`** - Comprehensive automated testing
2. **`test-consultation-manual.mjs`** - Manual testing with specific data sets

## 🧪 Automated Testing

Run the comprehensive test suite:

```bash
npm run test:consultation
```

### What it tests:
- ✅ Valid consultation submissions
- ✅ Invalid submissions (missing required fields)
- ✅ Minimal valid submissions
- ✅ Long text field handling
- ✅ International phone numbers
- ✅ Server health checks
- ✅ API response validation

### Sample Output:
```
🧪 Testing Consultation Form API Submission
==========================================

🏥 Checking server health...
✅ Server is responding

📋 Testing: Valid Consultation Form Submission
📡 Status: 200 OK
✅ Expected status received
🆔 Contact ID: 1760445640632
📅 Calendar Event Created: AAMkADQyMDkxMjEx...
🔗 Teams Meeting URL: https://teams.microsoft.com/l/meetup-join/...
📧 Email with Teams invite sent to client
📝 Response Message: Consultation booked successfully
✅ Teams meeting scheduled - email sent

[... more tests ...]

🎉 Consultation API Testing Complete!
```

## 🔧 Manual Testing

Run individual test cases:

```bash
# Test complete valid submission
npm run test:consultation:manual valid

# Test minimal required fields only
npm run test:consultation:manual minimal

# Test international user (Saudi Arabia)
npm run test:consultation:manual intl

# Test custom data from JSON file
npm run test:consultation:manual custom
```

### Custom Data Testing

Create a `consultation-data.json` file in the project root:

```json
{
  "firstName": "Your Name",
  "lastName": "Last Name",
  "email": "your.email@example.com",
  "countryCode": "1",
  "phoneNumber": "5551234567",
  "company": "Your Company",
  "jobTitle": "Your Title",
  "companySize": "51-200",
  "industry": "Technology",
  "website": "https://yourcompany.com",
  "preferredDate": "2025-11-15",
  "preferredTime": "10:00 AM",
  "timezone": "America/New_York",
  "consultationGoals": "Your consultation goals",
  "currentChallenges": "Your current challenges",
  "budget": "$50,000 - $100,000",
  "timeline": "3-6 months",
  "additionalNotes": "Any additional notes",
  "consultationType": "Business Strategy Consultation"
}
```

Then run:
```bash
npm run test:consultation:manual custom
```

## 📋 Test Data Structure

### Required Fields:
- `firstName` (string)
- `lastName` (string)
- `email` (string, valid email format)
- `countryCode` (string, ITU E.164 code)
- `phoneNumber` (string, valid for country)
- `company` (string)
- `preferredDate` (string, YYYY-MM-DD format)
- `preferredTime` (string)

### Optional Fields:
- `jobTitle`, `companySize`, `industry`, `website`
- `timezone`, `consultationGoals`, `currentChallenges`
- `budget`, `timeline`, `additionalNotes`, `consultationType`

## 🔍 Verification Steps

After running tests, verify data was saved:

### 1. Check Supabase Dashboard
```bash
# Go to: https://supabase.com/dashboard → Your Project → Table Editor
# Check the 'contacts' table for new entries
```

### 2. Check Admin Panel
```bash
# Visit: http://localhost:4010/admin/contacts
# Verify new consultation submissions appear
```

### 3. Test Actual Form
```bash
# Visit: http://localhost:4010/consultation
# Complete the full form submission flow
```

## 🛠️ Troubleshooting

### Common Issues & Fixes

#### Time Format Issues
**Error**: `RangeError: Invalid time value`
**Cause**: 12-hour time format (e.g., "2:00 PM") not properly converted to 24-hour format
**Fix**: ✅ **Resolved** - Added `convertTo24Hour()` function that handles AM/PM conversion

The system now correctly converts:
- `9:30 AM` → `09:30:00`
- `2:00 PM` → `14:00:00`
- `12:00 PM` → `12:00:00`

#### Rate Limiting
If you see "429 Too Many Requests":
```bash
# Wait for the rate limit window to reset
# Current limit: 1000 submissions per 24 hours per IP
# Rate limits reset automatically
```

#### Custom Rate Limiting
Override default limits with environment variables:

```bash
# .env.local or Vercel environment variables
RATE_LIMIT_CONTACT_WINDOW_MS=86400000    # 24 hours in milliseconds
RATE_LIMIT_CONTACT_MAX_REQUESTS=1000     # 1000 submissions per window
```

Available rate limit environment variables:
- `RATE_LIMIT_CONTACT_WINDOW_MS` - Contact form window (default: 86400000 = 24 hours)
- `RATE_LIMIT_CONTACT_MAX_REQUESTS` - Contact form max requests (default: 1000)
- `RATE_LIMIT_API_WINDOW_MS` - General API window (default: 900000 = 15 minutes)
- `RATE_LIMIT_API_MAX_REQUESTS` - General API max requests (default: 100)

### Server Not Running
If tests fail with connection errors:
```bash
# Start the development server
npm run dev

# Then run tests in another terminal
npm run test:consultation
```

### Database Issues
If submissions fail:
```bash
# Check Supabase connection
npm run test:supabase

# Verify consultation columns were added
# Re-run the SQL in Supabase if needed
```

## 📊 Expected API Responses

### Success Response (200):
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": "1760445640632"
  }
}
```

### Error Response (400):
```json
{
  "success": false,
  "error": "Missing required fields: firstName, lastName, and email are required"
}
```

## 🎉 Success Indicators

- ✅ HTTP 200 status for valid submissions
- ✅ Contact ID returned in response
- ✅ Data appears in Supabase table
- ✅ Data appears in admin panel
- ✅ Form validation works on frontend
- ✅ Phone number validation passes
- ✅ Email format validation works

---

**Happy Testing!** 🧪✨
