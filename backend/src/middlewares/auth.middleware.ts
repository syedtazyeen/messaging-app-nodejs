import passport from '../config/passport';
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to authenticate requests using Passport's JWT strategy.
 * 
 * This middleware uses Passport's JWT strategy to authenticate requests. It checks the validity of the JSON Web Token (JWT) provided in the request and attaches the authenticated user to the request object if the token is valid.
 * 
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack. 
 */
export const authenticate = passport.authenticate('jwt', { session: false });

/**
 * Middleware to enforce authentication on routes.
 * 
 * This middleware checks if the request is authenticated by calling the `authenticate` middleware. It logs the user information and then invokes the `authenticate` middleware to perform the actual authentication.
 * 
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack.
 * 
 * @throws {Error} - If authentication fails, control is passed to Passport's error handling.
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    authenticate(req, res, next);
};
