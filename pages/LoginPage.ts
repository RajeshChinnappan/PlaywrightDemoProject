import { type Locator, type Page } from '@playwright/test';
import { CommonMethodsPage } from '../pages/CommonMethodsPage';
export class LoginPage {

    readonly page: Page;
    readonly loginLink: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginLink = page.getByRole('link', { name: 'Log in' });
        this.usernameInput = page.locator('#loginusername');
        this.passwordInput = page.locator('#loginpassword');
                this.loginButton = page.getByRole('button', { name: 'Log in' });

    }

    async launchApp() {
        await this.page.goto(process.env.BASE_URL);
    }

    async loginToApplication(username, password) {
        await this.loginLink.click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
