import "@/styles/modal.css";

import { useToast } from "@/hooks/useToast";
import sendIcon from "@/images/send.svg";
import cancel from "@/images/cancel-edit.svg";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useApp } from "@/contexts/AppContext";

export default function InputModal({}) {
  const { socket, setShowChatInput, setLeavingChatInput, leavingChatInput } =
    useApp();
  const { addToast } = useToast();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function onSubmit(e) {
    const newChat = inputRef.current.value;
    e.preventDefault();
    socket.current.emit("createChatroom", newChat);
    if (newChat !== null && newChat.trim() !== "") {
      addToast(`Created new chat: ${newChat}`, "success");
      inputRef.current.value = "";
    } else {
      addToast("You can't have chat with blank name", "warning");
    }
  }

  return createPortal(
    <>
      <div id="modal-overlay">
        <div id="modal-content" className={leavingChatInput ? "exit" : ""}>
          <form onSubmit={onSubmit} id="modal-form">
            <h4>Enter name for your chat</h4>
            <div id="buttons">
              <input ref={inputRef} placeholder="Aa..."></input>
              <button onClick={onSubmit}>
                <Image src={sendIcon} alt={"submit"} width={20}></Image>
              </button>
            </div>
          </form>
          <button
            onClick={() => {
              setLeavingChatInput(true);
              setTimeout(() => setShowChatInput(false), 200);
            }}
          >
            <Image src={cancel} alt={"submit"} width={20}></Image>
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
}
