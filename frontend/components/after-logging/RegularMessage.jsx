import { useApp } from "@/contexts/AppContext";
import { useMessageTime } from "@/hooks/useMessageTime";
import edit from "@/images/edit.svg";
import Image from "next/image";
export default function RegularMessage({ data, i, chatId }) {
  const { user, socket } = useApp();
  const { showTime } = useMessageTime();
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
              index: i,
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
