import { Page, Locator } from "playwright";
import { BasePage } from "./base-page";

export class InventoryPage extends BasePage {
    readonly productList = this.page.locator('[data-test="inventory-list"]');
    readonly productItems = this.page.locator('[data-test="inventory-item"]');
    readonly cartButton = this.page.locator('[data-test="shopping-cart-link"]');
    readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    readonly sortDropdown = this.page.locator('[data-test="product-sort-container"]');
    readonly menuButton = this.page.locator('button#react-burger-menu-btn');
    readonly logoutLink = this.page.locator('a#logout_sidebar_link');

    constructor(page: Page) {
        super(page);
    }

    async navigateToInventory(): Promise<void> {
        await this.goto("/inventory.html");
    }

    async getProductCount(): Promise<number> {
        return await this.productItems.count();
    }

    async getProductByName(productName: string): Promise<Locator> {
        return this.page.locator(`//div[contains(., '${productName}')]`);
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = await this.getProductByName(productName);
        const addButton = product.locator("//button[contains(text(), 'Add to cart')]").first();
        await addButton.click();
    }

    async addProductToCartByIndex(index: number): Promise<void> {
        const addButton = this.page
            .locator('button[data-test^="add-to-cart-"]')
            .nth(index);
        await addButton.click();
    }

    async removeProductFromCart(productName: string): Promise<void> {
        const product = await this.getProductByName(productName);
        const removeButton = product.locator("//button[contains(text(), 'Remove')]").first();
        await removeButton.click();
    }

    async getCartBadgeCount(): Promise<number> {
        const badgeText = await this.cartBadge.textContent();
        return badgeText ? parseInt(badgeText) : 0;
    }

    async isCartBadgeVisible(): Promise<boolean> {
        return await this.cartBadge.isVisible();
    }

    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    async sortProducts(sortOption: string): Promise<void> {
        await this.sortDropdown.selectOption(sortOption);
    }

    async logout(): Promise<void> {
        await this.menuButton.click();
        await this.logoutLink.click();
    }

    async getProductPrices(): Promise<number[]> {
        const priceElements = this.page.locator('[data-test="inventory-item-price"]');
        const count = await priceElements.count();
        const prices: number[] = [];

        for (let i = 0; i < count; i++) {
            const priceText = await priceElements.nth(i).textContent();
            if (priceText) {
                const price = parseFloat(priceText.replace("$", ""));
                prices.push(price);
            }
        }

        return prices;
    }

    async getProductNames(): Promise<string[]> {
        const nameElements = this.page.locator('[data-test="inventory-item-name"]');
        const count = await nameElements.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const name = await nameElements.nth(i).textContent();
            if (name) {
                names.push(name);
            }
        }

        return names;
    }

    async isProductDisplayed(productName: string): Promise<boolean> {
        const product = await this.getProductByName(productName);
        return await product.isVisible();
    }
}