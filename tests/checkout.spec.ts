import {test} from "../fixtures/test";
import {expect} from "@playwright/test";
import {CheckoutPage} from "../pages/CheckoutPage";
import {expectedErrorMessages} from "../test-data/checkout";

test.beforeEach( async ({ page }) => {
    await page.goto("/checkout-step-one.html")
});


for( const [name,obj] of Object.entries(expectedErrorMessages)) {
    test(`${name}`, async ({checkoutPage}) => {
        await checkoutPage.fillCheckoutForm(obj)
        await expect(checkoutPage.errorMsg).toHaveText(obj.expectedError)

    });
}