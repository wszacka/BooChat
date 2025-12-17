"use client";

import "@/styles/currentChat.css";
import "@/styles/chat.css";
import ChatMenu from "@/components/after-logging/ChatMenu";
import CurrentChat from "@/components/after-logging/CurrentChat";
import { useApp } from "@/contexts/AppContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CurrentChatMenu() {
  const { messages } = useApp();
  const { chatId, name } = useParams();
  const { user } = useApp();
  const router = useRouter();

  // możesz teraz np. przekierować, jeśli user nie istnieje
  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
    if (!(chatId in messages)) {
      router.replace("/chat");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, router]);

  return (
    <ChatMenu>
      <CurrentChat chatId={chatId} name={name} />
    </ChatMenu>
  );
}
