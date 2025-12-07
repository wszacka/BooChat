import Image from "next/image";
import ghost from "@/images/ghost-icon.svg";
import { useEffect, useRef } from "react";
import "@/styles/loggingMenu.css";

export default function LoggingMenu({ socket }) {
  const myUsernameRef = useRef(null);

  useEffect(() => {
    //focus na input
    myUsernameRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    socket.current.emit("login", myUsernameRef.current.value);
  }

  return (
    <>
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
    </>
  );
}
