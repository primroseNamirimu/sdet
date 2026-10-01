import {Locator, test as base} from "@playwright/test"

import { LoginPage } from "../pages/login";

type Fixtures = {
    loginPage: LoginPage;
    
};

export const test = base.extend<Fixtures>({
    loginPage: async( {page }, use ) => {
        const loginPage = new LoginPage(page);

        await use(loginPage);
    }
});

// export const test = base.extend<Fixtures>({
//     loginPage: async ( {page}, use ) => {
//         const loginPage = new LoginPage(page);
//
//         await use(loginPage);
//     }
// });

// export const test = base.extend<Fixtures>({
//     account: [async( { page }, use) =>{
//         const loginPage = new LoginPage(page);
//
//         await use(loginPage)
//     }, { scope: 'worker'}]
// })



