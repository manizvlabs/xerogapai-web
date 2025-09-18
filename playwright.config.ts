import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4010',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    ignoreHTTPSErrors: true, // Handle SSL certificate issues for WebKit
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        ignoreHTTPSErrors: true,
        launchOptions: {
          args: [
            '--ignore-ssl-errors=yes',
            '--ignore-certificate-errors',
            '--disable-web-security',
            '--allow-running-insecure-content'
          ]
        }
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4010',
    reuseExistingServer: !process.env.CI,
  },
});
