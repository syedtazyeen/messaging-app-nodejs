import express from 'express';
import userRouter from './user.router';
import { response } from '../middlewares';
import authRouter from './auth.router';
import { requireAuth } from '../middlewares/auth.middleware';
import chatRouter from './chats.router';

const router = express.Router();

/**
 * Routes related to chat functionality.
 * @route /chat
 * @middleware requireAuth - Ensures that only authenticated users can access chat routes.
 */
router.use('/chat', requireAuth, chatRouter);

/**
 * Routes related to user functionality.
 * @route /user
 * @middleware requireAuth - Ensures that only authenticated users can access user routes.
 */
router.use('/user', requireAuth, userRouter);

/**
 * Routes related to authentication.
 * @route /auth
 */
router.use('/auth', authRouter);

/**
 * Middleware to handle responses.
 * @middleware response - A custom middleware for handling responses in a standardized way.
 */
router.use(response);

export default router;
