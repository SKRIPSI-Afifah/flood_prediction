"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "@/lib/auth";

interface AuthContextType {
  user: any;
  loading: boolean;
  setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setAuthUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setAuthUser(storedUser);
    }
    setLoading(false);
  }, []);

  const setUser = (newUser: any) => {
    setAuthUser(newUser);
    if (newUser) {
      localStorage.setItem("sentinel_user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("sentinel_user");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
