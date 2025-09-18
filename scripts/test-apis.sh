#!/bin/bash

# API Testing Script for Zero Digital Website
# This script tests all API endpoints with sample data for regression testing

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost:4010"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"

# Test results
PASSED=0
FAILED=0

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
    ((PASSED++))
}

log_error() {
    echo -e "${RED}[FAIL]${NC} $1"
    ((FAILED++))
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Function to make API request and check response
test_api() {
    local method=$1
    local endpoint=$2
    local data=$3
    local expected_status=${4:-200}
    local description=$5

    log_info "Testing $description"

    local response
    local status

    if [ "$method" = "GET" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X GET "$BASE_URL$endpoint")
    elif [ "$method" = "POST" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST "$BASE_URL$endpoint" \
                 -H "Content-Type: application/json" \
                 -d "$data")
    elif [ "$method" = "PUT" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X PUT "$BASE_URL$endpoint" \
                 -H "Content-Type: application/json" \
                 -d "$data")
    elif [ "$method" = "DELETE" ]; then
        response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X DELETE "$BASE_URL$endpoint")
    fi

    # Extract HTTP status code
    status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    body=$(echo "$response" | sed -e 's/HTTPSTATUS:.*//g')

    if [ "$status" -eq "$expected_status" ]; then
        log_success "$description (Status: $status)"
        return 0
    else
        log_error "$description (Expected: $expected_status, Got: $status)"
        echo "Response: $body"
        return 1
    fi
}

# Function to get admin token
get_admin_token() {
    log_info "Getting admin authentication token"

    local response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X POST "$BASE_URL/api/auth/login" \
                    -H "Content-Type: application/json" \
                    -d "{\"username\":\"$ADMIN_USERNAME\",\"password\":\"$ADMIN_PASSWORD\"}")

    local status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    local body=$(echo "$response" | sed -e 's/HTTPSTATUS:.*//g')

    if [ "$status" -eq 200 ]; then
        # Extract token from response (assuming it's in JSON format)
        local token=$(echo "$body" | grep -o '"token":"[^"]*' | cut -d'"' -f4)
        if [ -n "$token" ]; then
            echo "$token"
            return 0
        fi
    fi

    log_error "Failed to get admin token"
    return 1
}

# Main test function
run_api_tests() {
    echo "========================================"
    echo "   Zero Digital API Regression Tests"
    echo "========================================"
    echo

    # Test 1: Health check - Content API
    test_api "GET" "/api/content" "" 200 "Content API health check"

    # Test 2: Get homepage content
    test_api "GET" "/api/content?section=homepage" "" 200 "Homepage content retrieval"

    # Test 3: Get about page content
    test_api "GET" "/api/content?section=about" "" 200 "About page content retrieval"

    # Test 4: Get services page content
    test_api "GET" "/api/content?section=services" "" 200 "Services page content retrieval"

    # Test 5: Get portfolio page content
    test_api "GET" "/api/content?section=portfolio" "" 200 "Portfolio page content retrieval"

    # Test 6: Get blog page content
    test_api "GET" "/api/content?section=blog" "" 200 "Blog page content retrieval"

    # Test 7: Get contact page content
    test_api "GET" "/api/content?section=contact" "" 200 "Contact page content retrieval"

    # Test 8: Contact form submission
    local contact_data='{
        "firstName": "API Test",
        "lastName": "User",
        "email": "api.test@example.com",
        "phone": "1234567890",
        "company": "Test Company",
        "service": "AI Content Automation",
        "message": "This is an API test message for regression testing"
    }'
    test_api "POST" "/api/contact" "$contact_data" 200 "Contact form submission"

    # Test 9: Admin login
    local login_data="{\"username\":\"$ADMIN_USERNAME\",\"password\":\"$ADMIN_PASSWORD\"}"
    test_api "POST" "/api/auth/login" "$login_data" 200 "Admin login"

    # Get admin token for authenticated tests
    local admin_token=$(get_admin_token)
    if [ -z "$admin_token" ]; then
        log_error "Cannot proceed with admin tests - no token"
        return 1
    fi

    # Test 10: Admin content retrieval
    test_api "GET" "/api/admin/content" "" 200 "Admin content retrieval"

    # Test 11: Admin content update
    local update_data='{
        "section": "homepage",
        "content": {
            "hero": {
                "title": "API Test - AI-Powered Digital Transformation",
                "subtitle": "Testing content sync functionality",
                "cta": {
                    "primary": "Get Started",
                    "secondary": "Learn more"
                }
            }
        }
    }'
    test_api "PUT" "/api/admin/content" "$update_data" 200 "Admin content update"

    # Test 12: Admin users retrieval
    test_api "GET" "/api/admin/users" "" 200 "Admin users retrieval"

    # Test 13: Admin contacts retrieval
    test_api "GET" "/api/contacts" "" 200 "Admin contacts retrieval"

    # Test 14: Admin contacts stats
    test_api "GET" "/api/contacts/stats" "" 200 "Admin contacts stats"

    # Test 15: Sitemap
    test_api "GET" "/api/sitemap" "" 200 "Sitemap generation"

    # Test 16: Robots.txt
    test_api "GET" "/api/robots" "" 200 "Robots.txt generation"

    # Test 17: Test invalid endpoints
    test_api "GET" "/api/nonexistent" "" 404 "Invalid endpoint (404 expected)"
    test_api "GET" "/api/content?section=invalid" "" 200 "Invalid section (should return default)"

    # Test 18: Test rate limiting (if implemented)
    log_info "Testing rate limiting (if implemented)"
    for i in {1..10}; do
        curl -s -X POST "$BASE_URL/api/contact" \
             -H "Content-Type: application/json" \
             -d '{"firstName":"Rate","lastName":"Limit","email":"rate@example.com","message":"Test"}' > /dev/null
    done
    log_warning "Rate limiting test completed - check logs manually"

    return 0
}

# Function to test content synchronization
test_content_sync() {
    echo
    echo "========================================"
    echo "    Content Synchronization Tests"
    echo "========================================"
    echo

    # Get admin token
    local admin_token=$(get_admin_token)
    if [ -z "$admin_token" ]; then
        log_error "Cannot test content sync - no admin token"
        return 1
    fi

    # Test content update and retrieval
    log_info "Testing content update and sync"

    # Update homepage content
    local sync_data='{
        "section": "homepage",
        "content": {
            "hero": {
                "title": "Sync Test - AI-Powered Digital Transformation",
                "subtitle": "Testing content synchronization after admin edit",
                "cta": {
                    "primary": "Get Started",
                    "secondary": "Learn more"
                }
            }
        }
    }'

    # Update content
    local update_response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X PUT "$BASE_URL/api/admin/content" \
                           -H "Content-Type: application/json" \
                           -d "$sync_data")

    local update_status=$(echo "$update_response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
    local update_body=$(echo "$update_response" | sed -e 's/HTTPSTATUS:.*//g')

    if [ "$update_status" -eq 200 ]; then
        log_success "Content update successful"

        # Test content retrieval
        sleep 2  # Wait for any caching to clear

        local retrieve_response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X GET "$BASE_URL/api/content?section=homepage")

        local retrieve_status=$(echo "$retrieve_response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
        local retrieve_body=$(echo "$retrieve_response" | sed -e 's/HTTPSTATUS:.*//g')

        if [ "$retrieve_status" -eq 200 ] && echo "$retrieve_body" | grep -q "Sync Test"; then
            log_success "Content synchronization working correctly"
        else
            log_error "Content synchronization failed"
            echo "Retrieved content: $retrieve_body"
        fi
    else
        log_error "Content update failed"
        echo "Update response: $update_body"
    fi
}

# Function to test performance
test_performance() {
    echo
    echo "========================================"
    echo "       Performance Tests"
    echo "========================================"
    echo

    local endpoints=("/api/content" "/api/content?section=homepage" "/api/content?section=about" "/api/content?section=services")

    for endpoint in "${endpoints[@]}"; do
        log_info "Testing performance for $endpoint"

        local start_time=$(date +%s%3N)
        local response=$(curl -s -w "HTTPSTATUS:%{http_code}" -X GET "$BASE_URL$endpoint")
        local end_time=$(date +%s%3N)

        local status=$(echo "$response" | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
        local duration=$((end_time - start_time))

        if [ "$status" -eq 200 ] && [ "$duration" -lt 1000 ]; then
            log_success "$endpoint - ${duration}ms"
        elif [ "$status" -eq 200 ]; then
            log_warning "$endpoint - ${duration}ms (slow but functional)"
        else
            log_error "$endpoint - Failed (Status: $status)"
        fi
    done
}

# Function to test error scenarios
test_error_scenarios() {
    echo
    echo "========================================"
    echo "       Error Scenario Tests"
    echo "========================================"
    echo

    # Test invalid JSON
    test_api "POST" "/api/contact" '{"invalid": json}' 400 "Invalid JSON handling"

    # Test missing required fields
    local incomplete_data='{"firstName": "Test"}'
    test_api "POST" "/api/contact" "$incomplete_data" 400 "Missing required fields"

    # Test unauthorized admin access
    test_api "GET" "/api/admin/content" "" 401 "Unauthorized admin access"

    # Test invalid admin credentials
    local invalid_login='{"username":"invalid","password":"invalid"}'
    test_api "POST" "/api/auth/login" "$invalid_login" 401 "Invalid admin credentials"
}

# Main execution
main() {
    echo "Starting API regression tests for Zero Digital..."
    echo "Base URL: $BASE_URL"
    echo

# Check if server is running, start it if not
if ! curl -s --max-time 5 "$BASE_URL" > /dev/null 2>&1; then
    log_warning "Server is not running at $BASE_URL, starting it..."
    npm run dev &
    SERVER_PID=$!

    # Wait for server to start
    local attempts=0
    while [ $attempts -lt 30 ]; do
        if curl -s --max-time 5 "$BASE_URL" > /dev/null 2>&1; then
            log_success "Server started successfully"
            sleep 2  # Give server extra time to stabilize
            break
        fi
        sleep 2
        ((attempts++))
    done

    if [ $attempts -eq 30 ]; then
        log_error "Failed to start server after 60 seconds"
        exit 1
    fi
else
    log_success "Server is already running"
fi

    # Run all test suites
    run_api_tests
    test_content_sync
    test_performance
    test_error_scenarios

    # Print results
    echo
    echo "========================================"
    echo "           Test Results"
    echo "========================================"
    echo "Passed: $PASSED"
    echo "Failed: $FAILED"
    echo "Total:  $((PASSED + FAILED))"

    if [ $FAILED -eq 0 ]; then
        log_success "All tests passed! ✅"
        exit 0
    else
        log_error "Some tests failed! ❌"
        exit 1
    fi
}

# Cleanup function
cleanup() {
    log_info "Cleaning up..."

    # Kill any background processes
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null || true
    fi

    log_info "Cleanup completed"
}

# Set trap for cleanup
trap cleanup EXIT

# Run main function
main "$@"
