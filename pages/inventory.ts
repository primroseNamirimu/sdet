import {Page, Locator, expect} from '@playwright/test';

export class InventoryPage {
    mainTitle:Locator;
    cart:Locator;
    productsTitle:Locator;
    page:Page;

    //get me these elements

    constructor(page:Page){
        this.mainTitle = page.getByText('Swag Labs');
        this.productsTitle = page.getByText('Products');
        // this.cart = page.locator('[data-test="shopping-cart-link"]');
        this.cart = page.locator(".shopping_cart_link");
        // since this is a link, can we get it by role...i.e link role
        //this.cart = page.getByRole("link",{name:""} mmhh but we have no "name" it's just <a></a>
        this.page = page;
        // console.log('Inventory page', page)
    }

}
