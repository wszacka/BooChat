import { ToastContext } from "@/contexts/Toasts";
import { useContext } from "react";

export function useToast() {
  const ctx = useContext(ToastContext);

  if (!ctx) {
    throw new Error("useToast has to be used in ToastProvider");
  }

  return ctx;
}
