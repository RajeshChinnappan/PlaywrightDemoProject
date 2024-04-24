import { type Locator, type Page } from '@playwright/test';

export class CartPage {

    readonly page: Page;
    readonly noOfProducts: Locator;
    readonly noOfProductdeleteLinks: Locator;
    readonly placeOrderButton: Locator;
    readonly nameInput: Locator;
    readonly countryInput: Locator;
    readonly cityInput: Locator;
    readonly creditCardInput: Locator;
    readonly monthInput: Locator;
    readonly yearInput: Locator;
    readonly purchaseBUtton: Locator;
    readonly totaAmountText: Locator;
    readonly purchaseDeatils: Locator;
    readonly okButton: Locator;
    readonly thankYouForYourPurchaseText: Locator;


    constructor(page : Page) {
        this.page = page;
        this.noOfProducts = page.locator('//tbody[@id="tbodyid"]//child::td[2]');
        this.noOfProductdeleteLinks = page.locator('//tbody[@id="tbodyid"]//child::td[4]');
        this.placeOrderButton = page.getByRole('button', { name: 'Place Order' });
        this.nameInput = page.locator('#name');
        this.countryInput = page.getByLabel('Country:');
        this.cityInput = page.getByLabel('City:');
        this.creditCardInput = page.getByLabel('Credit card:');
        this.monthInput = page.getByLabel('Month:');
        this.yearInput = page.getByLabel('Year:');
        this.purchaseBUtton = page.getByRole('button', { name: 'Purchase' });
        this.purchaseDeatils = page.locator("//p[@class = 'lead text-muted ']");
        this.totaAmountText = page.locator('#totalp');
        this.okButton = page.getByRole('button', { name: 'OK' });
        this.thankYouForYourPurchaseText = page.getByText('Thank you for your purchase!');
    }

    async verifyProductsAddedInCart(productList) {
        let status;
        const productsInCart = await this.noOfProducts.allTextContents();
        for (const key in productList) {
            status = false;
            const productName = productList[key];
            for (const product of productsInCart) {
                if (productName === product) {
                    status = true;
                }
            }
        }
        return status;
    }

    async placeOrder(name, country, city, creditCardNumber, month, year) {
        await this.placeOrderButton.click();
        await this.nameInput.fill(name);
        await this.countryInput.fill(country);
        await this.cityInput.fill(city);
        await this.creditCardInput.fill(creditCardNumber);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);
        await this.purchaseBUtton.click();
        await this.page.waitForLoadState("networkidle");
        let purchaseDeatilsTextContent = await this.purchaseDeatils.textContent();
        let purchaseDetails = purchaseDeatilsTextContent?.split('Id: ').toString().split('Amount: ').toString()
            .split('Card Number: ').toString().split('Name: ').toString().split('Date: ').toString().split(",")
            .filter(value => value !== '');
        return purchaseDetails;
    }

    async deleteAddedProductInCart() {
        let count = 0;
        const productsDeleteLinks = await this.noOfProductdeleteLinks.allTextContents();
        for (const deleteLinks of productsDeleteLinks) {
            await this.page.getByRole('link', { name: deleteLinks }).nth(count).click();
            await this.page.waitForLoadState("networkidle");
            count++;
        }
        await this.page.waitForTimeout(3000); 
        return await this.noOfProductdeleteLinks;
    }

    async getTotalAmount() {
        return await this.totaAmountText.textContent();
    }
    
    async verifyThankYouForYourPurchaseMessageGestsDisplyed() {
        return await this.thankYouForYourPurchaseText.isVisible();
    }

    async clickOkButton() {
        await this.okButton.click();
    }
}
