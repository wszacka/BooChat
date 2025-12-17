import "@/styles/currentChat.css";
import { useMessageTime } from "@/hooks/useMessageTime";
import RegularMessage from "./RegularMessage";
import EditMessage from "./EditMessage";
import InputCurrChat from "./InputCurrChat";
import { useRef } from "react";
import { useApp } from "@/contexts/AppContext";

export default function CurrentChat({ chatId, name }) {
  const { socket, user, messages } = useApp();
  const inputRef = useRef(null);

  return (
    <>
      <div>
        <div id="all-messages">
          {messages[chatId] ? (
            messages[chatId].map((data, i) => {
              return (
                <div
                  key={i}
                  className={data.user === user ? "user-message" : ""}
                >
                  {data.under_edit ? (
                    <EditMessage
                      data={data}
                      index={i}
                      id={chatId}
                      socket={socket}
                    />
                  ) : (
                    <RegularMessage
                      data={data}
                      i={i}
                      chatId={chatId}
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

        <InputCurrChat inputRef={inputRef} chatId={chatId} name={name} />
      </div>
    </>
  );
}
