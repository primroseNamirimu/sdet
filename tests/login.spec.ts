// import { test, expect } from "@playwright/test"
import { expect } from "@playwright/test"
import { test } from "../fixtures/test"
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";



test.beforeEach( async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
})

test.only("successfully log in", async ({ loginPage,page }) => {
    await loginPage.login("standard_user",'secret_sauce');
    await expect(page).toHaveURL(/inventory.html/)
})

test("User can successfully log in", async({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.login("standard_user","secret_sauce")

    await expect(page).toHaveURL(/inventory.html/);


});


test("User cannot log in with invalid credentials", async( {page} ) => {

    const loginPage = new LoginPage(page);

    await loginPage.login("standard_user","wrong_password")

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
    await loginPage.login("standard_user","secret_sauce")

    await expect(page).toHaveURL(/inventory.html/);

    // Once this fails, does that mean that the below code will not work? or do we need an if clause....

    const inventoryPage = new InventoryPage(page);

    console.log('Are they the same page', loginPage.page === inventoryPage.page);

    await expect(inventoryPage.mainTitle).toHaveText('Swag Labs');
    await expect(inventoryPage.cart).toBeVisible();
    // I'm just going to copy this for the products title as well
    await expect(inventoryPage.productsTitle).toBeVisible(); // I think i need to broaden wheat I test/assert. Like what are the different things apart from it's visible and it has a tilte.. you know..?

})

/*
*  Negative test
* What I would do:
* Enter a username for an account which is locked or doesn't exist
*
* What I expect
* Not be able to log in
*
* *  Validation test
* What I would do:
* Enter numbers in the field of username where usually it's text which is expected
*
* What I expect
* Not be able to log in with error message " Username should contain letters"
*
* *  Boundary test
* What I would do:
*
* What I expect
*
*
* *  security test
* What I would do:
* Log in and then immediately log out and repeat this a couple of times/multiple
* Log in with wrong credentials repeatedly
*
* What I expect
* To be locked out of the account with a notification of too many log in attempts i.e a triggered rate limit
* To be locked out of the account with a notification of too many failed log in attempts
*
* *  usability test
* What I would do:
*
* What I expect
*
*
* *  session test
* What I would do:
* Log in and then immiediately log out, then attempt pressing the browser back arrow
* Log in and leave the page un attended to / no activity
*
* What I expect
* The session to end once I logout
* The session to timeout with inactivity
*
*
* | Category      | Example                        |
| ------------- | ------------------------------ |
| Happy path    | Valid credentials → dashboard  |
| Negative      | Invalid credentials            |
| Validation    | Invalid input format           |
| Boundary      | Minimum/maximum allowed length |
| Security      | Brute-force protection         |
| Security      | Account enumeration            |
| Usability     | Clear error messages           |
| Accessibility | Keyboard navigation            |
| Session       | Logout invalidates session     |
| Session       | Session timeout                |

* Negative test
* Scenario: Invalid credentials
* Precondition
* The browser is displaying the login page
*
* Action
* Enter a wrong password for that account
*
* Expected result
* Failed login attempt with generic error message not exposing sensitive inforamtion such as "Incorrect username or password"

* Boundary test
* Scenario Edge cases for the length requirement of username
*
* Precondition
* [ I confirmed the functional requirements for the username  ]
* The browser is displaying the login page
*
* Action
* -> The username should be between 8-12 characters with alphanumeric
* Enter a username of 7 characters
*
* Expected result
* The login attempt should fail with generic error message not exposing sensitive information such as "Incorrect username or password"
*
* Usability test
* Scenario Visibility of a password
*
* Precondition
* The browser is displaying the login page
*
* Action
* Toggle the password visibility icon to mask/unmask the password
*
* Expected result
*
* The password should be visible/masked depending on the toggle input
*
* Tests should be isolated from one another.
*
* Playwright can run tests in pararrel because each test gets it's own browser context
*
* "What makes a good automated test?"
* It should be deterministic, isolated, maintainable, and focused on one behavior.
*
* */

test("login", async( {page} ) => {
    const loginPage = new LoginPage(page);

    await loginPage.login("standard_user","secret_sauce")

})
