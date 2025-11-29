"use client";
import ChatMenu from "@/components/after-logging/ChatMenu";
import LoggingMenu from "@/components/login-menu/LoggingMenu";
import useSocket from "@/hooks/useSocket";
import { useEffect, useState } from "react";

export default function Main() {
  const socket = useSocket();

  const [loginMenu, setLoginMenu] = useState(true); //przełączanie się miedzy login a register (moze usune)
  const [user, setUser] = useState(""); //login urzytkownika
  const [chats, setChats] = useState([]); //lista {id, name}
  const [currentChat, setCurrentChat] = useState(""); //id chatu
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const username = localStorage.getItem("username");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(username);
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.current.on("loginSuccess", (username) => {
      localStorage.setItem("username", username);
      setUser(username);
    });

    socket.current.on("chatRoomSuccess", ({ name, id }) => {
      setChats((prev) => [...prev, { id: id, name: name }]);
    });

    socket.current.on("error", (msg) => {
      alert(msg);
    });

    socket.current.on("chatMsg", (msgs) => {
      setMessages(msgs);
    });
  }, [socket]);

  return (
    <>
      {!user ? (
        <div id="menu">
          <LoggingMenu
            loginMenu={loginMenu}
            setLoginMenu={setLoginMenu}
            socket={socket}
          />
        </div>
      ) : (
        <ChatMenu
          user={user}
          currentChat={currentChat}
          setCurrentChat={setCurrentChat}
          socket={socket}
          messages={messages}
          chats={chats}
        />
      )}
    </>
  );
}
