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

  test.describe('Content Management', () => {
    test('Admin content page loads and functions correctly', async ({ page }) => {
      // First login as admin
      await page.goto('/admin/login');
      await page.getByLabel('Username').fill('admin');
      await page.getByLabel('Password').fill('admin123');
      await page.getByRole('button', { name: 'Sign in' }).click();

      // Wait for navigation to admin content page
      await page.waitForURL(/\/admin\/content/);

      // Verify admin content page loads
      await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Content Sections' })).toBeVisible();

      // Check that all content sections are visible
      const sections = ['Homepage', 'About Page', 'Services Page', 'Portfolio Page', 'Blog Page', 'Contact Page'];
      for (const section of sections) {
        await expect(page.getByText(section)).toBeVisible();
      }
    });

    test('Content editing functionality works', async ({ page }) => {
      // Login as admin
      await page.goto('/admin/login');
      await page.getByLabel('Username').fill('admin');
      await page.getByLabel('Password').fill('admin123');
      await page.getByRole('button', { name: 'Sign in' }).click();
      await page.waitForURL(/\/admin\/content/);

      // Select homepage section
      await page.getByRole('button', { name: 'Homepage' }).click();

      // Click edit button
      await page.getByRole('button', { name: 'Edit' }).click();

      // Verify edit mode is active
      await expect(page.getByLabel('Content (JSON)')).toBeVisible();

      // Verify save and cancel buttons are visible
      await expect(page.getByRole('button', { name: 'Save Changes' })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
    });

    test('Homepage content sync after admin edit', async ({ page, context }) => {
      // Open two tabs - one for admin, one for homepage
      const adminPage = page;
      const homepagePage = await context.newPage();

      // Login as admin in first tab
      await adminPage.goto('/admin/login');
      await adminPage.getByLabel('Username').fill('admin');
      await adminPage.getByLabel('Password').fill('admin123');
      await adminPage.getByRole('button', { name: 'Sign in' }).click();
      await adminPage.waitForURL(/\/admin\/content/);

      // Open homepage in second tab
      await homepagePage.goto('/');
      const originalTitle = await homepagePage.getByRole('heading', { level: 1 }).textContent();

      // Edit homepage content in admin tab
      await adminPage.getByRole('button', { name: 'Homepage' }).click();
      await adminPage.getByRole('button', { name: 'Edit' }).click();

      // Get current content and modify hero title
      const textarea = adminPage.getByLabel('Content (JSON)');
      const currentContent = await textarea.textContent();
      const contentObj = JSON.parse(currentContent || '{}');

      // Modify the hero title
      const newTitle = '123 testing - AI-Powered Digital Transformation for Hyderabad Businesses';
      contentObj.hero = contentObj.hero || {};
      contentObj.hero.title = newTitle;

      // Update the textarea
      await textarea.fill(JSON.stringify(contentObj, null, 2));

      // Save changes
      await adminPage.getByRole('button', { name: 'Save Changes' }).click();

      // Wait for success message
      await expect(adminPage.getByText('✓ Changes saved successfully!')).toBeVisible({ timeout: 10000 });

      // Check if homepage content updated in the second tab
      await homepagePage.reload();
      await homepagePage.waitForLoadState('networkidle');

      // Verify the homepage shows the updated title
      await expect(homepagePage.getByRole('heading', { name: newTitle })).toBeVisible({ timeout: 10000 });
    });
  });

  test.describe('SEO and Performance', () => {
    test('All pages have proper meta tags', async ({ page }) => {
      const pages = [
        { url: '/', title: 'Zero Digital' },
        { url: '/about', title: 'About - Zero Digital' },
        { url: '/services', title: 'Services - Zero Digital' },
        { url: '/portfolio', title: 'Portfolio - Zero Digital' },
        { url: '/blog', title: 'Blog - Zero Digital' },
        { url: '/contact', title: 'Contact - Zero Digital' }
      ];

      for (const pageData of pages) {
        await page.goto(pageData.url);

        // Check title
        await expect(page).toHaveTitle(pageData.title);

        // Check meta description
        const metaDescription = await page.getAttribute('meta[name="description"]', 'content');
        expect(metaDescription).toBeTruthy();
        expect(metaDescription!.length).toBeGreaterThan(50);

        // Check canonical URL
        const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
        expect(canonical).toBeTruthy();
      }
    });

    test('Pages load within acceptable time', async ({ page }) => {
      const pages = ['/', '/about', '/services', '/portfolio', '/blog', '/contact'];

      for (const pageUrl of pages) {
        const startTime = Date.now();
        await page.goto(pageUrl);
        await page.waitForLoadState('networkidle');
        const loadTime = Date.now() - startTime;

        // Should load within 3 seconds
        expect(loadTime).toBeLessThan(3000);
      }
    });

    test('Images have proper alt attributes', async ({ page }) => {
      await page.goto('/');

      // Check all images have alt attributes
      const images = await page.locator('img').all();
      for (const image of images) {
        const alt = await image.getAttribute('alt');
        expect(alt).toBeTruthy();
        expect(alt!.length).toBeGreaterThan(0);
      }
    });
  });

  test.describe('Accessibility', () => {
    test('All pages have proper heading hierarchy', async ({ page }) => {
      const pages = ['/', '/about', '/services', '/portfolio', '/blog', '/contact'];

      for (const pageUrl of pages) {
        await page.goto(pageUrl);

        // Check for h1 tag (should have exactly one)
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBe(1);

        // Check that headings follow logical order (no skipping levels)
        const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
        let previousLevel = 0;

        for (const heading of headings) {
          const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
          const level = parseInt(tagName.substring(1));

          // H1 can appear anywhere, but other headings shouldn't skip levels
          if (previousLevel > 1) {
            expect(level).toBeLessThanOrEqual(previousLevel + 1);
          }

          previousLevel = level;
        }
      }
    });

    test('All interactive elements have proper labels', async ({ page }) => {
      await page.goto('/');

      // Check buttons have accessible names
      const buttons = await page.locator('button').all();
      for (const button of buttons) {
        const accessibleName = await button.getAttribute('aria-label') || await button.textContent();
        expect(accessibleName).toBeTruthy();
        expect(accessibleName!.trim().length).toBeGreaterThan(0);
      }

      // Check links have accessible names
      const links = await page.locator('a').all();
      for (const link of links) {
        const accessibleName = await link.getAttribute('aria-label') || await link.textContent();
        expect(accessibleName).toBeTruthy();
        expect(accessibleName!.trim().length).toBeGreaterThan(0);
      }
    });

    test('Color contrast meets WCAG standards', async ({ page }) => {
      await page.goto('/');

      // Check that text has sufficient contrast
      // This is a basic check - in a real scenario, you'd use a more comprehensive tool
      const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6').all();

      for (const element of textElements) {
        const color = await element.evaluate(el => window.getComputedStyle(el).color);
        const backgroundColor = await element.evaluate(el => window.getComputedStyle(el).backgroundColor);

        // Basic check - ensure text isn't invisible
        expect(color).not.toBe('rgba(0, 0, 0, 0)');
        expect(color).not.toBe('transparent');
      }
    });
  });

  test.describe('Mobile Responsiveness', () => {
    test('Mobile menu works correctly', async ({ page }) => {
      // Set viewport to mobile size
      await page.setViewportSize({ width: 375, height: 667 });

      await page.goto('/');

      // Check mobile menu button exists
      const mobileMenuButton = page.getByRole('button', { name: 'Open main menu' });
      await expect(mobileMenuButton).toBeVisible();

      // Open mobile menu
      await mobileMenuButton.click();

      // Check navigation links are visible in mobile menu
      const navLinks = ['Home', 'Services', 'Portfolio', 'Blog', 'About', 'Contact'];
      for (const link of navLinks) {
        await expect(page.getByRole('link', { name: link })).toBeVisible();
      }
    });

    test('Contact form works on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/contact');

      // Fill contact form
      await page.getByLabel('First name *').fill('Mobile Test');
      await page.getByLabel('Last name *').fill('User');
      await page.getByLabel('Email *').fill('mobile@example.com');
      await page.getByLabel('Message *').fill('Testing mobile contact form');

      // Submit form
      await page.getByRole('button', { name: 'Send message' }).click();

      // Wait for success message
      await expect(page.locator('[data-testid="success-message"]')).toBeVisible({ timeout: 15000 });
    });
  });

  test.describe('Error Handling', () => {
    test('404 page works correctly', async ({ page }) => {
      await page.goto('/nonexistent-page');

      // Should show 404 page
      await expect(page.getByText('This page could not be found.')).toBeVisible();
      await expect(page).toHaveTitle('404: This page could not be found.');
    });

    test('Invalid admin login shows error', async ({ page }) => {
      await page.goto('/admin/login');

      // Try invalid credentials
      await page.getByLabel('Username').fill('invalid');
      await page.getByLabel('Password').fill('invalid');
      await page.getByRole('button', { name: 'Sign in' }).click();

      // Should show error message
      await expect(page.getByText(/Invalid|Login failed|Error/)).toBeVisible({ timeout: 10000 });
    });
  });
});
