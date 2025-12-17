"use client";

import { MessageTimeProvider } from "@/contexts/MessageTime";

export default function RootLayout({ children }) {
  return <MessageTimeProvider>{children}</MessageTimeProvider>;
}
