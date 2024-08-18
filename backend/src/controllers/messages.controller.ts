import { NextFunction, Response } from "express";
import { messageService } from "../services";
import ApiError from "../utils/ApiError";

/**
 * Creates a new message for the currently authenticated user.
 * 
 * This controller handles the creation of a new message. It requires the authenticated user's ID and the message text from the request body. If either of these is missing, or if an error occurs during message creation, an appropriate `ApiError` is thrown.
 * 
 * @param req - The incoming request object. It should include `user` property containing the authenticated user's ID and `body` containing the `text` of the message.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if the user ID or message text is missing, or if an error occurs during message creation.
 */
export const createMessage = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;
        const { text } = req.body;
        if (!id || !text) throw new ApiError(403, "Forbidden");
        
        const message = {
            userId: id,
            text: text
        };
        
        const result = await messageService.createNew(message);
        req.responseData = result;
        next(req);
    } catch (error) {
        next(error);
    }
};
