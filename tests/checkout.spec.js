import { test, expect } from '../fixtures/pageFixtures.js';
import { products } from '../test-data/products.js';

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

test('Display validation error when First Name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    await navigateToCheckoutInformation(inventoryPage, cartPage);
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterFirstName("");
    await checkoutPage.enterPostalCode("12345");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.errorMessage).toHaveText("Error: First Name is required");

});

test('Display validation error when Last Name is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    await navigateToCheckoutInformation(inventoryPage, cartPage);
    await checkoutPage.enterLastName("");
    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterPostalCode("12345");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.errorMessage).toHaveText("Error: Last Name is required");

});

test('Display validation error when Postal Code is missing', async ({ inventoryPage, cartPage, checkoutPage }) => {

    await navigateToCheckoutInformation(inventoryPage, cartPage);
    await checkoutPage.enterLastName("Doe");
    await checkoutPage.enterFirstName("John");
    await checkoutPage.enterPostalCode("");
    await checkoutPage.clickContinue();
    await expect(checkoutPage.errorMessage).toHaveText("Error: Postal Code is required");

});