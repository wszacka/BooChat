import edit from "@/images/edit.svg";
import Image from "next/image";
import React from "react";
function RegularMessage({ data, chatId, user, socket, showTime }) {
  console.log("RegularMessage render"); // czy memo dziala
  return (
    <>
      <div className="message-div">
        <p className="message-username">{data.user}</p>
        <p className="message">
          {data.message}{" "}
          {data.last_edited && <span className="edit-msg">edited</span>}
        </p>
        {showTime && (
          <p className="time">
            {data.time}{" "}
            {data.last_edited && <span>(last edited: {data.last_edited})</span>}
          </p>
        )}
      </div>
      {data.user === user && (
        <button
          className="edit-button"
          onClick={() =>
            socket.current.emit("click-edit", {
              msg_id: data.msg_id,
              chat_id: chatId,
            })
          }
        >
          <Image src={edit} alt="editIc" width={15} />
        </button>
      )}
    </>
  );
}

export default React.memo(RegularMessage, (prev, next) => {
  return (
    prev.data === next.data &&
    prev.i === next.i &&
    prev.chatId === next.chatId &&
    prev.showTime == next.showTime
  );
});
