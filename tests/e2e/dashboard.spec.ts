import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should redirect to login when not authenticated', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForURL('**/login');
    await expect(page.url()).toContain('/login');
  });

  // Example of a test that would need authentication
  test.skip('should display dashboard when authenticated', async ({ page }) => {
    // TODO: Implement authentication helper
    // await authenticateUser(page);

    await page.goto('/dashboard');
    await expect(page.getByRole('heading', { name: /dashboard/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible();
  });
});
