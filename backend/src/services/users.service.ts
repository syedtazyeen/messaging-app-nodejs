import { eq, like, or } from "drizzle-orm";
import { PostgresDb } from "../db";

export default class UserService {
    private readonly db: typeof PostgresDb;
    private readonly users;

    /**
     * Creates an instance of UserService.
     * @param db - The database instance to be used.
     * @param users - The users table or collection reference.
     */
    constructor(db: typeof PostgresDb, users: any) {
        this.db = db;
        this.users = users;
    }

    /**
     * Retrieves a single user by their ID.
     * @param id - The ID of the user to retrieve.
     * @returns A Promise that resolves to the user object if found, or undefined if not found.
     */
    async getOne(id: string): Promise<any> {
        try {
            const user = await this.db
                .select()
                .from(this.users)
                .where(eq(this.users.id, id))
                .limit(1)
                .execute();
            return user[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves a single user by their email.
     * @param email - The email of the user to retrieve.
     * @returns A Promise that resolves to the user object if found, or undefined if not found.
     */
    async getOneByEmail(email: string): Promise<any> {
        try {
            const user = await this.db
                .select()
                .from(this.users)
                .where(eq(this.users.email, email))
                .limit(1)
                .execute();
            return user[0];
        } catch (error) {
            throw error;
        }
    }

    /**
     * Searches for users by a query string that matches their username or email.
     * @param query - The search query string.
     * @returns A Promise that resolves to an array of user objects that match the query.
     *          If no users are found, resolves to an empty array.
     */
    async getUsersByQuery(query: string): Promise<any[]> {
        try {
            const searchPattern = `%${query.trim().toLowerCase()}%`;
            const users = await this.db
                .select()
                .from(this.users)
                .where(
                    or(
                        like(this.users.username, searchPattern),
                        like(this.users.email, searchPattern),
                    )
                )
                .limit(20)
                .execute();
            console.log(users);
            return users;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Retrieves all users from the database.
     * @returns A Promise that resolves to an array of all user objects.
     */
    async getAll(): Promise<any[]> {
        try {
            return await this.db.select().from(this.users);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Creates a new user entry in the database.
     * @param user - The user object to be inserted into the database.
     * @returns A Promise that resolves to the result of the insertion operation.
     * @throws Will throw an error if a duplicate entry is attempted to be created.
     */
    async createNew(user: any): Promise<any> {
        try {
            return await this.db.insert(this.users).values(user);
        } catch (error: any) {
            if (error.code === "23505") {
                throw new Error("Duplicate entry");
            }
            throw error;
        }
    }
}
