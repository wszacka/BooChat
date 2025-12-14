"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Toast({ id, type, content, setToasts }) {
  const [show, setShow] = useState(true);
  const timerRef = useRef(null); // osobny timer dla każdego

  function handleClose() {
    setShow(false); // odpala animację wyjścia
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 300); // usuń toast po animacji
  }

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setShow(false); // odpala animację wyjścia
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        300
      ); // usuń toast po animacji
    }, 3000); // auto-close
    return () => clearTimeout(timerRef.current);
  }, [id, setToasts]);

  const icons = {
    success: "✅",
    error: "❌",
    warning: "⚠️",
    info: "ℹ️",
  };

  return (
    <>
      <div className={`toast ${type} ${show ? "" : "hide"}`}>
        <span className="toast-icon">{icons[type]}</span>
        <span className="toast-message">{content}</span>
        <button className="toast-close" onClick={handleClose}>
          x
        </button>
      </div>
    </>
  );
}
