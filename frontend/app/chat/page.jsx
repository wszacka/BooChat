import ChatMenu from "@/components/after-logging/ChatMenu";
import "@/styles/chat.css";
import "@/styles/currentChat.css";

export default function ChatPage() {
  return (
    <ChatMenu>
      <p className="chat-info">Select Chat to start a conversation</p>
    </ChatMenu>
  );
}
