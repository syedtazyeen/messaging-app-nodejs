import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core';
import chats from './chats';

/**
 * Table definition for `messages` using Drizzle ORM.
 * 
 * @constant {object} messages - Drizzle ORM table definition for `messages`.
 * 
 * @property {uuid} id - Primary key of the message, automatically generated as a UUID.
 * @property {uuid} chatId - UUID of the associated chat. References the `id` field in the `chats` table and cannot be null.
 * @property {uuid} userId - UUID of the user who sent the message. Cannot be null.
 * @property {text} text - The content of the message. Cannot be null.
 * @property {text} file - Optional text field for storing file references or URLs.
 * @property {integer} status - Status of the message, defaulting to 0 (e.g., 0 for sent, 1 for delivered, 2 for seen). Cannot be null.
 * @property {timestamp} createdAt - Timestamp of when the message was created
 */
const messages = pgTable(
    "messages",
    {
        id: uuid("id").primaryKey().defaultRandom(),
        chatId: uuid("chatId")
            .references(() => chats.id)
            .notNull(),
        userId: uuid("userId").notNull(),
        text: text("text").notNull(),
        file: text('file'),
        status: integer("status").default(0).notNull(),
        createdAt: timestamp("createdAt").defaultNow().notNull()
    }
);

export default messages;
