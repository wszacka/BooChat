import Image from "next/image";
import Status from "./Status";
import avatar from "@/images/avatar.png";
import { useToast } from "@/hooks/useToast";
import { createPortal } from "react-dom";
import { useApp } from "@/contexts/AppContext";

export default function SmallUserAccount() {
  const { user, setUser, socket } = useApp();
  const { addToast } = useToast();
  return createPortal(
    <>
      <div id="user-div" className="small-user">
        <div id="img-and-user">
          <Image
            src={avatar}
            alt="trzask"
            width={30}
            height={30}
            id="user-img"
          />
          {user}
        </div>
        <Status />
        <button
          id="log-out"
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("userStatus");
            setUser("");
            addToast(`You logged out as: ${user}`, "info");
            socket.current.emit("logout", user);
          }}
        >
          Log out
        </button>
      </div>
    </>,
    document.getElementById("user-root")
  );
}
