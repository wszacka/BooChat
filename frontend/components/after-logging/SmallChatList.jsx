import { useMessageTime } from "@/hooks/useMessageTime";
import { useToast } from "@/hooks/useToast";

export default function SmallChatList({
  chats,
  currentChat,
  setCurrentChat,
  socket,
}) {
  const { showTime } = useMessageTime();
  const { addToast } = useToast();

  return (
    <>
      <div id="all-chats">
        {chats.map((chat, i) => {
          return (
            <div
              key={i}
              className="chat chatsmall"
              onClick={() => setCurrentChat({ id: chat.id, name: chat.name })}
            >
              <p>{chat.name}</p>
              <button
                className="delete-chat"
                onClick={(e) => {
                  e.stopPropagation();
                  socket.current.emit("deleteChat", chat.id);
                  if (currentChat.id == chat.id) {
                    setCurrentChat({});
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
