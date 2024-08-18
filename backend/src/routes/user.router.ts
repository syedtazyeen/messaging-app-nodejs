import express from 'express';
import { getQueryUsers, getReqUser } from '../controllers/user.controller';

const userRouter = express.Router();

/**
 * Route to search for users based on a query parameter.
 * @route GET /
 */
userRouter.get('/', getQueryUsers);

/**
 * Route to retrieve the currently authenticated user's information.
 * @route GET /me
 */
userRouter.get('/me', getReqUser);

export default userRouter;
