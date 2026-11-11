import { test as base} from "@playwright/test"

import { LoginPage } from "../pages/login";
import {InventoryPage} from "../pages/inventory";
import {CheckoutPage} from "../pages/CheckoutPage";
import {CartPage} from "../pages/cart";

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
    cartPage: CartPage;

    
};

export const test = base.extend<Fixtures>({
    loginPage: async( {page }, use ) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    },
    inventoryPage: async({page}, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
    checkoutPage: async({ page}, use ) =>{
        const checkoutPage = new CheckoutPage(page);
        await use( checkoutPage );
    },
    cartPage: async({page}, use) => {
        const cartPage = new CartPage(page);
        await use( cartPage );
    }

});




