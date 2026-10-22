import {User, users} from "../test-data/users";

import {LoginPage} from "../pages/login";

function firstAny(items: any[]): any {
    return items[0];
}

const x = firstAny([users.standard_user]);
console.log(x.usernmae);


function first<T>(items: T[]): T {
    return items[0];
}

const u = first([users.standard_user]);
//console.log(u.usernmae);
console.log(u.username);

 async function loginAs< T extends User > (loginPage: LoginPage, user: T){
    await loginPage.login(user.username,user.password);
}

