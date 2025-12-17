import Image from "next/image";
import ChatList from "./ChatList";

import ghost from "@/images/ghost-icon.svg";
import UserAccount from "./UserAccount";
import { useMessageTime } from "@/hooks/useMessageTime";
import { useApp } from "@/contexts/AppContext";

export default function NormalMenu({ timeClick }) {
  const { user, socket, setUser, setShowChatInput, setLeavingChatInput } =
    useApp();
  const { showTime } = useMessageTime();

  return (
    <>
      <div>
        <div id="logo">
          <Image src={ghost} alt={"ghost icon"} width={30} />
          <p>BooChat</p>
        </div>
        <div id="buttons-chat">
          <button
            id="new-chat"
            onClick={() => {
              setShowChatInput(true);
              setLeavingChatInput(false);
            }}
          >
            New Chat
          </button>
          <button onClick={timeClick} id="time-button">
            {showTime ? "Hide Time" : "Show Time"}
          </button>
        </div>
      </div>
      <ChatList />
      <UserAccount showUserDiv={false} />
    </>
  );
}
