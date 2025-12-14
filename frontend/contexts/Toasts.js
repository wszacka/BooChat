"use client";
import ToastContainer from "@/components/toasts/ToastContainer";
import { createContext, useContext, useState } from "react";

export const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(content, type = "info") {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, content, type }]);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}
