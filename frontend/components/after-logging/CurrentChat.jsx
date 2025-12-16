import "@/styles/currentChat.css";
import { useMessageTime } from "@/hooks/useMessageTime";
import RegularMessage from "./RegularMessage";
import EditMessage from "./EditMessage";
import InputCurrChat from "./InputCurrChat";
import { useRef } from "react";

export default function CurrentChat({ socket, user, currentChat, messages }) {
  const inputRef = useRef(null);
  const { showTime } = useMessageTime();

  return (
    <>
      <div>
        <div id="all-messages">
          {messages[currentChat.id] ? (
            messages[currentChat.id].map((data, i) => {
              return (
                <div
                  key={i}
                  className={data.user === user ? "user-message" : ""}
                >
                  {data.under_edit ? (
                    <EditMessage
                      data={data}
                      index={i}
                      id={currentChat.id}
                      socket={socket}
                    />
                  ) : (
                    <RegularMessage
                      data={data}
                      i={i}
                      currentChat={currentChat}
                      showTime={showTime}
                      socket={socket}
                      user={user}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p className="chat-info">No messages yet</p>
          )}
        </div>

        <InputCurrChat
          inputRef={inputRef}
          socket={socket}
          user={user}
          currentChat={currentChat}
        />
      </div>
    </>
  );
}
