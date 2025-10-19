const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (or specify frontend URL)
    methods: ["GET", "POST"],
  },
});

// When a new client connects
io.on("connection", (socket) => {
  console.log("✅ A user connected:", socket.id);

  // Send welcome message to that user
  socket.emit("server-message", {
    type: "connection",
    message: "Welcome! You are connected to the Socket.IO server 🎉",
  });

  // Listen for messages from client
  socket.on("send-message", (data) => {
    console.log("📩 Message from client:", data);

    // 1️⃣ Reply to sender
    socket.emit("server-reply", {
      type: "server-reply",
      message: `Server received your message: "${data.message}"`,
      timestamp: new Date().toLocaleTimeString(),
    });

    // 2️⃣ Broadcast to all other users
    socket.broadcast.emit("broadcast", {
      type: "broadcast",
      message: `${data.sender}: ${data.message}`,
      timestamp: new Date().toLocaleTimeString(),
    });
  });

  // When user disconnects
  socket.on("disconnect", () => {
    console.log("❌ A user disconnected:", socket.id);
  });
});

// Simple express route
app.get("/", (req, res) => {
  res.send("Socket.IO server is running 🚀");
});

// Start server
const PORT = 8080;
server.listen(PORT, () => {
  console.log(`✅ HTTP server running on http://localhost:${PORT}`);
  console.log(`⚡ Socket.IO server running on ws://localhost:${PORT}`);
});
