import { useEffect, useRef } from "react";

export default function EditMessage({ data, index, id, socket }) {
  const editRef = useRef(data.message);

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

  return (
    <>
      <div className="message">
        <p className="message-username">{data.user}</p>
        <form onSubmit={onInputSubmit}>
          <input ref={editRef} type="text" defaultValue={data.message}></input>
          <button onClick={onButtonClick}>Submit</button>
        </form>
      </div>
    </>
  );
}
