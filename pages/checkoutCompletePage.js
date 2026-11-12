export class CheckoutCompletePage {
    constructor(page) {
        this.page = page;
        this.confirmationMessage = this.page.getByRole("heading", {name: "Thank you for your order!"});
    }

     getConfirmationMessage() {
        return this.page.getByRole("heading", {name: "Thank you for your order!"});
    }
}