import { NextFunction, Response } from "express";
import { userService } from "../services";
import ApiError from "../utils/ApiError";

/**
 * Retrieves all users from the database.
 * 
 * This controller fetches and returns a list of all users. It directly passes the data retrieved from the `userService` to the response middleware.
 * 
 * @param req - The incoming request object. This is not used directly in this function.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if an error occurs during user retrieval.
 */
export const getAllUsers = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await userService.getAll();
        req.responseData = users;
        next(req);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves the currently authenticated user.
 * 
 * This controller fetches and returns the details of the user who is currently authenticated. It requires the user's ID from the request object. If the user is not found, it throws an appropriate `ApiError`.
 * 
 * @param req - The incoming request object. It should include `user` property containing the authenticated user's ID.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if the user is not found.
 */
export const getReqUser = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.user;
        const user = await userService.getOne(id);
        if (!user) throw new ApiError(404, "User not found");
        req.responseData = user;
        next(req);
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves users based on a search query.
 * 
 * This controller processes search queries to find users matching the given search term. It retrieves the search term from the query parameters and returns the matching users. If an error occurs during the search, it will be passed to the next middleware.
 * 
 * @param req - The incoming request object. It should include `query` property containing the `search` term.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if an error occurs during user search.
 */
export const getQueryUsers = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const { search } = req.query;
        const users = await userService.getUsersByQuery(search);
        req.responseData = users;
        next(req);
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new user in the database.
 * 
 * This controller handles user creation by accepting user details from the request body and passing them to the `userService` for insertion into the database. It returns the newly created user data. If an error occurs during user creation, it will be passed to the next middleware.
 * 
 * @param req - The incoming request object. It should include `body` containing the details of the new user.
 * @param res - The outgoing response object. This is not used directly in this function as the response is handled by the `response` middleware.
 * @param next - The next middleware function in the stack. If an error occurs, it is passed to the next middleware (error handling).
 * 
 * @throws {ApiError} - Throws an `ApiError` if an error occurs during user creation.
 */
export const createNewUser = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const newUser = await userService.createNew(req.body);
        req.responseData = newUser;
        next(req);
    } catch (error) {
        next(error);
    }
};
