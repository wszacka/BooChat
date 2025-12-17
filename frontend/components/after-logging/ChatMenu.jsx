import "@/styles/chat.css";
import ghost from "@/images/ghost-icon.svg";
import Image from "next/image";
import ChatList from "./ChatList";
import CurrentChat from "./CurrentChat";
import { useMessageTime } from "@/hooks/useMessageTime";
import UserAccount from "./UserAccount";
import { useToast } from "@/hooks/useToast";
import { memo, useEffect, useRef, useState } from "react";
import SmallChatList from "./SmallChatList";
import SmallUserAccount from "./SmallUserAccount";

const MemoUserAccount = memo(UserAccount, (prev, next) => {
  return prev.user.id === next.user.id;
});

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

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  const [showUserDiv, setShowUserDiv] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
        <div ref={divRef} id="chat-list">
          {width > 60 ? (
            <>
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
              <MemoUserAccount
                user={user}
                setUser={setUser}
                socket={socket}
                showUserDiv={false}
              />
            </>
          ) : (
            <>
              <div>
                <div id="buttons-chat" className="chatsmall">
                  <button
                    id="new-chat"
                    onClick={() => {
                      setShowChatInput(true);
                      setLeavingChatInput(false);
                    }}
                  >
                    +
                  </button>
                  <button onClick={timeClick} id="time-button">
                    {showTime ? "Hide Time" : "Show Time"}
                  </button>
                </div>
              </div>
              <SmallChatList
                chats={chats}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                socket={socket}
              />
              <div id="userShow">
                <button onClick={() => setShowUserDiv((prev) => !prev)}>
                  User Details
                </button>
                {showUserDiv && (
                  <SmallUserAccount
                    user={user}
                    setUser={setUser}
                    socket={socket}
                    showUserDiv={showUserDiv}
                  />
                )}
              </div>
            </>
          )}
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
