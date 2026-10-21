import { expect } from "@playwright/test"
import { test } from "../fixtures/test"
import { LoginPage } from "../pages/login";
import { InventoryPage } from "../pages/inventory";
import { users } from "../test-data/users";

test.beforeEach( async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
})


test("Inventory page", async ({ page, loginPage}) => {

    // Well we need to login first..? right?

    const login = await loginPage.login(users.standard_user.username, users.standard_user.password);

    // or, just assert that we are on inventory page already
    await expect(page).toHaveURL(/inventory.html/);
    const inventoryPage = new InventoryPage(page);
    const pn = await inventoryPage.getProductNames()

})

test("sort reverse", async ({ page, loginPage }) => {

    await loginPage.login(users.standard_user.username, users.standard_user.password);
    await expect(page).toHaveURL(/inventory.html/);
    const inventoryPage = new InventoryPage(page);
    const alphabetical = await inventoryPage.getProductNames() // call this before we reverse
    const reverse = await inventoryPage.reverseSelect()

    const expected = [...alphabetical].sort().reverse(); // reverse and sort mutate the array, so use the spread operator ... to make a copy first

    expect(reverse).toEqual(expected);


})