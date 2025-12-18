import Image from "next/image";
import ghost from "@/images/ghost-icon.svg";
import { useEffect, useRef } from "react";
import "@/styles/loggingMenu.css";
import { useToast } from "@/hooks/useToast";
import { useApp } from "@/contexts/AppContext";

export default function LoggingMenu() {
  const myUsernameRef = useRef(null);
  const { addToast } = useToast();
  const { socket } = useApp();

  useEffect(() => {
    //focus na input
    myUsernameRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const user = myUsernameRef.current.value;
    if (user.trim() === "") {
      addToast("You have to write your username to log in!", "error");
    } else {
      socket.current.emit("login", user);
      addToast(`Succesfully logged as: ${user}`, "success");
    }
  }

  return (
    <>
      <div id="menu">
        <div id="logging-menu">
          <Image src={ghost} alt={"ghost icon"} width={50} />
          <h1>BooChat</h1>
          <div>
            <h4>Log in</h4>
            <form onSubmit={handleSubmit}>
              <input
                ref={myUsernameRef}
                type="text"
                placeholder="Type your login"
              ></input>
              <button>Log in</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
