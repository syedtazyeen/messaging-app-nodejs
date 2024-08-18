import { PostgresDb } from '../db';
import { chats, messages, users } from '../db/schema';
import ChatService from './chat.service';
import MessageService from './message.service';
import UserService from "./users.service";

/**
 * Service instances for interacting with the database.
 * 
 * @constant {UserService} userService - Service for user-related operations, 
 * @constant {ChatService} chatService - Service for chat-related operations,
 * @constant {MessageService} messageService - Service for message-related operations,
 */
export const userService = new UserService(PostgresDb, users);
export const chatService = new ChatService(PostgresDb, chats);
export const messageService = new MessageService(PostgresDb, messages);
