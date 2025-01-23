import { io } from "socket.io-client";

// Replace this URL with the URL of your server
const SOCKET_SERVER_URL = "http://localhost:3001";

// Create the socket connection
const socket = io(SOCKET_SERVER_URL, {
    transports: ["websocket"],
    withCredentials: false,
  });

export default socket;
