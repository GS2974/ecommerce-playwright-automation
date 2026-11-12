import { test as base, expect } from '@playwright/test';
import { InventoryPage } from '../pages/inventoryPage.js';
import { CartPage } from '../pages/cartPage.js';
import { LoginPage } from '../pages/loginPage.js';
import { CheckoutPage } from '../pages/checkoutPage.js';
import { CheckoutOverviewPage } from '../pages/checkoutOverviewPage.js';
import { CheckoutCompletePage } from '../pages/checkoutCompletePage.js';

export const test = base.extend({
    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },

    checkoutOverviewPage: async ({ page }, use) => {
        const checkoutOverviewPage = new CheckoutOverviewPage(page);
        await use(checkoutOverviewPage);
    },

    checkoutCompletePage: async ({ page }, use) => {
        const checkoutCompletePage = new CheckoutCompletePage(page);
        await use(checkoutCompletePage);
    }

});

export { expect };