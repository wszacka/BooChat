export default function ChatList({ chatList, setCurrentChat }) {
  return (
    <>
      {chatList.map((chat, i) => {
        return (
          <div key={i} className="chat" onClick={() => setCurrentChat(chat)}>
            {chat}
          </div>
        );
      })}
    </>
  );
}
