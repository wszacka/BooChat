import "@/styles/currentChat.css";
import Image from "next/image";
import sendIcon from "@/images/send.svg";
import emoji from "@/images/emoji-icon.svg";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { useMessageTime } from "@/contexts/MessageTime";
import RegularMessage from "./RegularMessage";
import EditMessage from "./EditMessage";

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

  // async function botAnswer(msg) {
  //   const res = await fetch(`/api/${msg}`);
  //   const data = await res.json();
  //   if (res.ok) {
  //     socket.current.emit("regularMessage", {
  //       user: currentChat.name,
  //       chat_id: currentChat.id,
  //       msg: data.answer,
  //     });
  //   }
  // }

  async function botAnswer(msg) {
    try {
      const res = await fetch(
        `http://localhost:8000/api/${encodeURIComponent(msg)}`
      );
      const data = await res.json();
      if (res.ok) {
        socket.current.emit("regularMessage", {
          user: currentChat.name,
          chat_id: currentChat.id,
          msg: data.answer,
        });
      }
    } catch (error) {
      console.error("Błąd fetch:", error);
    }
  }

  function onInputSubmit(e) {
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
    }
  }

  function onButtonClick() {
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
                  {data.under_edit ? (
                    <EditMessage
                      data={data}
                      index={i}
                      id={currentChat.id}
                      socket={socket}
                    />
                  ) : (
                    <RegularMessage
                      data={data}
                      i={i}
                      currentChat={currentChat}
                      showTime={showTime}
                      socket={socket}
                      user={user}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <p className="chat-info">No messages yet</p>
          )}
        </div>

        <form onSubmit={onInputSubmit} id="input-message">
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
