import { test, expect } from '../fixtures/pageFixtures.js';
import { products } from '../test-data/products.js';
import { checkoutValidationData } from '../test-data/checkoutValidationData.js';

async function navigateToCheckoutInformation(inventoryPage, cartPage) {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
}

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
});

test('Submit customer information and navigate to checkout overview', async ({ page, inventoryPage, cartPage, checkoutPage, checkoutOverviewPage }) => {
    await inventoryPage.addProductToCart(products.backpack);

    await inventoryPage.openCart();

    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterPostalCode("12345");
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(checkoutOverviewPage.getOverviewItem(products.backpack)).toBeVisible();
    await expect(checkoutOverviewPage.getAllOverviewItems()).toHaveCount(1);
});

test('Complete purchase of two products and verify order confirmation', async ({ page, inventoryPage, cartPage, checkoutPage, checkoutOverviewPage, checkoutCompletePage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.fleeceJacket);

    await inventoryPage.openCart();
    await expect(cartPage.getCartItem(products.backpack)).toBeVisible();
    await expect(cartPage.getCartItem(products.fleeceJacket)).toBeVisible();
    await expect(cartPage.getAllCartItems()).toHaveCount(2);
    await cartPage.proceedToCheckout();

    await expect(page).toHaveURL(/checkout-step-one.html/);

    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterPostalCode("12345");
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two.html/);

    await expect(checkoutOverviewPage.getOverviewItem(products.backpack)).toBeVisible();
    await expect(checkoutOverviewPage.getOverviewItem(products.fleeceJacket)).toBeVisible();

    await expect(checkoutOverviewPage.getAllOverviewItems()).toHaveCount(2);

    await checkoutOverviewPage.clickFinish();
    await expect(page).toHaveURL(/checkout-complete.html/)

    await expect(checkoutCompletePage.getConfirmationMessage()).toBeVisible();
});

for (const scenario of checkoutValidationData) {
    test(`Display Validation error when ${scenario.name} is missing`, async ({ inventoryPage, checkoutPage, cartPage }) => {
        
        await navigateToCheckoutInformation(inventoryPage, cartPage);

        await checkoutPage.enterFirstName(scenario.firstName);
        await checkoutPage.enterLastName(scenario.lastName);
        await checkoutPage.enterPostalCode(scenario.postalCode);

        await checkoutPage.clickContinue();

        await expect(checkoutPage.errorMessage).toHaveText(scenario.expectedError);
    });
}

