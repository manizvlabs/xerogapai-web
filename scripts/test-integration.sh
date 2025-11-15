#!/bin/bash

echo "🚀 Testing Demo Integration Services"
echo "==================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test 1: Check if server is running
echo -e "\n${YELLOW}1. Checking if development server is running...${NC}"
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✅ Development server is running${NC}"
else
    echo -e "${RED}❌ Development server is not running${NC}"
    echo "Please start the server with: npm run dev"
    exit 1
fi

# Test 2: Test Microsoft Graph API connection
echo -e "\n${YELLOW}2. Testing Microsoft Graph API connection...${NC}"
API_RESPONSE=$(curl -s -X POST http://localhost:3000/api/demo-booking \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "companyName": "Test Company",
    "preferredDate": "2025-01-15",
    "preferredTime": "14:00",
    "timezone": "America/New_York",
    "consultationType": "Test Demo"
  }' 2>/dev/null)

if echo "$API_RESPONSE" | grep -q '"success":true'; then
    echo -e "${GREEN}✅ API endpoint is working${NC}"
    echo "Response: $(echo "$API_RESPONSE" | grep -o '"message":"[^"]*"' | head -1)"
else
    echo -e "${RED}❌ API endpoint failed${NC}"
    echo "Response: $API_RESPONSE"
fi

# Test 3: Check if demo page loads
echo -e "\n${YELLOW}3. Testing demo page accessibility...${NC}"
DEMO_RESPONSE=$(curl -s -I http://localhost:3000/demo | head -1)
if echo "$DEMO_RESPONSE" | grep -q "200"; then
    echo -e "${GREEN}✅ Demo page is accessible${NC}"
else
    echo -e "${RED}❌ Demo page is not accessible${NC}"
    echo "Response: $DEMO_RESPONSE"
fi

# Test 4: Check environment variables
echo -e "\n${YELLOW}4. Checking environment configuration...${NC}"
if grep -q "MS_GRAPH_CLIENT_ID" /Users/manish/Documents/GitHub/zero/xerogapai-web/.env.local 2>/dev/null; then
    if grep -q "your-application-client-id-here" /Users/manish/Documents/GitHub/zero/xerogapai-web/.env.local; then
        echo -e "${YELLOW}⚠️  Microsoft Graph API credentials are set to placeholder values${NC}"
        echo "Please update .env.local with your actual credentials"
    else
        echo -e "${GREEN}✅ Microsoft Graph API credentials are configured${NC}"
    fi
else
    echo -e "${RED}❌ Microsoft Graph API credentials are not configured${NC}"
fi

echo -e "\n${YELLOW}📋 Integration Test Summary:${NC}"
echo "================================"
echo "• Development server: $(curl -s -I http://localhost:3000 | head -1 | grep -q "200" && echo "✅ Running" || echo "❌ Not running")"
echo "• Demo booking API: $(echo "$API_RESPONSE" | grep -q '"success":true' && echo "✅ Working" || echo "❌ Failed")"
echo "• Demo page: $(curl -s -I http://localhost:3000/demo | head -1 | grep -q "200" && echo "✅ Accessible" || echo "❌ Not accessible")"
echo "• MS Graph API: $(grep -q "MS_GRAPH_CLIENT_ID" /Users/manish/Documents/GitHub/zero/xerogapai-web/.env.local && ! grep -q "your-application-client-id-here" /Users/manish/Documents/GitHub/zero/xerogapai-web/.env.local && echo "✅ Configured" || echo "❌ Not configured")"

echo -e "\n${YELLOW}💡 Next Steps:${NC}"
echo "1. Make sure your Microsoft Graph API credentials are set in .env.local"
echo "2. Test the demo booking at: http://localhost:3000/demo"
echo "3. Check that calendar invites are being sent to your Outlook"

echo -e "\n${GREEN}🎉 Integration testing complete!${NC}"
