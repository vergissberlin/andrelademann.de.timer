import { test, expect } from '@playwright/test';

test('overview loads', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText(/Overview|Übersicht/);
});

