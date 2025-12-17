import Image from "next/image";
import Status from "./Status";
import avatar from "@/images/avatar.png";
import { useToast } from "@/hooks/useToast";
import { useApp } from "@/contexts/AppContext";

export default function UserAccount() {
  const { user, setUser, socket } = useApp();
  const { addToast } = useToast();
  return (
    <>
      <div id="user-div">
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
    </>
  );
}
