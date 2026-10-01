import { Page, Locator } from "@playwright/test";

export class LoginPage {
    // our properties
    username:Locator;
    password:Locator;
    loginButton:Locator;
    errorMessage:Locator;
    page:Page;

    // locate and store the elements
    constructor(page:Page){
        this.username = page.getByPlaceholder("Username");
        this.password = page.getByPlaceholder("Password");
        this.loginButton = page.getByRole("button", { name: "Login"});
        this.errorMessage = page.locator('[data-test="error"]');
        this.page = page;
        // console.log('LoginPage received page', page)
    }

    // we have to act on them

    async login(username:string, password:string){
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}