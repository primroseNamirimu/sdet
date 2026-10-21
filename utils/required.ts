
export function required<T>( value: T | undefined, message: string):T{
    if (value === undefined || value === null) {
         throw new Error(message);
    } else {
        return value
    }
}
