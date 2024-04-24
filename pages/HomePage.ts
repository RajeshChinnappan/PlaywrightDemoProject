
import { type Locator, type Page } from '@playwright/test';

export class HomePage {

    readonly page : Page;
    readonly productList : Locator;
    readonly addToCartLink : Locator;
    readonly cartLink : Locator;
    readonly homeLink : Locator;


    constructor(page:Page) {
        this.page = page;
        this.productList = page.locator('a[class = "hrefch"]');
        this.addToCartLink = page.getByRole('link', { name: 'Add to cart' });
        this.cartLink = page.getByRole('link', { name: 'Cart', exact: true });
        this.homeLink = page.getByRole('link', { name: 'Home (current)' });
    }

    async addProductToCart(productList) {
        await this.page.waitForLoadState("networkidle");
        console.log("Product List" + " " + productList);
        for (const key in productList) {
            const productName = productList[key];
            console.log("ProductName" + " " + productName);
            await this.page.getByRole('link', { name: productName }).click();
            await this.addToCartLink.click();
            await this.page.waitForLoadState("networkidle",{timeout:3000});
            await this.homeLink.click();
        }
    }

    async goToCart() {
        await this.cartLink.click();
        await this.page.waitForLoadState("networkidle");
    }

}
