import { createContext, useContext, useState } from "react";

const MessageTimeContext = createContext({
  showTime: false,
  changeTime: () => {},
});

// Provider, który owija całą aplikację
export function MessageTimeProvider({ children }) {
  const [showTimestamp, setShowTimestamp] = useState(false);
  function changeTime() {
    setShowTimestamp((prev) => !prev);
  }

  const messageValue = {
    showTime: showTimestamp,
    changeTime: changeTime,
  };
  return (
    <MessageTimeContext value={messageValue}>{children}</MessageTimeContext>
  );
}

export function useMessageTime() {
  return useContext(MessageTimeContext);
}
