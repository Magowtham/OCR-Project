const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    // origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected : ${socket.handshake.address}`);

  socket.on("message", (message) => {
    console.log(message);
    socket.send("hey i got the message");
  });
});

server.listen(5000, () => {
  console.log("Server started at port : 5000");
});