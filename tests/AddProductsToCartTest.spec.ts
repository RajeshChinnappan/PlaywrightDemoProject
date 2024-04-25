import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';
import { CommonMethodsPage } from '../pages/CommonMethodsPage';
import { describe } from "node:test";

test.describe("Add prouducts to cart and Place order", () => {
    let page;
    let cartPage;
    let loginPage;
    let homePage;
    let username;
    let password;
    let nexus6;
    let samsungGalaxyS6;
    let name;
    let country;
    let city;
    let creditCardNumber;
    let month;
    let year;
    let date;
    let homePageTitle;

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        username = await CommonMethodsPage.readCellValueByHeader({ sheetName: "LoginPage", header: "Username" });
        password = await CommonMethodsPage.readCellValueByHeader({ sheetName: "LoginPage", header: "Password" });
        nexus6 = await CommonMethodsPage.readCellValueByHeader({ sheetName: "HomePage", header: "Nexus6" });
        samsungGalaxyS6 = await CommonMethodsPage.readCellValueByHeader({ sheetName: "HomePage", header: "SamsungGalaxyS6" });
        name = await CommonMethodsPage.readCellValueByHeader({ sheetName: "CartPage", header: "Name" });
        country = await CommonMethodsPage.readCellValueByHeader({ sheetName: "CartPage", header: "Country" });
        city = await CommonMethodsPage.readCellValueByHeader({ sheetName: "CartPage", header: "City" });
        homePageTitle = await CommonMethodsPage.readCellValueByHeader({ sheetName: "HomePage", header: "HomePageTitle" });
        creditCardNumber = CommonMethodsPage.getRandomNumber().toString();
        month = CommonMethodsPage.getCurrentMonth().toString();
        year = CommonMethodsPage.getCurrentYear().toString();
        date = CommonMethodsPage.getCurrentDate().toString();
    });

    test.describe.configure({ mode: 'serial' })

    test("Verify user is able to log into app", async function () {
        loginPage = new LoginPage(page);
        console.log(process.env.BASE_URL);
        await loginPage.launchApp();
        await loginPage.loginToApplication(process.env.USERNAME, process.env.PASSWORD);
        const actualhomePageTitlle = await page.title();
        expect(actualhomePageTitlle).toEqual(homePageTitle);
    })

    test("Verify user is able to add products to cart", async function () {
        homePage = new HomePage(page);
        await homePage.addProductToCart({ nexus6, samsungGalaxyS6 });
        await homePage.goToCart();
        cartPage = new CartPage(page);
        const productNames = await cartPage.verifyProductsAddedInCart({ nexus6, samsungGalaxyS6 });
        expect(productNames).toBe(true);
    })

    test("Verify user is able to place order", async function () {
        const totalAmount = await cartPage.getTotalAmount();
        const purchaseDeatils = await cartPage.placeOrder(name, country, city, creditCardNumber, month, year);
        let orderID = purchaseDeatils[0];
        orderID = parseInt(orderID);
        const actulalpurchaseAmount = purchaseDeatils[1];
        const actualCreditCardNumber = purchaseDeatils[2];
        const acutualUserName = purchaseDeatils[3];
        const acutualDate = purchaseDeatils[4];
        const actualPurchaseMessage = await cartPage.verifyThankYouForYourPurchaseMessageGestsDisplyed();
        expect(orderID).toBeGreaterThanOrEqual(5);
        expect(actualPurchaseMessage).toBe(true);
        expect(actulalpurchaseAmount).toEqual(totalAmount + " " + "USD");
        expect(actualCreditCardNumber).toEqual(creditCardNumber);
        expect(acutualUserName).toEqual(name);
        expect(date + "/" + month + "/" + year).toEqual(acutualDate);
        await cartPage.clickOkButton();
    })

    test("Verify user is able to delete the added products in cart", async function () {
        await homePage.addProductToCart({ nexus6, samsungGalaxyS6 });
        await homePage.goToCart();
        cartPage = new CartPage(page);
        const productDeleteLinks = await cartPage.deleteAddedProductInCart();
        expect(productDeleteLinks).toHaveCount(0);
    })

//     test("Verify user is able to delete the added products in cart", async function () {
         
//         await page.goto('C:/Users/rajesh.c/.jenkins/workspace/PlaywrightProjectEndToEndTesting/allure-report/index.html');
//         await page.screenshot({ path: 'screenshots/screenshot.png', fullPage: true });


// })

});