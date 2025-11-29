import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";

const server = createServer();
const io = new Server(server, { cors: { origin: "*" } });

const users = {}; //socket.id: login
const chatrooms = {}; //chat_id: nazwa

const messages = {}; // chat_id: [tutaj potem {message: tresc msg,user: od kogo }]

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

  socket.on("createChatroom", ({ user, roomName }) => {
    const chat_id = uuidv4();
    chatrooms[chat_id] = roomName;
    messages[chat_id] = [];
    socket.join(chat_id);
    console.log("Created chatroom with id:", chat_id, "and name:", roomName);
    socket.emit("chatRoomSuccess", { name: roomName, id: chat_id });
    messages[chat_id].push({
      message: `${user} created the chatroom`,
      user: "System",
    });
    io.to(chat_id).emit("chatMsg", messages);
  });

  socket.on("regularMessage", ({ user, chat_id, msg }) => {
    messages[chat_id].push({
      message: msg,
      user: user,
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
