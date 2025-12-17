import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import useSocket from "./useSocket";

export default function useAppState() {
  const socket = useSocket();
  const { addToast } = useToast();

  const [user, setUser] = useState("");
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [leavingChatInput, setLeavingChatInput] = useState(false);
  const [showChatInput, setShowChatInput] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    setUser(username);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.current.on("loginSuccess", (username) => {
      localStorage.setItem("username", username);
      setUser(username);
    });

    socket.current.on("chatRoomSuccess", ({ name, id, msgs }) => {
      setLeavingChatInput(true);
      setTimeout(() => setShowChatInput(false), 300);
      setChats((prev) => [...prev, { id, name }]);
      setMessages(msgs);
    });

    socket.current.on("leaveChat", (chat_id) => {
      setChats((prev) => prev.filter((chat) => chat.id !== chat_id));
    });

    socket.current.on("error", (msg) => {
      addToast(`error: ${msg}`, "error");
    });

    socket.current.on("chatMsg", (msgs) => {
      setMessages(msgs);
    });

    socket.current.on("logout-user", () => {
      setChats([]);
      setMessages([]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return {
    socket,
    user,
    chats,
    messages,
    setMessages,
    setUser,
    setChats,
    loading,
    leavingChatInput,
    setLeavingChatInput,
    showChatInput,
    setShowChatInput,
  };
}
