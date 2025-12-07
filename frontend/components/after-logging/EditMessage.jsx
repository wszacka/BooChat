import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";

export default function EditMessage({ data, index, id, socket }) {
  const editRef = useRef(data.message);
  const [emojiShown, setEmojiShown] = useState(false);

  useEffect(() => {
    editRef.current.focus();
  }, []);

  function onInputSubmit(e) {
    e.preventDefault();
    const msg = editRef.current.value;
    if (msg !== data.message) {
      socket.current.emit("edit-msg", {
        index: index,
        chat_id: id,
        msg: msg,
      });
    }
  }

  function onButtonClick() {
    const msg = editRef.current.value;
    if (msg !== data.message) {
      socket.current.emit("edit-msg", {
        index: index,
        chat_id: id,
        msg: msg,
      });
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
        <form onSubmit={onInputSubmit} className="message" id="edit-div">
          <input ref={editRef} type="text" defaultValue={data.message}></input>
          <button
            type="button"
            id="edit-emoji-button"
            onClick={() => setEmojiShown((prev) => !prev)}
          >
            🙂
          </button>
          <button onClick={onButtonClick}>Submit</button>
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
      </div>
    </>
  );
}
