import { test as setup, expect } from "@playwright/test"
import { LoginPage } from "../pages/login";
import {users} from "../test-data/users";

const authFile = "playwright/.auth/auth.json";

setup("log in as standard_user", async({ page }) => {
    await page.goto("https://www.saucedemo.com/");
    const loginPage =  new LoginPage(page);
    await loginPage.login(users.standard_user.username, users.standard_user.password);

    // this line is important because without it, you would have saved the logged out state instead. storageState blindly
    // writes whatever cookies the browser has, and you get a perfectly valid file containing the wrong state
    await expect(page).toHaveURL(/inventory.html/)

    await page.context().storageState({ path: authFile });

});