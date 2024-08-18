import express from 'express';
import { login, signup } from '../controllers/auth.controller';

const authRouter = express.Router();

/**
 * Route to handle user login.
 * @route POST /login
 */
authRouter.post('/login', login);

/**
 * Route to handle user signup.
 * @route POST /signup.
 */
authRouter.post('/signup', signup);

export default authRouter;
