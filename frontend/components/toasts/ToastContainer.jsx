import { createPortal } from "react-dom";
import Toast from "./Toast";

export default function ToastContainer({ toasts, removeToast }) {
  if (toasts.length === 0) return null;

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          content={toast.content}
          onClose={removeToast}
        />
      ))}
    </div>,
    document.getElementById("toast-root")
  );
}
