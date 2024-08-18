import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import { User } from '../types';
import { userService } from '../services';

// Configuration for the JWT strategy
const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || '123',
};

// Set up the JWT strategy for Passport
passport.use(new JwtStrategy(options, async (jwtPayload, done) => {
    try {
        const user: User | null = await userService.getOne(jwtPayload.id);
        console.log('in passport');
        
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}));

/**
 * Initializes Passport middleware.
 * 
 * This middleware initializes Passport for use in the application. It sets up Passport to be used in the request handling chain, allowing the use of Passport strategies for authentication.
 * 
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack. It is called to pass control to the next middleware after initializing Passport.
 */
export const initializePassport = (req: Request, res: Response, next: NextFunction) => {
    passport.initialize();
    next();
};

export default passport;
