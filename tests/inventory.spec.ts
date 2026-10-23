import { expect } from "@playwright/test"
import { test } from "../fixtures/test"
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { users } from "../test-data/users";

test.beforeEach( async ({ page }) => {
    await page.goto("https://www.saucedemo.com/inventory.html");
})


test("Inventory page", async ({ page, loginPage}) => {

    // Well we need to login first..? right? yes- but we are now using storageState
    const inventoryPage = new InventoryPage(page);
    const pn = await inventoryPage.getProductNames()

})

test("sort reverse", async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);
    const alphabetical = await inventoryPage.getProductNames() // call this before we reverse
    const reverse = await inventoryPage.reverseSelect()

    const expected = [...alphabetical].sort().reverse(); // reverse and sort mutate the array, so use the spread operator ... to make a copy first

    expect(reverse).toEqual(expected);

})

test("cart visibility", async ({ page, loginPage }) => {
    const inventoryPage = new InventoryPage(page);

    // add item to cart and see badge appear
    await page.getByTestId("add-to-cart-sauce-labs-bike-light").click();
    // assert that it is 1
    await expect(inventoryPage.cartBadge).toHaveText("1")

    // remove item from cart
    await page.getByTestId("remove-sauce-labs-bike-light").click();
    await expect(inventoryPage.cartBadge).not.toBeVisible();  // works only if we are certain only one item was in our cart

})