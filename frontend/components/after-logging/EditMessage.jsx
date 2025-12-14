import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import emoji from "@/images/emoji-icon.svg";
import cancel from "@/images/cancel-edit.svg";
import Image from "next/image";
import { useToast } from "@/hooks/useToast";

export default function EditMessage({ data, index, id, socket }) {
  const { addToast } = useToast();
  const editRef = useRef(data.message);
  const [emojiShown, setEmojiShown] = useState(false);

  useEffect(() => {
    editRef.current.focus();
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const msg = editRef.current.value;
    const c_msg = msg.trim();
    if (msg !== data.message && c_msg !== "") {
      socket.current.emit("edit-msg", {
        index: index,
        chat_id: id,
        msg: c_msg,
      });
    } else if (msg === data.message) {
      addToast("You can't edit to the same message", "warning");
    } else {
      addToast("You can't edit to blank message", "warning");
    }
  }

  function onEmojiClick(emoji) {
    if (editRef.current) {
      editRef.current.value += emoji.emoji;
      editRef.current.focus();
    }
  }

  return (
    <>
      <div className="message-div">
        <form onSubmit={onSubmit} className="message" id="edit-div">
          <input ref={editRef} type="text" defaultValue={data.message}></input>
          <button
            type="button"
            id="edit-emoji-button"
            onClick={() => setEmojiShown((prev) => !prev)}
          >
            <Image src={emoji} alt="emoji" width={20} />
          </button>
          <div>
            <button onClick={onSubmit}>Submit</button>
          </div>

          {emojiShown && (
            <div>
              <EmojiPicker
                emojiStyle="native"
                onEmojiClick={onEmojiClick}
                style={{
                  position: "absolute",
                  right: "20px",
                  bottom: "100px",
                  zIndex: 100,
                }}
                height={350}
              />
            </div>
          )}
        </form>
        <button
          onClick={() =>
            socket.current.emit("cancel-edit", {
              index: index,
              chat_id: id,
            })
          }
          id="cancel"
        >
          <Image src={cancel} alt="cancel" width={15}></Image>
        </button>
      </div>
    </>
  );
}
