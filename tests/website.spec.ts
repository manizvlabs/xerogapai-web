import { test, expect } from '@playwright/test';

test.describe('Zero Digital Website', () => {
  test('Homepage loads correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle(/Zero Digital/);
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /AI-Powered Digital Transformation/ })).toBeVisible();
    
    // Check navigation links in header
    const header = page.getByRole('banner');
    await expect(header.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Services' })).toBeVisible();
    await expect(header.getByRole('link', { name: 'Contact' })).toBeVisible();
    
    // Check CTA buttons - target the header specifically
    await expect(header.getByRole('link', { name: 'Get Started' })).toBeVisible();
    
    // Check footer - target the footer specifically
    const footer = page.getByRole('contentinfo');
    await expect(footer.getByText('Zero Digital')).toBeVisible();
  });

  test('Services page loads correctly', async ({ page }) => {
    await page.goto('/services');
    
    await expect(page).toHaveTitle(/Services/);
    // Target the main heading specifically
    const main = page.getByRole('main');
    await expect(main.getByRole('heading', { name: 'Our Services' })).toBeVisible();
  });

  test('Contact page loads correctly', async ({ page }) => {
    await page.goto('/contact');
    
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.getByRole('heading', { name: /Contact/ })).toBeVisible();
    
    // Check contact form - use more specific selectors
    await expect(page.getByLabel('First name *')).toBeVisible();
    await expect(page.getByLabel('Email *')).toBeVisible();
    await expect(page.getByLabel('Message *')).toBeVisible();
  });

  test('About page loads correctly', async ({ page }) => {
    await page.goto('/about');
    
    await expect(page).toHaveTitle(/About/);
    await expect(page.getByRole('heading', { name: /About/ })).toBeVisible();
  });

  test('Portfolio page loads correctly', async ({ page }) => {
    await page.goto('/portfolio');
    
    await expect(page).toHaveTitle(/Portfolio/);
    await expect(page.getByRole('heading', { name: /Portfolio/ })).toBeVisible();
  });

  test('Blog page loads correctly', async ({ page }) => {
    await page.goto('/blog');
    
    await expect(page).toHaveTitle(/Blog/);
    await expect(page.getByRole('heading', { name: /Blog/ })).toBeVisible();
  });

  test.describe('Admin Login Issues', () => {
    test('Admin login page loads correctly', async ({ page }) => {
      await page.goto('/admin/login');
      
      await expect(page).toHaveTitle(/Admin Login/);
      await expect(page.getByRole('heading', { name: 'Admin Login' })).toBeVisible();
      
      // Check form elements
      const usernameField = page.getByLabel('Username');
      const passwordField = page.getByLabel('Password');
      const submitButton = page.getByRole('button', { name: 'Sign in' });
      
      await expect(usernameField).toBeVisible();
      await expect(passwordField).toBeVisible();
      await expect(submitButton).toBeVisible();
    });

    test('Admin login form fields are interactive', async ({ page }) => {
      await page.goto('/admin/login');
      
      const usernameField = page.getByLabel('Username');
      const passwordField = page.getByLabel('Password');
      
      // Check that fields are empty initially
      await expect(usernameField).toHaveValue('');
      await expect(passwordField).toHaveValue('');
      
      // Test typing in username field
      await usernameField.click();
      await expect(usernameField).toBeFocused();
      
      await usernameField.fill('testuser');
      await expect(usernameField).toHaveValue('testuser');
      
      // Test typing in password field
      await passwordField.click();
      await expect(passwordField).toBeFocused();
      
      await passwordField.fill('testpass');
      await expect(passwordField).toHaveValue('testpass');
    });

    test('Admin login form submission works', async ({ page }) => {
      await page.goto('/admin/login');
      
      const usernameField = page.getByLabel('Username');
      const passwordField = page.getByLabel('Password');
      const submitButton = page.getByRole('button', { name: 'Sign in' });
      
      // Fill form with correct credentials
      await usernameField.fill('admin');
      await passwordField.fill('admin123');
      
      // Submit form and wait for navigation to admin content page
      await Promise.all([
        page.waitForURL(/\/admin\/content/, { timeout: 10000 }),
        submitButton.click()
      ]);
      
      // Verify we're on the admin content page
      await expect(page).toHaveURL(/\/admin\/content/);
    });

    test('Admin login shows error for invalid credentials', async ({ page }) => {
      await page.goto('/admin/login');
      
      const usernameField = page.getByLabel('Username');
      const passwordField = page.getByLabel('Password');
      const submitButton = page.getByRole('button', { name: 'Sign in' });
      
      // Fill form with incorrect credentials
      await usernameField.fill('wronguser');
      await passwordField.fill('wrongpass');
      
      // Submit form
      await submitButton.click();
      
      // Wait for error message to appear with longer timeout for WebKit
      try {
        await expect(page.locator('[data-testid="error-message"]')).toBeVisible({ timeout: 10000 });
      } catch (error) {
        // Fallback: check for any error-related text
        const errorText = await page.getByText(/Invalid|Login failed|Error/).isVisible();
        if (!errorText) {
          throw new Error('No error message appeared for invalid credentials');
        }
      }
    });

    test('Admin content page redirects to login when not authenticated', async ({ page }) => {
      await page.goto('/admin/content');
      
      // Should redirect to login page
      await page.waitForURL(/\/admin\/login/, { timeout: 5000 });
    });
  });

  test.describe('Contact Form', () => {
    test('Contact form submission works', async ({ page }) => {
      await page.goto('/contact');
      
      // Fill contact form - use more specific selectors
      await page.getByLabel('First name *').fill('Test User');
      await page.getByLabel('Last name *').fill('Test Last');
      await page.getByLabel('Email *').fill('test@example.com');
      await page.getByLabel('Phone number').fill('1234567890');
      await page.getByLabel('Company').fill('Test Company');
      await page.getByLabel('Service interested in').selectOption('AI Content Automation');
      await page.getByLabel('Message *').fill('This is a test message');
      
      // Submit form
      await page.getByRole('button', { name: 'Send message' }).click();
      
      // Add debugging for WebKit
      console.log('Contact form submitted, waiting for response...');
      
      // Wait for form submission to complete
      await page.waitForLoadState('networkidle');
      
      // Wait for success message to appear
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 15000 });
      
      // Verify the success message content
      await expect(page.getByText(/Thank you! Your message has been sent successfully/)).toBeVisible();
    });
  });

  test.describe('Theme Switcher', () => {
    test('Theme switcher works', async ({ page }) => {
      await page.goto('/');
      
      // Wait for the page to fully load and theme switcher to be mounted
      await page.waitForLoadState('networkidle');
      
      // Check if theme switcher exists (it might be disabled in config)
      const themeButton = page.getByRole('button', { name: /Switch to.*theme/ });
      
      // If theme switcher is not visible, skip the test
      if (await themeButton.count() === 0) {
        test.skip('Theme switcher is not enabled in configuration');
        return;
      }
      
      await expect(themeButton).toBeVisible();
      
      // Wait for the button to be enabled (not disabled) - this happens after mounting
      await expect(themeButton).toBeEnabled({ timeout: 15000 });
      
      // Click theme switcher
      await themeButton.click();
      
      // Wait a moment for the theme change to take effect
      await page.waitForTimeout(500);
      
      // Verify the button is still enabled and clickable
      await expect(themeButton).toBeEnabled();
      
      // Click again to toggle back
      await themeButton.click();
      
      // Verify it's still working
      await expect(themeButton).toBeEnabled();
    });
  });

  test.describe('Navigation', () => {
    test('Navigation links work correctly', async ({ page }) => {
      await page.goto('/');
      
      // Test each navigation link
      const navLinks = [
        { name: 'Services', url: '/services' },
        { name: 'Portfolio', url: '/portfolio' },
        { name: 'Blog', url: '/blog' },
        { name: 'About', url: '/about' },
        { name: 'Contact', url: '/contact' }
      ];
      
      for (const link of navLinks) {
        // Target the header navigation specifically
        const header = page.getByRole('banner');
        
        // Click the link and wait for navigation (avoid SSL issues in WebKit)
        await header.getByRole('link', { name: link.name }).click();
        
        // Wait for navigation to complete
        await page.waitForLoadState('networkidle');
        
        // Verify we're on the correct page
        await expect(page).toHaveURL(link.url);
        
        // Verify the page title matches
        const expectedTitle = link.name === 'Home' ? 'Zero Digital' : `${link.name} - Zero Digital`;
        await expect(page).toHaveTitle(expectedTitle);
        
        // Go back to homepage for next test
        await page.goBack();
        await page.waitForLoadState('networkidle');
      }
    });
  });
});
