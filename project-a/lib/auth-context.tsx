"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type AuthState = {
  token: string | null;
  user: any | null;
};

type AuthContextType = AuthState & {
  setAuth: (s: AuthState) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("auth") : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setToken(parsed.token || null);
        setUser(parsed.user || null);
      } catch {/* ignore */}
    }
  }, []);

  const setAuth = (s: AuthState) => {
    setToken(s.token);
    setUser(s.user);
    if (typeof window !== "undefined") window.localStorage.setItem("auth", JSON.stringify(s));
  };

  const logout = () => setAuth({ token: null, user: null });

  const value = useMemo(() => ({ token, user, setAuth, logout }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
