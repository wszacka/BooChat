import "@/styles/currentChat.css";
import { useMessageTime } from "@/hooks/useMessageTime";
import RegularMessage from "./RegularMessage";
import EditMessage from "./EditMessage";
import InputCurrChat from "./InputCurrChat";
import { useMemo, useRef } from "react";
import { useApp } from "@/contexts/AppContext";
import { useToast } from "@/hooks/useToast";

export default function CurrentChat({ chatId, name }) {
  const { socket, user, messages } = useApp();
  const { addToast } = useToast();
  const { showTime } = useMessageTime();
  const inputRef = useRef(null);

  const renderedMessages = useMemo(() => {
    const chatMessages = messages[chatId];
    if (!chatMessages || chatMessages.length === 0) {
      return <p className="chat-info">No messages yet</p>;
    }
    return chatMessages.map((data) => {
      return (
        <div
          key={data.msg_id}
          className={data.user === user ? "user-message" : ""}
        >
          {data.under_edit ? (
            <EditMessage
              data={data}
              id={chatId}
              socket={socket}
              addToast={addToast}
            />
          ) : (
            <RegularMessage
              data={data}
              chatId={chatId}
              user={user}
              socket={socket}
              showTime={showTime}
            />
          )}
        </div>
      );
    });
  }, [messages, chatId, user, socket, showTime, addToast]);

  return (
    <>
      <div>
        <div id="all-messages">{renderedMessages}</div>
        <InputCurrChat inputRef={inputRef} chatId={chatId} name={name} />
      </div>
    </>
  );
}
