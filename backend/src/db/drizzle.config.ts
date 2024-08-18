import { defineConfig } from 'drizzle-kit';

const url = process.env.POSTGRES_URL;
if (!url) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

/**
 * Configuration for Drizzle ORM with PostgreSQL.
 * @constant {string} url - The PostgreSQL connection URL from environment variables.
 * @throws {Error} - Throws an error if the `POSTGRES_URL` environment variable is not set.
 * @returns {object} - Configuration object for Drizzle ORM.
 */
export default defineConfig({
    schema: "./src/db/schema",
    dialect: 'postgresql',
    dbCredentials: {
        url // Connection URL 
    }
});
