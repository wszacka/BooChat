"use client";
import { useMessageTime } from "@/hooks/useMessageTime";
import { useToast } from "@/hooks/useToast";
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { useRouter } from "next/navigation";
import InputModal from "@/components/after-logging/InputModal";
import NormalMenu from "@/components/after-logging/NormalMenu";
import SmallMenu from "@/components/after-logging/SmallMenu";

export default function ChatMenu({ children }) {
  const { user, messages, showChatInput } = useApp();
  const { changeTime } = useMessageTime();
  const { addToast } = useToast();

  const divRef = useRef(null);
  const [width, setWidth] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => observer.disconnect();
  }, []);

  function timeClick() {
    const hasMessages = Object.values(messages).some(
      (msgsArray) => msgsArray.length > 0
    );

    if (!hasMessages) {
      addToast("You have to write a message to show time", "warning");
    } else {
      changeTime();
    }
  }

  return (
    <>
      <div id="chat-menu">
        <div ref={divRef} id="chat-list">
          {width > 60 ? (
            <NormalMenu timeClick={timeClick} />
          ) : (
            <SmallMenu timeClick={timeClick} />
          )}
        </div>
        <div id="chatroom">{children}</div>
      </div>
      {showChatInput && <InputModal />}
    </>
  );
}
