import { useMessageTime } from "@/contexts/MessageTime";

export default function ChatList({ chats, setCurrentChat, messages }) {
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
              <p>{chat.name}</p>
              {last_msg ? (
                <>
                  <p>
                    {last_msg.user}: {last_msg.message}
                  </p>
                  {showTime && (
                    <span className="time-chat">({last_msg.time})</span>
                  )}
                </>
              ) : (
                <p>No messages yet</p>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
