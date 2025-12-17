"use client";

import { createContext, useContext } from "react";
import useAppState from "@/hooks/useAppState";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export function AppProvider({ children }) {
  const appState = useAppState();

  return <AppContext.Provider value={appState}>{children}</AppContext.Provider>;
}
