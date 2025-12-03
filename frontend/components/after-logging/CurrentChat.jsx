import "@/styles/currentChat.css";
import Image from "next/image";
import sendIcon from "@/images/send.svg";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageTime } from "@/contexts/MessageTime";

export default function CurrentChat({ socket, user, currentChat, messages }) {
  const inputRef = useRef(null);
  const [showPicker, setShowPicker] = useState(false);
  const { showTime, changeTime } = useMessageTime();

  function onEmojiClick(emoji) {
    if (inputRef.current) {
      inputRef.current.value += emoji.emoji;

      inputRef.current.focus();
    }
  }

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
      setShowPicker(false);
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
      setShowPicker(false);
      botAnswer();
    }
  }
  return (
    <>
      <div>
        <div id="all-messages">
          {messages[currentChat.id] ? (
            messages[currentChat.id].map((data, i) => {
              return (
                <div
                  key={i}
                  className={data.user === user ? "user-message" : ""}
                >
                  <div className="message">
                    <p className="message-username">{data.user}</p>
                    {data.message}
                    {showTime && <span className="time">({data.time})</span>}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="chat-info">No messages yet</p>
          )}
        </div>

        <form onSubmit={onInputSubmit} id="input-message">
          <input ref={inputRef} type="text"></input>
          <button
            type="button"
            id="emoji-button"
            onClick={() => setShowPicker((prev) => !prev)}
          >
            🙂
          </button>
          <button id="send-button" onClick={onButtonClick}>
            <Image id="send-img" src={sendIcon} alt="sendIc" width={20} />
          </button>
          {showPicker && (
            <div>
              <EmojiPicker
                emojiStyle="native"
                onEmojiClick={onEmojiClick}
                style={{ position: "absolute", bottom: "30px", right: "20px" }}
              />
            </div>
          )}
        </form>
      </div>
    </>
  );
}
