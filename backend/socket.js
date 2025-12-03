import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(cors());

const answers = ["OK", "Nice!", "WOW!", "Super", "Hi"];

const users = {}; //socket.id: login
const chatrooms = {}; //chat_id: nazwa

const messages = {}; // chat_id: [tutaj potem {message: tresc msg,user: od kogo, godzina: timestamp(hh:mm) }]
//API
app.get("/api", (req, res) => {
  try {
    const randomIndex = Math.floor(Math.random() * answers.length);
    const answr = answers[randomIndex];
    setTimeout(() => {
      res.status(200).json({ answer: answr });
    }, 2000);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//socket
io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("login", (username) => {
    if (!username) {
      socket.emit("error", "You have to write your login");
      return;
    }

    users[socket.id] = username;
    console.log("Logged in as:", username);
    socket.emit("loginSuccess", username);
  });

  socket.on("createChatroom", (roomName) => {
    if (roomName === "") {
      socket.emit("error", "Write with who you want to talk");
    } else {
      const chat_id = uuidv4();
      chatrooms[chat_id] = roomName;
      messages[chat_id] = [];
      socket.join(chat_id);
      console.log("Created chatroom with id:", chat_id, "and name:", roomName);
      socket.emit("chatRoomSuccess", { name: roomName, id: chat_id });
    }
  });

  socket.on("regularMessage", ({ user, chat_id, msg }) => {
    const now = new Date();
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    messages[chat_id].push({
      message: msg,
      user: user,
      time: `${hour}:${minutes}`,
    });
    io.to(chat_id).emit("chatMsg", messages);
  });

  //   socket.on("deleteChat", ({ user, chat_id }) => {
  //     members[socket.id] = members[socket.id].filter((id) => id !== chat_id);
  //     socket.leave(chat_id);
  //     messages[chat_id].push({
  //       message: `${user} has left the chatroom`,
  //       user: "System",
  //     });
  //     io.to(chat_id).emit("chatMsg", messages);
  //   });

  //   socket.on("logout", (user) => {
  //     delete users[socket.id];
  //     console.log(`User ${user} logged out`);

  //     members[socket.id]?.forEach((chatID) => {
  //       messages[chatID].push({
  //         message: `${user} has left the chatroom`,
  //         user: "System",
  //       });
  //       io.to(chatID).emit("chatMsg", messages);
  //     });
  //     delete members[socket.id];
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("User disconnected: ", socket.id);
  //     const username = users[socket.id];
  //     delete users[socket.id];
  //     members[socket.id]?.forEach((chatID) => {
  //       messages[chatID].push({
  //         message: `${username} has left the chatroom`,
  //         user: "System",
  //       });
  //       io.to(chatID).emit("chatMsg", messages);
  //     });
  //     delete members[socket.id];
  //   });
});

const PORT = 8000;
server.listen(PORT, () => console.log("Server is running on port:", PORT));
