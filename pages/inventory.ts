import {expect, Locator, Page} from '@playwright/test';

export class InventoryPage {
    mainTitle:Locator;
    cart:Locator;
    productsTitle:Locator;
    page:Page;
    productNames:Locator;
    productsReversed:Locator;
    cartBadge:Locator;

    //get me these elements

    constructor(page:Page){
        this.mainTitle = page.getByText('Swag Labs');
        this.productsTitle = page.getByTestId('title');
        this.cart = page.getByTestId("shopping-cart-link");
        this.productNames = page.getByTestId('inventory-item-name');
        this.productsReversed = page.getByTestId('product-sort-container');
        this.cartBadge = page.getByTestId("shopping-cart-badge")
        this.page = page;

        // console.log('Inventory page', page)
    }

    async getProductNames(): Promise<string[]>{
        return await this.productNames.allTextContents();
    }

    async reverseSelect(): Promise<string[]> {
          await this.productsReversed.selectOption('az');
        return await this.productNames.allTextContents();

    }
}
