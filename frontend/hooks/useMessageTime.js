import { MessageTimeContext } from "@/contexts/MessageTime";
import { useContext } from "react";

export function useMessageTime() {
  const ctx = useContext(MessageTimeContext);

  if (!ctx) {
    throw new Error("useMessageTime has to be used in MessageTimeProvider");
  }

  return ctx;
}
