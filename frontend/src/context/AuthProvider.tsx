// src/context/AuthContext.tsx
import React, { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "./AuthContextInstances";
import { createUserSchema } from "finance-common";
import type{ User } from "@/context/AuthTypes"; 

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const parsed = createUserSchema.safeParse(JSON.parse(savedUser));
        if (parsed.success) {
          setUser({ id: "real-user-id-123", email: parsed.data.email });
        } else {
          localStorage.removeItem("user");
        }
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const validated = createUserSchema.safeParse({ email, password });
      if (!validated.success) {
        throw new Error("Invalid email or password format");
      }

      const fakeUser: User = { id: "real-user-id-123", email };
      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify({ email }));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Login failed");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};
