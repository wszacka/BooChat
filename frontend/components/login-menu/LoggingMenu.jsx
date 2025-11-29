import Image from "next/image";
import ghost from "@/images/ghost-icon.svg";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useRef } from "react";
import "@/styles/loggingMenu.css";

export default function LoggingMenu({ loginMenu, setLoginMenu, setUser }) {
  const myUsernameRef = useRef(null);

  useEffect(() => {
    //focus na input
    myUsernameRef.current?.focus();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    localStorage.setItem("username", myUsernameRef.current.value);
    setUser(myUsernameRef.current.value);
  }

  return (
    <>
      <div id="logging-menu">
        <Image src={ghost} alt={"ghost icon"} width={50} />
        <h1>BooChat</h1>
        {loginMenu ? (
          <Login
            setLoginMenu={setLoginMenu}
            handleSubmit={handleSubmit}
            myUsernameRef={myUsernameRef}
          />
        ) : (
          <Register
            setLoginMenu={setLoginMenu}
            handleSubmit={handleSubmit}
            myUsernameRef={myUsernameRef}
          />
        )}
      </div>
    </>
  );
}
