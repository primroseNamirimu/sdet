import {Locator, Page} from "@playwright/test";
import {checkoutDetails} from "../test-data/checkout";


export class CheckoutPage {
     firstname:Locator;
     lastname:Locator;
     postalCode:Locator;
     continueBtn:Locator;
     checkoutButton:Locator;
     cancelBtn:Locator;
     continueShopping:Locator;
     errorMsg:Locator;

    constructor(page:Page) {
        this.firstname = page.getByTestId("firstName");
        this.lastname = page.getByTestId("lastName");
        this.postalCode = page.getByTestId("postalCode");
        this.continueBtn = page.getByTestId("continue");
        this.checkoutButton = page.getByTestId("checkout");
        this.cancelBtn = page.getByTestId("cancel");
        this.continueShopping = page.getByTestId("continue-shopping");
        this.errorMsg = page.getByTestId("error");

    }

    async fillCheckoutForm(details : Omit<checkoutDetails, "expectedError">) {
        if (details.firstname != null ) {
            await this.firstname.fill(details.firstname);
        }
        if (details.lastname != null ) {
            await this.lastname.fill(details.lastname)
        }
        if (details.postalCode != null ) {
            await this.postalCode.fill(details.postalCode)
        }

        await this.continueBtn.click();
    }
}