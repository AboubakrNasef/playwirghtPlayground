# Page Object Model (POM) Guide

This project uses the Page Object Model pattern for organizing Playwright tests for [saucedemo.com](https://www.saucedemo.com).

## Structure

```
src/
├── pages/
│   ├── base-page.ts       # Base class with common page methods
│   ├── login-page.ts      # Login page POM
│   ├── inventory-page.ts  # Inventory page POM
│   └── index.ts           # Exports all page objects
└── tests/
    └── example.test.ts    # Example tests using POM
```

## BasePage Class

The `BasePage` class contains common functionality shared by all pages:

- `page` - The Playwright Page instance
- `goto(url)` - Navigate to a URL
- `waitForPageLoad()` - Wait for page to load

## LoginPage

Handles all login-related interactions:

### Locators
- `usernameInput` - Username input field
- `passwordInput` - Password input field
- `loginButton` - Login button
- `errorMessage` - Error message element

### Methods
- `navigateToLoginPage()` - Navigate to saucedemo.com
- `enterUsername(username)` - Enter username
- `enterPassword(password)` - Enter password
- `clickLoginButton()` - Click login button
- `login(username, password)` - Complete login (all steps combined)
- `isLoginButtonVisible()` - Check if login button is visible
- `getErrorMessage()` - Get error message text
- `isErrorMessageDisplayed()` - Check if error is displayed

### Example Usage
```typescript
const loginPage = new LoginPage(page);
await loginPage.navigateToLoginPage();
await loginPage.login("standard_user", "secret_sauce");
```

## InventoryPage

Handles all inventory page interactions:

### Locators
- `productList` - Product list container
- `productItems` - Individual product items
- `cartButton` - Shopping cart link
- `cartBadge` - Cart item count badge
- `sortDropdown` - Product sort dropdown
- `menuButton` - Hamburger menu button
- `logoutLink` - Logout link

### Methods
- `navigateToInventory()` - Navigate to inventory page
- `getProductCount()` - Get total number of products
- `getProductByName(productName)` - Find product by name
- `addProductToCart(productName)` - Add product to cart by name
- `addProductToCartByIndex(index)` - Add product to cart by index
- `removeProductFromCart(productName)` - Remove product from cart
- `getCartBadgeCount()` - Get cart item count
- `isCartBadgeVisible()` - Check if cart badge is visible
- `goToCart()` - Navigate to cart
- `sortProducts(sortOption)` - Sort products (e.g., "lohi", "hilo", "az", "za")
- `logout()` - Logout from inventory page
- `getProductPrices()` - Get all product prices as array
- `getProductNames()` - Get all product names as array
- `isProductDisplayed(productName)` - Check if product is visible

### Example Usage
```typescript
const inventoryPage = new InventoryPage(page);
await inventoryPage.navigateToInventory();
const count = await inventoryPage.getProductCount();
await inventoryPage.addProductToCartByIndex(0);
const cartCount = await inventoryPage.getCartBadgeCount();
```

## Test Credentials

Standard User: `standard_user` / `secret_sauce`

## Best Practices

1. **Use Page Objects** - Never directly access page locators in tests
2. **Logical Methods** - Create methods that represent user actions, not UI interactions
3. **Single Responsibility** - Each page object handles only its own page
4. **Inheritance** - Extend BasePage to reuse common functionality
5. **Exports** - Import from `src/pages` index for cleaner imports

## Running Tests

```bash
npx playwright test
```

## Example Test File

See `src/tests/example.test.ts` for complete test examples.
