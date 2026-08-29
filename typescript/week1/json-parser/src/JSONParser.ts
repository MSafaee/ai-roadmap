import fs from "node:fs";
import type { User } from "./user.js";

export function loadUsers(filePath: string): User[] {

    const json = fs.readFileSync(filePath, "utf-8");
    const data: unknown = JSON.parse(json);

    if (!Array.isArray(data))  throw new Error("invalid file format");

    const users: User[] = [];

    for (const [index, user] of data.entries()) {
        if (!isUser(user))  throw new Error("Invalid user format at index " + index);
        users.push(user);
    }

    return users;
}

function isUser(value: unknown): value is User {

    if (typeof value !== "object" || value === null)  return false;

    const user = value as Record<string, unknown>;

    return (
        typeof user.id === "number" &&
        typeof user.firstname === "string" &&
        typeof user.lastname === "string" &&
        typeof user.age === "number" &&
        typeof user.premium === "boolean" &&
        Array.isArray(user.purchased) &&
        user.purchased.every(
            id => typeof id === "number"
        )
    );
}