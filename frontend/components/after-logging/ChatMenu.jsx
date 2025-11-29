import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import { useState } from "react";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";

export default function ChatMenu({ user }) {
  const [currentChat, setCurrentChat] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState([]);
  function newChatButton() {
    const newChat = prompt("Enter name for your chat");
    setChatList((prev) => [...prev, newChat]);
    setMessages((prev) => [...prev, { name: newChat, chatMessages: [] }]);
  }
  return (
    <>
      <div id="chat-menu">
        <div id="chat-list">
          <div id="logo">
            <Image src={ghost} alt={"ghost icon"} width={30} />
            <p>BooChat</p>
          </div>
          <button onClick={newChatButton}>New Chat</button>
          <div id="user-div">
            <div id="user-img"></div>
            {user}
          </div>
          <div id="all-chats">
            <ChatList chatList={chatList} setCurrentChat={setCurrentChat} />
          </div>
        </div>
        <div id="chatroom">
          {currentChat ? (
            <CurrentChat />
          ) : (
            <p>Select Chat to start messaging</p>
          )}
        </div>
      </div>
    </>
  );
}
