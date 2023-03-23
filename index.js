const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:4200",
      "https://ant-music.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    console.log("file: index.js:23 ~ socket.on ~ join_room:", data);

    socket.join(data);
  });

  socket.on("send_message", (data) => {
    console.log("file: index.js:29 ~ socket.on ~ send_message:", data);

    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("register", (data) => {
    socket.to(data.room).emit("signup", data);
  });

  socket.on("upload", (data) => {
    socket.to(data.room).emit("new_song", data);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
