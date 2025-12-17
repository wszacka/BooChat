import { useState } from "react";
import SmallChatList from "./SmallChatList";
import SmallUserAccount from "./SmallUserAccount";
import { useMessageTime } from "@/hooks/useMessageTime";
import { useApp } from "@/contexts/AppContext";

export default function SmallMenu({ timeClick }) {
  const {
    user,
    chats,
    socket,
    currentChat,
    setCurrentChat,
    setUser,
    setShowChatInput,
    setLeavingChatInput,
  } = useApp();
  const [showUserDiv, setShowUserDiv] = useState(false);
  const { showTime } = useMessageTime();

  return (
    <>
      <div>
        <div id="buttons-chat" className="chatsmall">
          <button
            id="new-chat"
            onClick={() => {
              setShowChatInput(true);
              setLeavingChatInput(false);
            }}
          >
            +
          </button>
          <button onClick={timeClick} id="time-button">
            {showTime ? "Hide Time" : "Show Time"}
          </button>
        </div>
      </div>
      <SmallChatList />
      <div id="userShow">
        <button onClick={() => setShowUserDiv((prev) => !prev)}>
          User Details
        </button>
        {showUserDiv && <SmallUserAccount showUserDiv={showUserDiv} />}
      </div>
    </>
  );
}
