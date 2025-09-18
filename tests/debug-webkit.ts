import { test, expect } from '@playwright/test';

test('Debug WebKit homepage', async ({ page }) => {
  await page.goto('/');

  // Wait a bit for the page to load
  await page.waitForTimeout(5000);

  // Get the page content
  const content = await page.textContent('body');
  console.log('Page content:', content?.substring(0, 1000));

  // Check if loading text is present
  const loadingText = await page.locator('text=/Loading|loading/').count();
  console.log('Loading text count:', loadingText);

  // Check for any headings
  const headings = await page.locator('h1, h2, h3').allTextContents();
  console.log('Headings found:', headings);

  // Check page title
  const title = await page.title();
  console.log('Page title:', title);

  // Check for specific content
  const hasMainContent = await page.locator('text=/AI-Powered Digital Transformation/').count();
  console.log('Main content found:', hasMainContent);
});
