import {test} from "../fixtures/test";
import {expect} from "@playwright/test";
import {CheckoutPage} from "../pages/CheckoutPage";
import {expectedErrorMessages} from "../test-data/checkout";

test.beforeEach( async ({ page }) => {
    await page.goto("https://www.saucedemo.com/checkout-step-one.html")
});


for( const [name,obj] of Object.entries(expectedErrorMessages)) {
    test(`${name}`, async ({page}) => {
        const checkoutPage = new CheckoutPage(page);

        await checkoutPage.fillCheckoutForm(obj)
        await expect(checkoutPage.errorMsg).toHaveText(obj.expectedError)

    });
}