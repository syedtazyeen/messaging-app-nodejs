import { asc, desc, eq, or, sql } from "drizzle-orm";
import { PostgresDb } from "../db";
import { messageService } from ".";

export default class ChatService {
    private readonly db: typeof PostgresDb;
    private readonly chats;

    /**
     * Creates an instance of ChatService.
     * @param db - The database instance to be used.
     * @param chats - The chats table or collection reference.
     */
    constructor(db: typeof PostgresDb, chats: any) {
        this.db = db;
        this.chats = chats;
    }

    /**
     * Retrieves a single chat by its ID.
     * @param id - The ID of the chat to retrieve.
     * @returns A Promise that resolves to the chat object if found, or null if not found.
     */
    async getOne(id: string): Promise<any> {
        const chat = await this.db
            .select()
            .from(this.chats)
            .where(eq(this.chats.id, id))
            .limit(1)
            .execute();

        return chat.length > 0 ? chat[0] : null;
    }

    /**
     * Retrieves all chats associated with a given user ID.
     * @param userId - The ID of the user whose chats are to be retrieved.
     * @returns A Promise that resolves to an array of chat objects, each including the last message if available.
     *          If no chats are found, resolves to an empty array.
     */
    async getUserChats(userId: string): Promise<any[]> {
        try {
            const chats = await this.db
                .select({
                    id: this.chats.id,
                    user1: this.chats.user1,
                    user2: this.chats.user2,
                    updatedAt: this.chats.updatedAt,
                })
                .from(this.chats)
                .where(or(eq(this.chats.user1, userId), eq(this.chats.user2, userId)))
                .orderBy(desc(this.chats.updatedAt))
                .limit(20)
                .execute();

            const chatsWithLastMessage = await Promise.all(
                chats.map(async (chat) => {
                    const lastMessage = await messageService.getLast(chat.id);
                    return {
                        ...chat,
                        lastMessage: lastMessage.length > 0 ? lastMessage[0] : null,
                    };
                })
            );

            return chatsWithLastMessage.length > 0 ? chatsWithLastMessage : [];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new chat entry in the database.
     * @param chat - The chat object to be inserted into the database.
     * @returns A Promise that resolves to the result of the insertion operation.
     * @throws Will throw an error if a duplicate entry is attempted to be created.
     */
    async createNew(chat: any): Promise<any> {
        try {
            return await this.db.insert(this.chats).values(chat);
        } catch (error: any) {
            if (error.code === "23505") {
                throw new Error("Duplicate entry");
            }
            throw error;
        }
    }

    /**
     * Updates the timestamp of a chat entry in the database.
     * @returns A Promise that resolves to the result of the update operation.
     * @throws Will throw an error if the update operation fails.
     */
    async updateTimestamp(chatId: string): Promise<void> {
        console.log(new Date().toUTCString());

        try {
            await this.db.update(this.chats)
                .set({ updatedAt: new Date()})
                .where(eq(this.chats.id, chatId))
                .execute();
        } catch (error) {
            throw error;
        }
    }
}
