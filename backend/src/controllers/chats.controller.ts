import { NextFunction, Response } from "express";
import { chatService, userService } from "../services";
import ApiError from "../utils/ApiError";

/**
 * Retrieves all chats for the currently authenticated user.
 * 
 * This controller fetches the list of chats for the authenticated user and enriches each chat with contact information. If the user ID is not found or if a contact cannot be retrieved, it throws an appropriate `ApiError`.
 * 
 * @param req - The incoming request object. It should include `user` property containing the authenticated user's ID.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if the user ID is not found, if a contact is not found, or if other errors occur during data retrieval.
 */
export const getUserChats = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;
        if (!id) throw new ApiError(403, "Forbidden");

        const chats = await chatService.getUserChats(id);

        const modifiedChats = await Promise.all(chats.map(async (chat: any) => {
            const contactId = chat.user1 === id ? chat.user2 : chat.user1;
            const contact = await userService.getOne(contactId);
            if (!contact) throw new ApiError(404, 'Contact not found');

            return {
                id: chat.id,
                contactId: contactId,
                contactName: contact.username,
                lastMessage: chat.lastMessage || null,
            };
        }));
        
        req.responseData = modifiedChats;
        next(req);
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new chat between the currently authenticated user and a specified contact.
 * 
 * This controller processes the creation of a new chat entry. It requires the authenticated user's ID and the contact's ID from the request body. If an error occurs during chat creation, it will be passed to the next middleware.
 * 
 * @param req - The incoming request object. It should include `user` property containing the authenticated user's ID and `body` containing the `contactId`.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if there are errors during the chat creation process.
 */
export const createNewChat = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;
        const { contactId } = req.body;
        const newChat = {
            user1: id,
            user2: contactId
        };
        const result = await chatService.createNew(newChat);
        req.responseData = result;
        next(req);
    } catch (error) {
        next(error);
    }
};
