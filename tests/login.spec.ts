// import { test, expect } from "@playwright/test"
import { expect } from "@playwright/test"
import { test } from "../fixtures/test"
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { users } from "../test-data/users";

test.beforeEach( async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
})


// you can destructure the page alone
test("User can successfully log in", async({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(users.standard_user.username,users.standard_user.password);

    await expect(page).toHaveURL(/inventory.html/);

});

// or destructure  both the page and the custom loginPage fixture
test("successfully log in", async ({ loginPage,page }) => {
    await loginPage.login("standard_user",'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/)
})


test("User cannot log in with invalid credentials", async( {page} ) => {

    const loginPage = new LoginPage(page);

    await loginPage.login(users.invalid_user_login.username,users.invalid_user_login.password);

    await expect(page).toHaveURL("https://www.saucedemo.com");
    // could also be
    await expect(page).not.toHaveURL(/inventory.html/);

    // I wanted to test the error message "Username and password do not match any user in this service" but I couldn't figure
    //out the locator so I just used the failing to move to the /inventory.html page

    // nevermind, I have used he inspect in the browser and seen it

    // const errorHeading = page.getByRole("heading"); //this returns multiple headings..

    // const specifiedErrorHeading = page.locator('[data-test="error"]');

    //could be

    // const anotherErrorHeading = page.getByTestId("error");

    await expect(loginPage.errorMessage).toHaveText("Epic sadface: Username and password do not match any user in this service");
});

test("Authenticated user can access inventory page", async( {page} ) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.standard_user.username,users.standard_user.password);

    await expect(page).toHaveURL(/inventory.html/);

    // Once this fails, does that mean that the below code will not work? or do we need an if clause....

    const inventoryPage = new InventoryPage(page);

    console.log('Are they the same page', loginPage.page === inventoryPage.page);

    await expect(inventoryPage.mainTitle).toHaveText('Swag Labs');
    await expect(inventoryPage.cart).toBeVisible();
    // I'm just going to copy this for the products title as well
    await expect(inventoryPage.productsTitle).toBeVisible(); // I think i need to broaden wheat I test/assert. Like what are the different things apart from it's visible and it has a tilte.. you know..?

})


test("locked out user login", async( {page, loginPage} ) => {
    await loginPage.login(users.locked_out_user.username,users.locked_out_user.password);
    const expected = users.locked_out_user.expectedError;
    const error = loginPage.errorMessage;

    if(!expected){ throw new Error("Locked out user does not have ExpectedError atrribute");}
   await expect(error).toHaveText(expected);

})

/**
 * Simple exercise to help build trust in your PASSED tests.
 *
 * 1) -> Break behaviour: basically switch up the app behaviour to gauge whether the app will notice i.e
 *
 * test("locked out user login", async( {page, loginPage} ) => {
 *     await loginPage.login(users.standard_user.username,users.locked_out_user.password);
 *     const expected = users.locked_out_user.expectedError;
 *     const error = loginPage.errorMessage;
 *
 *     if(!expected){ throw new Error("Locked out user does not have ExpectedError atrribute");}
 *     await expect(error).toHaveText(expected);
 *
 * })
 *
 * This test should fail with
 * Error: expect(locator).toHaveText(expected) failed
 *
 * Locator: getByTestId('error')
 * Expected: "Epic sadface: Sorry, this user has been locked out."
 * Timeout: 5000ms
 * Error: element(s) not found
 *
 * 2) -> Break expectation: Switch up what your are asserting against i.e
 *
 * test("locked out user login", async( {page, loginPage} ) => {
 *     await loginPage.login(users.locked_out_user.username,users.locked_out_user.password);
 *     const expected = users.locked_out_user.expectedError;
 *     const error = loginPage.errorMessage;
 *
 *     if(!expected){ throw new Error("Locked out user does not have ExpectedError atrribute");}
 *     await expect(error).toHaveText(expected);
 *
 * })
 *
 * This should fail as well with
 *
 * # Error details
 *
 * ```
 * Error: expect(locator).toHaveText(expected) failed
 *
 * Locator:  getByTestId('error')
 * Expected: "ted"
 * Received: "Epic sadface: Sorry, this user has been locked out."
 * Timeout:  5000ms
 * **/

