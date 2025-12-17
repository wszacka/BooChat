"use client";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { useMessageTime } from "@/hooks/useMessageTime";
import { useToast } from "@/hooks/useToast";

export default function ChatList({ params }) {
  const { chatId, name } = useParams();
  const router = useRouter();
  const { chats, messages, socket, setMessages } = useApp();
  const { showTime } = useMessageTime();
  const { addToast } = useToast();

  return (
    <>
      <div id="all-chats">
        {chats.map((chat, i) => {
          const chat_msgs = messages[chat.id] || "";
          const last_msg = chat_msgs[chat_msgs.length - 1] || "";
          return (
            <div
              key={i}
              className="chat"
              onClick={() => router.push(`/chat/${chat.id}/${chat.name}`)}
            >
              <p>
                {chat.name}{" "}
                {showTime && last_msg.time && (
                  <span className="time-chat">({last_msg.time})</span>
                )}
              </p>
              {last_msg ? (
                <>
                  <p className="last-msg">
                    {last_msg.user}: {last_msg.message}
                  </p>
                </>
              ) : (
                <p>No messages yet</p>
              )}
              <button
                className="delete-chat"
                onClick={(e) => {
                  e.stopPropagation();
                  socket.current.emit("deleteChat", chat.id);
                  if (chatId == chat.id) {
                    router.replace("/chat");
                    setMessages((prev) => {
                      const newMessages = { ...prev };
                      delete newMessages[chat.id];
                      return newMessages;
                    });
                  }
                  addToast(`You deleted chat: ${chat.name}`, "info");
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
