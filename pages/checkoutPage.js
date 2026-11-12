export class CheckoutPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator('#first-name');
        this.lastName = page.locator('#last-name');
        this.postalCode = page.locator('#postal-code');
        this.continueButton = this.page.getByRole("button", { name: "Continue" });
        this.errorMessage = this.page.getByRole('alert')
    }

    async enterFirstName(firstName) {
        await this.firstName.fill(firstName);
    }

    async enterLastName(lastName) {
        await this.lastName.fill(lastName);
    }

    async enterPostalCode(postalCode) {
        await this.postalCode.fill(postalCode);
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
