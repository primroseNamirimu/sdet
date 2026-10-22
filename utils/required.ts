import {User, users} from "../test-data/users";
import {LoginPage} from "../pages/login";

export function required<T>( value: T | undefined, message: string):T{
    if (value === undefined || value === null) {
         throw new Error(message);
    } else {
        return value
    }
}



