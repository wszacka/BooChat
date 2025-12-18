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

    socket.current.on("chatMsg", ({ id, msg }) => {
      setMessages((prev) => {
        const chatMessages = prev[id] || [];
        return {
          ...prev,
          [id]: [...chatMessages, msg],
        };
      });
    });

    socket.current.on("edit-msg-click", ({ chatId, msg_id }) => {
      setMessages((prev) => {
        const chatMessages = prev[chatId] || [];
        return {
          ...prev,
          [chatId]: chatMessages.map((msg) =>
            msg.msg_id === msg_id ? { ...msg, under_edit: true } : msg
          ),
        };
      });
    });

    socket.current.on("edit-msg-unclick", ({ chatId, msg_id }) => {
      setMessages((prev) => {
        const chatMessages = prev[chatId] || [];
        return {
          ...prev,
          [chatId]: chatMessages.map((msg) =>
            msg.msg_id === msg_id ? { ...msg, under_edit: false } : msg
          ),
        };
      });
    });

    socket.current.on(
      "edit-msg-finalize",
      ({ chatId, msg_id, new_msg, last_edited }) => {
        setMessages((prev) => {
          const chatMessages = prev[chatId] || [];
          return {
            ...prev,
            [chatId]: chatMessages.map((msg) =>
              msg.msg_id === msg_id
                ? {
                    ...msg,
                    message: new_msg,
                    under_edit: false,
                    last_edited: last_edited,
                  }
                : msg
            ),
          };
        });
      }
    );

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
