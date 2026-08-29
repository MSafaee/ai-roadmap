import type { User } from "./user.js";

export function filterByFirstName (users: User[], firstname: string): User[] {
    
    return users.filter(user => user.firstname === firstname);
}

export function filterByLastName (users: User[], lastname: string): User[] {

    return users.filter(user => user.lastname === lastname);
}

export function filterByAge (users: User[], min: number, max: number): User[] {

    return users.filter(user => user.age <= max && user.age >= min);
}

export function filterByAccount (users: User[], premium: boolean): User[] {

    return users.filter(user => user.premium === premium);
}

export function filterByPurchasedProduct (users: User[], productId: number): User[] {

    return users.filter(user => user.purchased.includes(productId));
}