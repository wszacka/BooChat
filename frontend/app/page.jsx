"use client";
import { useApp } from "@/contexts/AppContext";
import LoggingMenu from "@/components/LoggingMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, loading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace("/chat");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <LoggingMenu />;
}
