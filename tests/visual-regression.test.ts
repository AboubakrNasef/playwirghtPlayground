import { test } from './fixtures/fixtures';
import { expect } from '@playwright/test';

test('inventory page visual baseline', async ({ inventoryAuthenticatedPage }) => {
  await inventoryAuthenticatedPage.addProductToCartByIndex(0);
  await expect(inventoryAuthenticatedPage.page).toHaveScreenshot('inventory-page.png', {
    fullPage: true,
    animations: 'disabled',
    mask: [inventoryAuthenticatedPage.cartBadge],
    maskColor: '#ff00ff',
    stylePath: 'tests/visual-regression.css',
  });
});

test('inventory page scroll visual baseline', async ({ inventoryAuthenticatedPage }) => {
  await inventoryAuthenticatedPage.page.mouse.wheel(0, 500);
  await expect.poll(() => inventoryAuthenticatedPage.page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expect(inventoryAuthenticatedPage.page).toHaveScreenshot('inventory-after-scroll.png', {
    animations: 'disabled',
    stylePath: 'tests/visual-regression.css',
  });
});
