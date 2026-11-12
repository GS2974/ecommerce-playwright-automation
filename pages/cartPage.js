export class CartPage {
    constructor(page) {
        this.page = page;
        this.backpackItem = page.locator(".cart_item").filter({ hasText: "Sauce Labs Backpack" });
        this.backPackRemoveButton = this.backpackItem.getByRole("button", { name: "Remove" });
    }
    getCartItem(productName) {
        return this.page.locator(".cart_item").filter({ hasText: productName });
    }
    async removeProduct(productName) {
        const product = this.getCartItem(productName);
        await product.getByRole("button", { name: "Remove" }).click();
    }
    async checkout() {
        const checkoutButton = this.page.getByRole("button", { name: "Checkout" });
        await checkoutButton.click();
    }

    async proceedToCheckout() {
        await this.page.getByRole("button", { name: "Checkout" }).click();
    }

    getAllCartItems() {
        return this.page.locator(".cart_item")
    }
}