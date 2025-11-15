# XeroGap AI Testing Suite

This document describes the comprehensive testing setup for the XeroGap AI website, including UI tests, API tests, and regression testing.

## Overview

The testing suite includes:
- **UI Tests**: Playwright-based end-to-end tests covering all pages and user interactions
- **API Tests**: Shell script-based API endpoint testing with sample data
- **Regression Tests**: Automated test runner that combines UI and API tests
- **Performance Tests**: Load time and responsiveness validation

## Quick Start

### Run All Tests
```bash
npm test
# or
npm run test:regression
```

### Run UI Tests Only
```bash
npm run test:ui
```

### Run API Tests Only
```bash
npm run test:api
```

### Run Tests in Headed Mode (see browser)
```bash
npm run test:ui:headed
```

### Debug Tests
```bash
npm run test:ui:debug
```

### View Test Reports
```bash
npm run test:ui:report
```

## Test Structure

### UI Tests (`tests/website.spec.ts`)

#### Page Tests
- **Homepage**: Hero section, stats, services, CTA validation
- **Services Page**: Service listings and content validation
- **Portfolio Page**: Project showcase validation
- **Blog Page**: Blog content structure validation
- **About Page**: Company information and team validation
- **Contact Page**: Contact form functionality

#### Admin Tests
- **Admin Login**: Authentication flow validation
- **Content Management**: Admin panel functionality
- **Content Sync**: Real-time content updates testing

#### User Experience Tests
- **Navigation**: Cross-page navigation validation
- **Contact Form**: Form submission and validation
- **Theme Switcher**: Dark/light mode functionality
- **Mobile Responsiveness**: Mobile menu and layout

#### Accessibility Tests
- **Heading Hierarchy**: Proper H1-H6 structure
- **Interactive Elements**: Labels and ARIA attributes
- **Color Contrast**: WCAG compliance validation
- **Keyboard Navigation**: Focus management

#### Performance Tests
- **Page Load Times**: < 3 second requirement
- **Image Optimization**: Alt attributes validation
- **SEO Meta Tags**: Proper meta tag implementation

#### Error Handling Tests
- **404 Pages**: Custom error page validation
- **Form Validation**: Input validation and error messages
- **Network Errors**: Offline and API failure handling

### API Tests (`scripts/test-apis.sh`)

#### Content APIs
- **GET** `/api/content` - Content retrieval
- **GET** `/api/content?section=homepage` - Section-specific content
- **PUT** `/api/admin/content` - Content updates

#### Authentication APIs
- **POST** `/api/auth/login` - Admin authentication
- **POST** `/api/auth/logout` - Session termination
- **GET** `/api/auth/verify` - Token validation

#### Contact APIs
- **POST** `/api/contact` - Contact form submission
- **GET** `/api/contacts` - Contact retrieval (admin)
- **GET** `/api/contacts/stats` - Contact statistics

#### Admin APIs
- **GET** `/api/admin/users` - User management
- **GET** `/api/admin/content` - Admin content access

#### SEO APIs
- **GET** `/api/sitemap` - Sitemap generation
- **GET** `/api/robots` - Robots.txt generation

## Content Synchronization Testing

The test suite includes specific tests for the content synchronization feature:

1. **Admin Content Edit**: Tests the admin panel content editing functionality
2. **Real-time Sync**: Validates that homepage content updates immediately after admin changes
3. **Cross-tab Sync**: Tests content synchronization across multiple browser tabs
4. **Cache Invalidation**: Ensures proper cache clearing after content updates

### Testing Content Sync

```bash
# Run specific content sync test
npx playwright test --grep "content sync"

# Run with multiple tabs
npx playwright test tests/website.spec.ts --grep "Homepage content sync"
```

## API Testing Details

### Sample Data Structure

The API tests use realistic sample data:

```json
{
  "contact": {
    "firstName": "API Test",
    "lastName": "User",
    "email": "api.test@example.com",
    "phone": "1234567890",
    "company": "Test Company",
    "service": "AI Content Automation",
    "message": "API regression test message"
  }
}
```

### Authentication Testing

Admin API tests include:
- Valid credential authentication
- Invalid credential rejection
- Token-based authorization
- Session management

### Performance Validation

API tests measure:
- Response times (< 1 second target)
- Error handling
- Rate limiting (if implemented)
- Data validation

## Configuration

### Playwright Configuration (`playwright.config.ts`)

```typescript
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
```

### Environment Variables

Create a `.env.test` file for test-specific configuration:

```env
# Test environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
TEST_TIMEOUT=30000
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Test Suite
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:regression
```

## Debugging Tests

### Common Issues

1. **Server not running**: Tests automatically start the dev server
2. **Port conflicts**: Ensure port 4010 is available
3. **Database issues**: Tests use in-memory storage
4. **Timing issues**: Increase timeout values for slow operations

### Debug Commands

```bash
# Run tests in debug mode
npm run test:ui:debug

# Run specific test file
npx playwright test tests/website.spec.ts

# Run tests with custom configuration
npx playwright test --config playwright.config.ts --project=chromium

# Generate code for new tests
npx playwright codegen http://localhost:3000
```

## Test Results and Reporting

### HTML Reports
```bash
npm run test:ui:report
```

### JSON Reports
```bash
npx playwright test --reporter=json
```

### Screenshots and Videos
- Screenshots: `test-results/` directory
- Videos: `playwright-report/` directory
- Traces: Available for failed tests

## Best Practices

### Writing Tests
1. Use descriptive test names
2. Group related tests with `describe` blocks
3. Use page objects for complex interactions
4. Include proper error handling
5. Test both positive and negative scenarios

### Test Data Management
1. Use realistic test data
2. Clean up test data after tests
3. Avoid dependencies between tests
4. Use fixtures for reusable test data

### Performance Considerations
1. Run tests in parallel when possible
2. Use appropriate timeouts
3. Minimize test flakiness
4. Monitor test execution time

## Troubleshooting

### Test Failures

**Common Issues:**
- Network timeouts: Increase timeout values
- Element not found: Check selectors and wait strategies
- Authentication issues: Verify credentials
- Database conflicts: Use unique test data

### Environment Setup

Ensure the following before running tests:
1. Node.js version 18+
2. All dependencies installed (`npm ci`)
3. Port 4010 available
4. No other processes using test resources

## Contributing

When adding new tests:
1. Follow the existing test structure
2. Add appropriate test data
3. Include both positive and negative test cases
4. Update this documentation
5. Ensure tests pass in CI/CD pipeline

## Support

For test-related issues:
1. Check the test output for detailed error messages
2. Review the HTML report for screenshots and traces
3. Check the console logs for additional debugging information
4. Ensure the development server is running correctly
