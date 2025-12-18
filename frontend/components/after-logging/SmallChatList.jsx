import { useApp } from "@/contexts/AppContext";
import { useMessageTime } from "@/hooks/useMessageTime";
import { useToast } from "@/hooks/useToast";
import { useParams, useRouter } from "next/navigation";

export default function SmallChatList() {
  const { chatId } = useParams();
  const { chats, setMessages, socket } = useApp();
  const router = useRouter();
  const { addToast } = useToast();

  return (
    <>
      <div id="all-chats">
        {chats.map((chat, i) => {
          return (
            <div
              key={i}
              className="chat chatsmall"
              onClick={() => router.push(`/chat/${chat.id}/${chat.name}`)}
            >
              <p>{chat.name}</p>
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
