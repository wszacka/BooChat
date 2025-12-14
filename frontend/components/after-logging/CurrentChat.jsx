import "@/styles/currentChat.css";
import { useMessageTime } from "@/hooks/useMessageTime";
import RegularMessage from "./RegularMessage";
import EditMessage from "./EditMessage";
import InputCurrChat from "./InputCurrChat";
import { useEffect, useRef, useState } from "react";

export default function CurrentChat({ socket, user, currentChat, messages }) {
  const inputRef = useRef(null);
  const { showTime } = useMessageTime();

  // const [visibleCount, setVisibleCount] = useState(20); // na start renderujemy 20 wiadomości
  // const allMessagesRef = useRef(null); //obsluga scrolla do góry

  // useEffect(() => {
  //   function handleScroll() {
  //     const container = allMessagesRef.current;
  //     if (!container) return;

  //     if (container.scrollTop === 0) {
  //       // przewinięto na górę, pokaż 20 kolejnych starszych wiadomości
  //       setVisibleCount((prev) =>
  //         Math.min(prev + 20, messages[currentChat.id].length)
  //       );
  //     }
  //   }
  //   console.log(visibleCount);

  //   const container = allMessagesRef.current;
  //   if (!container) return;

  //   container.addEventListener("scroll", handleScroll);
  //   return () => container.removeEventListener("scroll", handleScroll);
  // }, [messages, currentChat.id]);

  return (
    <>
      <div>
        <div id="all-messages">
          {messages[currentChat.id] ? (
            messages[currentChat.id]
              // .slice(-visibleCount) // renderujemy tylko ostatnie `visibleCount` wiadomości
              .map((data, i) => {
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
