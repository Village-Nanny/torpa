import { test, expect } from '@playwright/test';
import { Page } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should show login page', async ({ page }: { page: Page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
    await expect(page.getByPlaceholder('name@example.com')).toBeVisible();
    await expect(page.getByPlaceholder('••••••••')).toBeVisible();

    // Let's try to find the input by type first
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();

    // Add a debug step to see what's actually on the page
    console.log('Page content:', await page.content());
  });

  test('should show registration page', async ({ page }: { page: Page }) => {
    await page.goto('/register');
    // Wait for navigation to complete
    await page.waitForLoadState('networkidle');

    // Debug: Let's see what's actually on the page
    const content = await page.content();
    console.log('Register page content:', content);

    // Check for elements with more specific selectors
    await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should navigate between auth pages', async ({ page }: { page: Page }) => {
    // Start at login
    await page.goto('/login');

    // Go to register
    await page.getByRole('link', { name: /sign up/i }).click();
    await page.waitForURL('**/register');
    await expect(page.url()).toContain('/register');

    // Go back to login
    await page.getByRole('link', { name: /sign in/i }).click();
    await page.waitForURL('**/login');
    await expect(page.url()).toContain('/login');

    // Go to forgot password
    await page.getByRole('link', { name: /forgot.*password/i }).click();
    await page.waitForURL('**/forgot-password');
    await expect(page.url()).toContain('/forgot-password');
  });
});
