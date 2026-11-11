import {expect} from "@playwright/test"
import { test } from "../fixtures/test"
import { InventoryPage } from "../pages/inventory";
import {CartPage} from "../pages/cart";
import {expectedPrices} from "../test-data/products";


test.beforeEach( async ({ page }) => {
    await page.goto("/inventory.html");
});


test("Inventory page", async ({ page, inventoryPage}) => {

    // Well we need to login first..? right? yes- but we are now using storageState

    // use a retrying assertion -> trick to use to differentiate the retrying assertions and the reads is
    // a retrying assertion is basically "I need this locotar to have this, to be this... whereas for the reads
    // it's more like "hey, is the locator that?, does it have this? ...something like that

    await expect(inventoryPage.productNames).toHaveCount(6);
    await inventoryPage.getProductNames();

})

test("sort reverse", async ({ page, inventoryPage }) => {
    await expect(inventoryPage.productNames).toHaveCount(6);

    const alphabetical = await inventoryPage.getProductNames() // call this before we reverse
    const reverse = await inventoryPage.reverseSelect()

    const expected = [...alphabetical].sort().reverse(); // reverse and sort mutate the array, so use the spread operator ... to make a copy first

    expect(reverse).toEqual(expected);

})

test("cart visibility",{tag: "@smoke" }, async ({ page, inventoryPage }) => {

    // add item to cart and see badge appear
    await page.getByTestId("add-to-cart-sauce-labs-bike-light").click();
    // assert that it is 1
    await expect(inventoryPage.cartBadge).toHaveText("1")

    // remove item from cart
    await page.getByTestId("remove-sauce-labs-bike-light").click();
    await expect(inventoryPage.cartBadge).not.toBeVisible();  // works only if we are certain only one item was in our cart

})

test("added item appears in cart", async ({ page, inventoryPage, cartPage }) => {

    await page.getByTestId("add-to-cart-sauce-labs-backpack").click();
    await expect(inventoryPage.cartBadge).toHaveText("1")
    await inventoryPage.cart.click()
    await expect(page).toHaveURL("/cart.html")  // are we really on the cart page
    await expect(cartPage.checkoutButton).toBeVisible(); // double check.. doesn't hurt

    await expect(cartPage.itemNames).toHaveText(["Sauce Labs Backpack"])


})

for ( const [name,price] of Object.entries(expectedPrices)) {
    test(`${name} shows ${price}`, async ({ page }) => {
        const item = page.getByTestId("inventory-item").filter({ hasText:name });
        await expect ( item.getByTestId("inventory-item-price")).toHaveText(price);

    });

}
