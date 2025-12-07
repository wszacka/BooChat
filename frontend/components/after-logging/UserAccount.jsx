import Image from "next/image";
import Status from "./Status";
import avatar from "@/images/trzask.jpg";

export default function UserAccount({ user, setUser, socket }) {
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
            socket.current.emit("logout", user);
          }}
        >
          Log out
        </button>
      </div>
    </>
  );
}
