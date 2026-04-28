import { test } from './fixtures/fixtures';
import { InventoryPage } from '../src/pages/inventory-page';
import { expect } from 'playwright/test';

test.describe('Inventory Page Tests', () => {
  test('should display product list', async ({ inventoryAuthenticatedPage }) => {
    await test.step('verify product list is visible', async () => {

      const isVisible = await inventoryAuthenticatedPage.productList.isVisible();
      expect(isVisible).toBeTruthy();
    });
  });

});
