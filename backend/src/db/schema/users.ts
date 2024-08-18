import { pgTable, uuid, text } from 'drizzle-orm/pg-core';

/**
 * Table definition for `users` using Drizzle ORM.
 * 
 * @constant {object} users - Drizzle ORM table definition for `users`.
 * 
 * @property {uuid} id - Primary key of the user, automatically generated as a UUID.
 * @property {text} username - The username of the user. This field is optional.
 * @property {text} email - The email address of the user. This field must be unique.
 * @property {text} password - The password of the user, stored as text.
 */
const users = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        username: text("username"),
        email: text("email").unique(),
        password: text("password")
    }
);

export default users;
