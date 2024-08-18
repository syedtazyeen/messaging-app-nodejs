import { Socket } from 'socket.io';
import { chatService, messageService } from '../services';
import { put } from "@vercel/blob";

/**
 * Handles 'join-chat' event for the socket.
 * Retrieves and emits chat history.
 * @param socket - The socket instance.
 * @param chatId - The chat ID to join.
 * @param userId - The user ID joining the chat.
 */
const handleJoinChat = async (socket: Socket, chatId: string, userId: string) => {
    try {
        socket.join(chatId);
        console.log(`User ${socket.id} joined chat ${chatId}`);

        const history = await messageService.getAll(chatId);
        socket.emit('receive-history', history);
    } catch (error) {
        console.error(`Error joining chat ${chatId} for user ${userId}:`, error);
        socket.emit('error', { message: 'Failed to join chat.' });
    }
};


/**
 * Handles 'send-message' event for the socket.
 * Stores and emits the message to the chat.
 * @param socket - The socket instance.
 * @param chatId - The chat ID where the message is sent.
 * @param userId - The user ID sending the message.
 * @param messageData - The message data including text and optional file.
 * @returns The message object that was sent.
 */
const handleSendMessage = async (socket: Socket, chatId: string, userId: string, messageData: any) => {
    try {
        console.log(`Message from ${userId} in chat ${chatId}: ${messageData.text}`);

        const message: any = {
            chatId,
            userId,
            text: messageData.text,
            status: 0,
        };

        if (messageData.file) {
            const { url } = await put(`${chatId}/blob.jpeg`, messageData.file, { access: 'public', token: process.env.BLOB_READ_WRITE_TOKEN });
            message.file = url;
            console.log(url);
        }

        const result = await messageService.createNew(message);
        await chatService.updateTimestamp(chatId);
        const finalMessage = { ...message, id: result.id };

        // Emit the message to all clients in the chat, including the sender
        socket.to(chatId).emit('receive-message', finalMessage);

        // Optionally, emit the message back to the sender as well
        socket.emit('receive-message', finalMessage);

        return finalMessage;
    } catch (error) {
        console.error(`Error sending message in chat ${chatId} from user ${userId}:`, error);
        socket.emit('error', { message: 'Failed to send message.' });
        throw error;
    }
};



/**
 * Handles 'start-typing' event for the socket.
 * Emits a typing status to the chat.
 * @param socket - The socket instance.
 * @param chatId - The chat ID where typing is occurring.
 * @param userId - The user ID who is typing.
 */
const handleStartTyping = (socket: Socket, chatId: string, userId: string) => {
    try {
        socket.to(chatId).emit('user-typing', { userId, chatId });
        socket.emit('user-typing', { userId, chatId });
        console.log(`User ${userId} started typing in chat ${chatId}`);
    } catch (error) {
        console.error(`Error processing typing event in chat ${chatId} from user ${userId}:`, error);
    }
};

/**
 * Handles 'stop-typing' event for the socket.
 * Emits a stop typing status to the chat.
 * @param socket - The socket instance.
 * @param chatId - The chat ID where typing stopped.
 * @param userId - The user ID who stopped typing.
 */
const handleStopTyping = (socket: Socket, chatId: string, userId: string) => {
    try {
        socket.to(chatId).emit('user-stopped-typing', { userId, chatId });
        socket.emit('user-stopped-typing', { userId, chatId });
        console.log(`User ${userId} stopped typing in chat ${chatId}`);
    } catch (error) {
        console.error(`Error processing stop typing event in chat ${chatId} from user ${userId}:`, error);
    }
};

/**
 * Attaches socket event handlers to a given socket.
 * @param socket - The socket instance to attach handlers to.
 */
export function handleSocketEvents(socket: Socket): void {
    socket.on('join-chat', (chatId: string, userId: string) => handleJoinChat(socket, chatId, userId));
    socket.on('send-message', (data: { chatId: string, userId: string, messageData: any }) => handleSendMessage(socket, data.chatId, data.userId, data.messageData));
    socket.on('start-typing', (data: { chatId: string, userId: string }) => handleStartTyping(socket, data.chatId, data.userId));
    socket.on('stop-typing', (data: { chatId: string, userId: string }) => handleStopTyping(socket, data.chatId, data.userId));

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
}
