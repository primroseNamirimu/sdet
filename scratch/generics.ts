import {users} from "../test-data/users";

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