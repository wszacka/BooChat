import "@/styles/globals.css";

import { ToastProvider } from "@/contexts/Toasts";

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
          {children}
          <div id="toast-root"></div>
          <div id="modal-root"></div>
        </ToastProvider>
      </body>
    </html>
  );
}
