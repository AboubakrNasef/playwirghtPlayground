import { test } from './fixtures/fixtures';
import { InventoryPage } from '../src/pages/inventory-page';
import { LoginPage } from '../src/pages/login-page';
import { expect } from 'playwright/test';

test.describe("Sauce Demo - Login and Inventory Tests", () => {
    test("Successful Login", async ({ loginPage }) => {
        await loginPage.navigateToLoginPage()
        await loginPage.waitForPageLoad()
        await loginPage.login("standard_user", "secret_sauce")
      expect(await loginPage.isLoginButtonVisible()).toBeFalsy();
    });
});