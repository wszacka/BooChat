import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import sendIcon from "@/images/send.svg";
import emoji from "@/images/emoji-icon.svg";
import EmojiPicker from "emoji-picker-react";
import { useToast } from "@/hooks/useToast";

export default function InputCurrChat({ inputRef, socket, user, currentChat }) {
  const { addToast } = useToast();
  const [showPicker, setShowPicker] = useState(false);
  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  function onEmojiClick(emoji) {
    if (inputRef.current) {
      inputRef.current.value += emoji.emoji;

      inputRef.current.focus();
    }
  }

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

  // async function botAnswer(msg) {
  //   try {
  //     const res = await fetch(
  //       `http://localhost:8000/api/${encodeURIComponent(msg)}`
  //     );
  //     const data = await res.json();
  //     if (res.ok) {
  //       socket.current.emit("regularMessage", {
  //         user: currentChat.name,
  //         chat_id: currentChat.id,
  //         msg: data.answer,
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Błąd fetch:", error);
  //   }
  // }

  function onSubmit(e) {
    e.preventDefault();
    const msg = inputRef.current.value;
    const c_msg = msg.trim();
    if (c_msg !== "") {
      socket.current.emit("regularMessage", {
        user: user,
        chat_id: currentChat.id,
        msg: c_msg,
      });
      botAnswer(c_msg);
      inputRef.current.value = "";
      setShowPicker(false);
    } else {
      addToast("You can't send blank message", "warning");
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} id="input-message">
        <input
          ref={inputRef}
          type="text"
          placeholder="Write a message..."
        ></input>
        <button
          type="button"
          id="emoji-button"
          onClick={() => setShowPicker((prev) => !prev)}
        >
          <Image src={emoji} alt="emoji" width={20} />
        </button>
        <button id="send-button" onClick={onSubmit}>
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
    </>
  );
}
