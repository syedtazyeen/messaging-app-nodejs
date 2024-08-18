import { Socket } from 'socket.io';
import { handleSocketEvents } from './room';

/**
 * Handles a new WebSocket connection.
 * This function is called when a new WebSocket connection is established.
 * @param socket - The `Socket` object representing the WebSocket connection. 
 * @returns void - This function does not return a value.
 */
export function handleConnection(socket: Socket): void {
  console.log(`User connected: ${socket.id}`);

  // Handle joining and messages
  handleSocketEvents(socket);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
}
