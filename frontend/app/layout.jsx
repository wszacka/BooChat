"use client";
import "@/styles/globals.css";
import "@/styles/loggingMenu.css";

import { ToastProvider } from "@/contexts/Toasts";
import { AppProvider } from "@/contexts/AppContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css"
        precedence="default"
      />
      <body>
        <ToastProvider>
          <AppProvider>
            {children}
            <div id="toast-root"></div>
            <div id="modal-root"></div>
            <div id="user-root"></div>
          </AppProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
