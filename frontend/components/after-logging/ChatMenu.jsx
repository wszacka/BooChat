import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import { useMessageTime } from "@/hooks/useMessageTime";
import UserAccount from "./UserAccount";
import { useToast } from "@/hooks/useToast";

export default function ChatMenu({
  setLeavingChatInput,
  setShowChatInput,
  user,
  currentChat,
  setCurrentChat,
  socket,
  messages,
  chats,
  setUser,
}) {
  const { showTime, changeTime } = useMessageTime();
  const { addToast } = useToast();

  function timeClick() {
    if (messages.length === 0) {
      addToast("You have to write a message to show time", "warning");
    } else {
      changeTime();
    }
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
              <button
                id="new-chat"
                onClick={() => {
                  setShowChatInput(true);
                  setLeavingChatInput(false);
                }}
              >
                New Chat
              </button>
              <button onClick={timeClick} id="time-button">
                {showTime ? "Hide Time" : "Show Time"}
              </button>
            </div>
          </div>
          <ChatList
            chats={chats}
            currentChat={currentChat}
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
