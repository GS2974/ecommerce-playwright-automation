export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('password');
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.invalidCredentialsError = page.getByText("Epic sadface: Username and password do not match any user in this service");
        this.usernameRequiredError = page.getByText("Epic sadface: Username is required");
        this.passwordRequiredError = page.getByText("Epic sadface: Password is required");
    }   
    async goto() {
        await this.page.goto("/");
    }
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}