import express from 'express';
import { createNewChat, getUserChats } from '../controllers/chats.controller';

const chatRouter = express.Router();

/**
 * Route to retrieve all chats for a specific user.
 * @route GET /all.
 */
chatRouter.get('/all', getUserChats);

/**
 * Route to create a new chat.
 * @route POST /create
 */
chatRouter.post('/create', createNewChat);

export default chatRouter;
