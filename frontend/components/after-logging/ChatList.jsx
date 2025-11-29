export default function ChatList({ chats, setCurrentChat }) {
  return (
    <>
      {chats.map((chat, i) => {
        return (
          <div key={i} className="chat" onClick={() => setCurrentChat(chat.id)}>
            {chat.name}
          </div>
        );
      })}
    </>
  );
}
