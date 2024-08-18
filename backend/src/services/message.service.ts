import { desc, eq } from "drizzle-orm";
import { PostgresDb } from "../db";

export default class MessageService {
    private readonly db: typeof PostgresDb;
    private readonly messages;

    /**
     * Creates an instance of MessageService.
     * @param db - The database instance to be used.
     * @param messages - The messages table or collection reference.
     */
    constructor(db: typeof PostgresDb, messages: any) {
        this.db = db;
        this.messages = messages;
    }

    /**
     * Retrieves all messages for a given chat ID.
     * @param chatId - The ID of the chat whose messages are to be retrieved.
     * @returns A Promise that resolves to an array of message objects. 
     *          If no messages are found, resolves to an empty array.
     */
    async getAll(chatId: string): Promise<any[]> {
        try {
            return await this.db
                .select()
                .from(this.messages)
                .where(eq(this.messages.chatId, chatId))
                .execute();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves the last message for a given chat ID.
     * @param chatId - The ID of the chat whose last message is to be retrieved.
     * @returns A Promise that resolves to an array containing the last message object if found.
     *          If no messages are found, resolves to an empty array.
     */
    async getLast(chatId: string): Promise<any[]> {
        try {
            return await this.db
                .select()
                .from(this.messages)
                .where(eq(this.messages.chatId, chatId))
                .orderBy(desc(this.messages.createdAt))
                .limit(1)
                .execute();
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new message entry in the database.
     * @param message - The message object to be inserted into the database.
     * @returns A Promise that resolves to the result of the insertion operation.
     * @throws Will throw an error if a duplicate entry is attempted to be created.
     */
    async createNew(message: any): Promise<any> {
        try {
            return await this.db.insert(this.messages).values(message).execute();
        } catch (error: any) {
            throw error;
        }
    }
}
