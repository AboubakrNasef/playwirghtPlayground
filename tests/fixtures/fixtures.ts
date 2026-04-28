import { test as base, Page, BrowserContext, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login-page';
import { InventoryPage } from '../../src/pages/inventory-page';
import fs from 'fs';

type AuthenticatedPageFixture = {
  loginPage: LoginPage;
  inventoryAuthenticatedPage: InventoryPage;
  inventoryNonAuthenticatedPage: InventoryPage;
};

const AUTH_PATH = 'tests/.auth/user.json';
export const test = base.extend<AuthenticatedPageFixture>({
  loginPage: async ({ page, baseURL }, use) => {
    await use(new LoginPage(page));
  },
  inventoryNonAuthenticatedPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  inventoryAuthenticatedPage: [async ({ browser }, use) => {
   const context = await browser.newContext({
      storageState: fs.existsSync(AUTH_PATH) ? AUTH_PATH : undefined
    });
    const page = await context.newPage();
  const cookies = await context.cookies();

  const isLoggedOut = cookies.length === 0 

    if (isLoggedOut) {
      console.log('Cookies null or expired. Logging in...');
      const loginPage = new LoginPage(page);
      
      await loginPage.navigateToLoginPage(); // Or page.goto('/login')
      await loginPage.login('standard_user', 'secret_sauce');
      
      // Save the fresh state so we don't have to login next time
      await context.storageState({ path: AUTH_PATH });
    }
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.navigateToInventory(); 
    await use(inventoryPage);

  },{ box: true }]
});



