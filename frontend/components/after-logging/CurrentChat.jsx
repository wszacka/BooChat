import "@/styles/currentChat.css";
import Image from "next/image";
import sendIcon from "@/images/send.svg";
import { useEffect, useRef } from "react";

export default function CurrentChat({ socket, user, currentChat, messages }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  async function botAnswer() {
    const res = await fetch("http://localhost:8000/api");
    const data = await res.json();
    if (res.ok) {
      socket.current.emit("regularMessage", {
        user: currentChat.name,
        chat_id: currentChat.id,
        msg: data.answer,
      });
    }
  }

  function onInputSubmit(e) {
    e.preventDefault();
    const msg = inputRef.current.value;
    if (msg !== "") {
      socket.current.emit("regularMessage", {
        user: user,
        chat_id: currentChat.id,
        msg: msg,
      });
      inputRef.current.value = "";
      botAnswer();
    }
  }

  function onButtonClick() {
    const msg = inputRef.current.value;
    if (msg !== "") {
      socket.current.emit("regularMessage", {
        user: user,
        chat_id: currentChat.id,
        msg: msg,
      });
      inputRef.current.value = "";
      botAnswer();
    }
  }
  return (
    <>
      <div>
        <div>
          {messages[currentChat.id] ? (
            messages[currentChat.id].map((data, i) => {
              return (
                <p key={i}>
                  {data.user}: {data.message}
                </p>
              );
            })
          ) : (
            <p className="chat-info">No messages yet</p>
          )}
        </div>
        <form onSubmit={onInputSubmit} id="input-message">
          <input ref={inputRef} type="text"></input>
          <button onClick={onButtonClick}>
            <Image src={sendIcon} alt="sendIc" width={20} />
          </button>
        </form>
      </div>
    </>
  );
}
