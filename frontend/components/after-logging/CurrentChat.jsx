import Image from "next/image";
import sendIcon from "@/images/send.svg";
import { useEffect, useRef } from "react";

export default function CurrentChat({ socket, user, chatid, messages }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function onInputSubmit(e) {
    e.preventDefault();
    const msg = inputRef.current.value;
    if (msg !== "") {
      socket.current.emit("regularMessage", {
        user: user,
        chat_id: chatid,
        msg: msg,
      });
      inputRef.current.value = "";
    }
  }

  function onButtonClick() {
    const msg = inputRef.current.value;
    if (msg !== "") {
      socket.current.emit("regularMessage", {
        user: user,
        chat_id: chatid,
        msg: msg,
      });
      inputRef.current.value = "";
    }
  }
  return (
    <>
      <div>
        <div>
          {messages[chatid]?.map((data, i) => {
            return (
              <p key={i}>
                {data.user}: {data.message}
              </p>
            );
          })}
        </div>
        <form onSubmit={onInputSubmit}>
          <input ref={inputRef} type="text"></input>
          <button onClick={onButtonClick}>
            <Image src={sendIcon} alt="sendIc" width={20} />
          </button>
        </form>
      </div>
    </>
  );
}
