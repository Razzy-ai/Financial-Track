// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextInstances";
import type { AuthContextType } from "../context/AuthTypes";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
