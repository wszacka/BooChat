"use client";
import ChatMenu from "@/components/after-logging/ChatMenu";
import LoggingMenu from "@/components/login-menu/LoggingMenu";
import { useEffect, useState } from "react";

export default function Main() {
  const [loginMenu, setLoginMenu] = useState(true);
  const [user, setUser] = useState("");
  useEffect(() => {
    const username = localStorage.getItem("username");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUser(username);
  }, []);
  return (
    <>
      {!user ? (
        <div id="menu">
          <LoggingMenu
            loginMenu={loginMenu}
            setLoginMenu={setLoginMenu}
            setUser={setUser}
          />
        </div>
      ) : (
        <ChatMenu user={user} />
      )}
    </>
  );
}
