import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.js';

test ('Successful customer login', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "secret_sauce");
    await expect (page).toHaveURL(/inventory\.html/);
    await expect (page.getByText("Products")).toBeVisible();

});

test ('Login with invalid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("incorrect_user", "incorrect_password");
    await expect (loginPage.invalidCredentialsError).toBeVisible();
    await expect (page).toHaveURL("/");
});

test ('Login without password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("standard_user", "");
    await expect (loginPage.passwordRequiredError).toBeVisible();
    await expect (page).toHaveURL("/");
});

test ('Login without username', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("", "secret_sauce");
    await expect (loginPage.usernameRequiredError).toBeVisible();
    await expect (page).toHaveURL("/");
});

test ('Login without username and password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login("", "");
    await expect (loginPage.usernameRequiredError).toBeVisible();
    await expect (page).toHaveURL("/");
});