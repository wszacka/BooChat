import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";

export default function ChatMenu({
  user,
  currentChat,
  setCurrentChat,
  socket,
  messages,
  chats,
}) {
  function newChatButton() {
    const newChat = prompt("Enter name for your chat");
    socket.current.emit("createChatroom", newChat);
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
            <ChatList
              chats={chats}
              setCurrentChat={setCurrentChat}
              messages={messages}
            />
          </div>
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
