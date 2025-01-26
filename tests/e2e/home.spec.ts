import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should display main content', async ({ page }) => {
    await page.goto('/');

    // Check main heading
    await expect(page.getByRole('heading', { name: /build something amazing/i })).toBeVisible();

    // Check CTA buttons
    await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /create account/i })).toBeVisible();
  });

  test('should navigate to auth pages from CTA buttons', async ({ page }) => {
    await page.goto('/');

    // Click "Get Started" and verify navigation
    await page.getByRole('link', { name: /get started/i }).click();
    // Add a small wait for navigation
    await page.waitForURL('**/login');
    await expect(page.url()).toContain('/login');

    // Go back and test "Create account"
    await page.goto('/');
    await page.getByRole('link', { name: /create account/i }).click();
    await page.waitForURL('**/register');
    await expect(page.url()).toContain('/register');
  });

  test('should display all feature cards', async ({ page }) => {
    await page.goto('/');

    // Check for feature sections using more specific selectors
    await expect(page.getByRole('heading', { name: 'Authentication Ready' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Modern Design System' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'State Management' })).toBeVisible();
  });
});
