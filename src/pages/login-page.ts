import { Page } from "playwright";
import { BasePage } from "./base-page";

export class LoginPage extends BasePage {
    readonly usernameInput = this.page.locator('input[data-test="username"]');
    readonly passwordInput = this.page.locator('input[data-test="password"]');
    readonly loginButton = this.page.locator('input[data-test="login-button"]');
    readonly errorMessage = this.page.locator('[data-test="error"]');

    constructor(page: Page) {
        super(page);
    }

    async navigateToLoginPage(): Promise<void> {
        await this.goto("/");
    }

    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }

    async clickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await this.loginButton.isVisible();
    }

    async getErrorMessage(): Promise<string> {
        return await this.errorMessage.textContent() || "";
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }
}