import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

/**
 * Creates and initializes a Socket.IO server.
 * This function creates a new instance of the Socket.IO server and attaches it to an existing HTTP server. It also configures CORS settings to allow connections from any origin.
 * @param server - The HTTP server to which the Socket.IO server will be attached.
 * @returns {SocketIOServer} - The created Socket.IO server instance.
 */
export function createSocketIO(server: http.Server): SocketIOServer {
  return new SocketIOServer(server, {
    cors: {
      origin: "*"
    }
  });
}
