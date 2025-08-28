"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  auth,
  type LoginInput,
  type RegisterInput,
  type AuthUser,
  type LoginResponse,
} from "./auth";

type AuthContextValue = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed: LoginResponse = JSON.parse(raw);
        setUser(parsed.user);
      } catch {}
    }
  }, []);

  async function login(input: LoginInput) {
    setLoading(true);
    try {
      const res = await auth.login(input);
      localStorage.setItem("token", res.token);
      localStorage.setItem("auth", JSON.stringify(res));
      setUser(res.user);
    } finally {
      setLoading(false);
    }
  }

  async function register(input: RegisterInput) {
    setLoading(true);
    try {
      await auth.register(input);
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
