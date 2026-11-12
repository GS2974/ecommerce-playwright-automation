export class InventoryPage {
    constructor(page) {
        this.page = page;
        this.backPackProduct = page.locator(".inventory_item").filter({ hasText: "Sauce Labs Backpack" });
        this.backpackAddButton = this.backPackProduct.locator("button").filter({ hasText: "Add to cart" });
        this.cartBadge = page.locator(".shopping_cart_badge");
        this.cartLink = page.locator(".shopping_cart_link");
    }

async addProductToCart(productName) {
    const product = this.page.locator(".inventory_item").filter({ hasText: productName });
    const addButton = product.locator("button").filter({ hasText: "Add to cart" });
    await addButton.click();
}

async openCart() {
    await this.cartLink.click();
    }
}