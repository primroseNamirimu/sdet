import {expect, Locator, Page} from '@playwright/test';

export class InventoryPage {
    mainTitle:Locator;
    cart:Locator;
    productsTitle:Locator;
    page:Page;
    productNames:Locator;
    productsReversed:Locator;

    //get me these elements

    constructor(page:Page){
        this.mainTitle = page.getByText('Swag Labs');
        this.productsTitle = page.getByTestId('title');
        this.cart = page.getByTestId("shopping-cart-link");
        this.productNames = page.getByTestId('inventory-item-name');
        this.productsReversed = page.getByTestId('product-sort-container');
        this.page = page;
        
        this.productNames.count()
        // console.log('Inventory page', page)
    }

    async getProductNames(): Promise<string[]>{
        return await this.productNames.allTextContents();
    }

    async reverseSelect(): Promise<string[]> {
          await this.productsReversed.selectOption('za');
        return await this.productNames.allTextContents();

    }
}
