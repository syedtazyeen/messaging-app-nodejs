import { pgTable, uuid, jsonb, unique, timestamp } from 'drizzle-orm/pg-core';
import users from './users';

/**
 * Table definition for `chats` using Drizzle ORM.
 * 
 * @constant {object} chats - Drizzle ORM table definition for `chats`.
 * @property {uuid} id - Primary key of the chat, automatically generated as a UUID.
 * @property {uuid} user1 - UUID of the first user in the chat. References the `id` field in the `users` table and cannot be null.
 * @property {uuid} user2 - UUID of the second user in the chat. References the `id` field in the `users` table and cannot be null.
 * @property {timestamp} createdAt
 * @property {timestamp} updatedAt
 */
const chats = pgTable(
    "chats",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        user1: uuid("user1")
            .references(() => users.id)
            .notNull(),
        user2: uuid("user2")
            .references(() => users.id)
            .notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull(),
        updatedAt: timestamp("updatedAt").defaultNow().notNull()
    },
    (table) => ({
        unique: unique('unique_user_pair').on(table.user1, table.user2)
    })
);

export default chats;
