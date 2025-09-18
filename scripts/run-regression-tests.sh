#!/bin/bash

# Comprehensive Regression Test Runner for Zero Digital
# Runs both Playwright UI tests and API tests

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BASE_URL="http://localhost:4010"

# Test results
UI_PASSED=0
UI_FAILED=0
API_PASSED=0
API_FAILED=0

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $(date '+%H:%M:%S') - $1"
}

log_success() {
    echo -e "${GREEN}[PASS]${NC} $1"
}

log_error() {
    echo -e "${RED}[FAIL]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Function to check if server is running
check_server() {
    log_info "Checking if development server is running..."

    if curl -s --max-time 5 "$BASE_URL" > /dev/null 2>&1; then
        log_success "Server is running at $BASE_URL"
        return 0
    else
        log_error "Server is not running at $BASE_URL"
        log_info "Starting development server..."
        cd "$PROJECT_ROOT"
        npm run dev &
        SERVER_PID=$!

        # Wait for server to start
        local attempts=0
        while [ $attempts -lt 30 ]; do
            if curl -s --max-time 5 "$BASE_URL" > /dev/null 2>&1; then
                log_success "Server started successfully"
                return 0
            fi
            sleep 2
            ((attempts++))
        done

        log_error "Failed to start server"
        return 1
    fi
}

# Function to run Playwright tests
run_ui_tests() {
    echo
    echo "========================================"
    echo "        Running UI Tests (Playwright)"
    echo "========================================"
    echo

    cd "$PROJECT_ROOT"

    # Check if Playwright is installed
    if ! command -v npx &> /dev/null; then
        log_error "npx not found. Please install Node.js"
        return 1
    fi

    log_info "Running Playwright tests..."

    # Run tests and capture results
    if npx playwright test --reporter=line; then
        log_success "All UI tests passed"
        return 0
    else
        log_error "Some UI tests failed"
        return 1
    fi
}

# Function to run API tests
run_api_tests() {
    echo
    echo "========================================"
    echo "        Running API Tests"
    echo "========================================"
    echo

    cd "$PROJECT_ROOT"

    if [ ! -f "scripts/test-apis.sh" ]; then
        log_error "API test script not found: scripts/test-apis.sh"
        return 1
    fi

    log_info "Running API regression tests..."

    if bash scripts/test-apis.sh; then
        log_success "All API tests passed"
        return 0
    else
        log_error "Some API tests failed"
        return 1
    fi
}

# Function to run linting
run_linting() {
    echo
    echo "========================================"
    echo "        Running Code Linting"
    echo "========================================"
    echo

    cd "$PROJECT_ROOT"

    log_info "Running ESLint..."

    if npm run lint; then
        log_success "Linting passed"
        return 0
    else
        log_error "Linting failed"
        return 1
    fi
}

# Function to run build test
run_build_test() {
    echo
    echo "========================================"
    echo "        Running Build Test"
    echo "========================================"
    echo

    cd "$PROJECT_ROOT"

    log_info "Running production build..."

    if npm run build; then
        log_success "Build completed successfully"
        return 0
    else
        log_error "Build failed"
        return 1
    fi
}

# Function to generate test report
generate_report() {
    echo
    echo "========================================"
    echo "           Test Report"
    echo "========================================"
    echo "Test Run Completed: $(date)"
    echo "Project: Zero Digital Website"
    echo "Environment: Development"
    echo

    # Show test results summary
    echo "UI Tests: $UI_PASSED passed, $UI_FAILED failed"
    echo "API Tests: $API_PASSED passed, $API_FAILED failed"
    echo "Linting: $(if npm run lint > /dev/null 2>&1; then echo "PASSED"; else echo "FAILED"; fi)"
    echo "Build: $(if npm run build > /dev/null 2>&1; then echo "PASSED"; else echo "FAILED"; fi)"
    echo

    local total_passed=$((UI_PASSED + API_PASSED))
    local total_failed=$((UI_FAILED + API_FAILED))

    if [ $total_failed -eq 0 ]; then
        log_success "🎉 ALL TESTS PASSED! Ready for deployment."
    else
        log_error "❌ $total_failed test(s) failed. Please fix before deployment."
    fi
}

# Function to cleanup
cleanup() {
    log_info "Cleaning up..."

    # Kill any background processes
    if [ ! -z "$SERVER_PID" ]; then
        kill $SERVER_PID 2>/dev/null || true
    fi

    # Clean up test artifacts
    cd "$PROJECT_ROOT"
    rm -rf test-results playwright-report/*.zip 2>/dev/null || true

    log_info "Cleanup completed"
}

# Main execution
main() {
    echo "=========================================="
    echo "  Zero Digital - Regression Test Suite"
    echo "=========================================="
    echo

    trap cleanup EXIT

    # Parse command line arguments
    local run_ui=true
    local run_api=true
    local run_lint=true
    local run_build=true

    while [[ $# -gt 0 ]]; do
        case $1 in
            --no-ui)
                run_ui=false
                shift
                ;;
            --no-api)
                run_api=false
                shift
                ;;
            --no-lint)
                run_lint=false
                shift
                ;;
            --no-build)
                run_build=false
                shift
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo "Options:"
                echo "  --no-ui     Skip UI tests"
                echo "  --no-api    Skip API tests"
                echo "  --no-lint   Skip linting"
                echo "  --no-build  Skip build test"
                echo "  --help      Show this help"
                exit 0
                ;;
            *)
                log_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done

    # Check server
    if ! check_server; then
        exit 1
    fi

    # Run tests
    local overall_success=true

    if [ "$run_ui" = true ]; then
        if run_ui_tests; then
            UI_PASSED=1
        else
            UI_FAILED=1
            overall_success=false
        fi
    fi

    if [ "$run_api" = true ]; then
        if run_api_tests; then
            API_PASSED=1
        else
            API_FAILED=1
            overall_success=false
        fi
    fi

    if [ "$run_lint" = true ]; then
        if ! run_linting; then
            overall_success=false
        fi
    fi

    if [ "$run_build" = true ]; then
        if ! run_build_test; then
            overall_success=false
        fi
    fi

    # Generate report
    generate_report

    if [ "$overall_success" = true ]; then
        log_success "Regression testing completed successfully!"
        exit 0
    else
        log_error "Regression testing failed!"
        exit 1
    fi
}

# Run main function
main "$@"
