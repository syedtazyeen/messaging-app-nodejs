import { NextFunction, Response } from "express";
import { userService } from "../services";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import bcrypt from "bcrypt";

/**
 * Handles user login requests.
 * 
 * This controller validates the user's credentials by checking the provided email and password.
 * 
 * @param req - The incoming request object containing `email` and `password` in the body.
 * @param res - The outgoing response object. This is not used 
 * @param next - The next middleware function in the stack.
 * 
 * @throws {ApiError} - Throws an `ApiError` if the user is not found or if the credentials are invalid.
 */
export const login = async (req: any, res: Response, next: NextFunction) => {
    console.log(req.body);

    try {
        const { email, password } = req.body;

        const user = await userService.getOneByEmail(email);

        if (!user) {
            throw new ApiError(404, "Cannot find an account for this email");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new ApiError(401, "Invalid credentials");
        }

        const token = jwt.sign(
            { id: user.id, username: user.email },
            process.env.JWT_SECRET || "123",
            { expiresIn: "2d" }
        );
        req.responseData = {
            token: token,
            user: user,
        };
        next(req);
    } catch (error) {
        next(error);
    }
};

/**
 * Handles user signup requests.
 * 
 * This controller processes new user registrations by checking if the user already exists.
 * 
 * @param req - The incoming request object containing `username`, `email`, and `password` in the body.
 * @param res - The outgoing response object. This is not used directly
 * @param next - The next middleware function in the stack. If an error occurs
 * 
 * @throws {ApiError} - Throws an `ApiError` if the user already exists or if there is an error creating the user.
 */
export const signup = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await userService.getOneByEmail(email);
        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };
        const user = await userService.createNew(newUser);
        if (!user) throw new ApiError(411, 'Error creating user');
        next(req);
    } catch (error) {
        next(error);
    }
};
