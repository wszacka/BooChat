import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import { useMessageTime } from "@/contexts/MessageTime";
import UserAccount from "./UserAccount";

export default function ChatMenu({
  user,
  currentChat,
  setCurrentChat,
  socket,
  messages,
  chats,
  setUser,
}) {
  const { showTime, changeTime } = useMessageTime();
  function newChatButton() {
    const newChat = prompt("Enter name for your chat");
    socket.current.emit("createChatroom", newChat);
  }
  return (
    <>
      <div id="chat-menu">
        <div id="chat-list">
          <div>
            <div id="logo">
              <Image src={ghost} alt={"ghost icon"} width={30} />
              <p>BooChat</p>
            </div>
            <div id="buttons-chat">
              <button id="new-chat" onClick={newChatButton}>
                New Chat
              </button>
              <button
                onClick={changeTime}
                disabled={messages.length === 0 ? true : false}
                id="time-button"
              >
                {showTime ? "Hide Time" : "Show Time"}
              </button>
            </div>
          </div>
          <ChatList
            chats={chats}
            setCurrentChat={setCurrentChat}
            messages={messages}
            socket={socket}
          />
          <UserAccount user={user} setUser={setUser} socket={socket} />
        </div>
        <div id="chatroom">
          {currentChat.id ? (
            <CurrentChat
              socket={socket}
              user={user}
              currentChat={currentChat}
              messages={messages}
            />
          ) : (
            <p className="chat-info">Select Chat to start messaging</p>
          )}
        </div>
      </div>
    </>
  );
}
