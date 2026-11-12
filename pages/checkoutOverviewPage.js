export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
    }

    getOverviewItem(productName) {
        return this.page.locator(".cart_item").filter({ hasText: productName });
    }

    getAllOverviewItems() {
        return this.page.locator(".cart_item");
    }

}