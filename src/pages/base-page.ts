import { Page } from "playwright";

export abstract class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

   protected async goto(url:string): Promise<void> {
        await this.page.goto(url);
    }

    async waitForPageLoad(): Promise<void> {
        await this.page.waitForLoadState("networkidle");
    }
}