import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = 8000;
const bielik_api = process.env.OLLAMA_API_BASE;
const bielik_name = process.env.BIELIK_MODEL_NAME;

const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
app.use(express.json());
app.use(cors());

const answers = ["OK", "Nice!", "WOW!", "Super", "Hi"];

const users = {}; //socket.id: login
const chatrooms = {}; //chat_id: nazwa

const messages = {}; // chat_id: [tutaj potem {main_user: jako kto,message: tresc msg,user: od kogo, godzina: timestamp(hh:mm), under_edit: boolean, last_edited: czas kiedy ostatnio byla edycja}]
//API
async function generate(zdanie) {
  const prompt = `Jesteś moim kumplem. Odpowiadasz w żartobliwy sposób z emotikonami.
Pytanie: ${zdanie}`;
  const response = await fetch(`${bielik_api}/api/generate`, {
    method: "POST",
    body: JSON.stringify({
      model: bielik_name,
      prompt: prompt,
      stream: false,
      temperature: 0.7,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const data = await response.json();
  return data;
}

app.get("/api/:zdanie", async (req, res) => {
  try {
    const zdanie = req.params.zdanie;
    if (!zdanie) return res.status(400).json({ error: "Brak zdania" });
    const odp = await generate(zdanie);
    const randomNumber = Math.floor(Math.random() * 4) + 1;
    setTimeout(() => {
      res.status(200).json({ answer: odp.response });
    }, randomNumber * 1000);
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
    if (roomName !== null && roomName.trim() !== "") {
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
      under_edit: false,
      last_edited: false,
    });
    io.to(chat_id).emit("chatMsg", messages);
  });
  socket.on("click-edit", ({ index, chat_id }) => {
    messages[chat_id].map((data, i) => {
      if (i === index) {
        data.under_edit = true;
      }
    });
    socket.emit("chatMsg", messages);
  });

  socket.on("edit-msg", ({ index, chat_id, msg }) => {
    const now = new Date();
    const minutes =
      now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
    const hour = now.getHours() < 10 ? `0${now.getHours()}` : now.getHours();
    messages[chat_id].map((data, i) => {
      if (i === index) {
        data.message = msg;
        data.under_edit = false;
        data.last_edited = `${hour}:${minutes}`;
      }
    });
    console.log("Edited message to:", msg);
    socket.emit("chatMsg", messages);
  });

  socket.on("deleteChat", ({ chat_id }) => {
    delete chatrooms[chat_id];
    socket.emit("leaveChat", chat_id);
  });

  socket.on("logout", (user) => {
    delete users[socket.id];
    console.log(`User ${user} logged out`);
    socket.emit("logout-user");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
    delete users[socket.id];
    socket.emit("logout-user");
  });
});

server.listen(PORT, () => console.log("Server is running on port:", PORT));
