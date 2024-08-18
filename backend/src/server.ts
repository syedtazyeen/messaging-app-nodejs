import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import http from 'http';
import { initializePassport } from './config/passport';
import { createSocketIO } from './socket';
import { handleConnection } from './socket/connection';
import router from './routes';

// Load environment variables
config();

// Create and configure the Express application
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(initializePassport);
app.use(router);

// Create an HTTP server for both the REST API and WebSocket
const server = http.createServer(app);

// Initialize WebSocket server and handle connections
const io = createSocketIO(server);
io.on('connection', handleConnection);

// Define ports
const API_PORT = process.env.API_PORT || 3000;
const SOCKET_PORT = process.env.SOCKET_PORT || 3001;

// Start the REST API server
app.listen(API_PORT, () => {
  console.log(`REST API server running on http://localhost:${API_PORT}`);
});

// Start the WebSocket server
server.listen(SOCKET_PORT, () => {
  console.log(`WebSocket server running on http://localhost:${SOCKET_PORT}`);
});
