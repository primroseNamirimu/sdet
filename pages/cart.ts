import {Locator, Page} from "@playwright/test";

export class CartPage{
    itemNames:Locator;
    checkoutButton:Locator;

    constructor(page:Page) {
        this.itemNames = page.getByTestId("inventory-item-name")
        this.checkoutButton = page.getByTestId("checkout")

    }

}