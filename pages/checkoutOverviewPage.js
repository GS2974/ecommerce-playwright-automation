export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
        this.finishButton = this.page.getByRole("button", {name: "finish"});
    }

    getOverviewItem(productName) {
        return this.page.locator(".cart_item").filter({ hasText: productName });
    }

    getAllOverviewItems() {
        return this.page.locator(".cart_item");
    }

    async clickFinish() {
    await this.finishButton.click()
    }

}