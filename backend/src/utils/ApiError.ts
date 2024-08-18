/**
 * Custom error class for handling API errors.
 * This class extends the built-in `Error` class to provide additional properties 
 * @extends Error
 * @property {string} message - A descriptive error message.
 * @property {number} status - The HTTP status code associated with the error.
 */
export default class ApiError extends Error {

    readonly message: string;
    readonly status: number;

    /**
     * Creates an instance of ApiError.
     * @param {number} status - The HTTP status code associated with the error.
     * @param {string} message - A descriptive error message.
     */
    constructor(status: number, message: string) {
        super(message);
        this.message = message;
        this.status = status;
    }
}
