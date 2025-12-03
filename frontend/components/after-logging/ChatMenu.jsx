import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import Status from "./Status";
import avatar from "@/images/trzask.jpg";
import { useMessageTime } from "@/contexts/MessageTime";

export default function ChatMenu({
  user,
  currentChat,
  setCurrentChat,
  socket,
  messages,
  chats,
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
          <div id="user-div">
            <div id="img-and-user">
              <Image
                src={avatar}
                alt="trzask"
                width={30}
                height={30}
                id="user-img"
              />
              {user}
            </div>

            <Status />
          </div>

          <ChatList
            chats={chats}
            setCurrentChat={setCurrentChat}
            messages={messages}
          />
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
