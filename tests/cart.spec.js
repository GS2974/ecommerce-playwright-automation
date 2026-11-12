import { test, expect } from '../fixtures/pageFixtures.js';
import { products } from '../test-data/products.js';

test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
});

test('Add Backpack to shopping cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);

    await expect(inventoryPage.cartBadge).toHaveText("1");
    await inventoryPage.openCart();
    await expect(cartPage.getCartItem(products.backpack)).toBeVisible();
});

test('Remove Backpack from shopping cart', async ({ inventoryPage, cartPage }) => {

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.backpack);

    await expect(cartPage.getCartItem(products.backpack)).toHaveCount(0);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
});

test('Add three products to shopping cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.addProductToCart(products.fleeceJacket);
    await inventoryPage.openCart();

    await expect(cartPage.getCartItem(products.backpack)).toBeVisible();
    await expect(cartPage.getCartItem(products.bikeLight)).toBeVisible();
    await expect(cartPage.getCartItem(products.fleeceJacket)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("3");
});

test('Add three products and remove one product from shopping cart', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.addProductToCart(products.bikeLight);
    await inventoryPage.addProductToCart(products.fleeceJacket);
    await inventoryPage.openCart();
    await cartPage.removeProduct(products.bikeLight);

    await expect(cartPage.getCartItem(products.backpack)).toBeVisible();
    await expect(cartPage.getCartItem(products.bikeLight)).toHaveCount(0);
    await expect(cartPage.getCartItem(products.fleeceJacket)).toBeVisible();
    await expect(inventoryPage.cartBadge).toHaveText("2");
});