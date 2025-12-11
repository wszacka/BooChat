import { useMessageTime } from "@/contexts/MessageTime";

export default function ChatList({ chats, setCurrentChat, messages, socket }) {
  const { showTime, changeTime } = useMessageTime();
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
              onClick={() => setCurrentChat({ id: chat.id, name: chat.name })}
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
