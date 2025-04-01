"use client";

import { User } from "@/__generated__/graphql";
import React, { createContext, useState, useEffect, useMemo } from "react";
import { decode } from "jsonwebtoken";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextProps | null>(null);

interface UserProviderProps {
  token?: string;
  children: React.ReactNode;
}

/**
 * Custom provider to manage user state. This will decode the JWT token and set the user in context.
 * We will then have the user available in the context for all components that need it.
 * @param {string} token - JWT token to decode and set the user in context.
 * @return Provider with user state and setter function.
 */
export const UserProvider: React.FC<UserProviderProps> = ({
  token: initialToken,
  children,
}) => {
  const [token, setToken] = useState<string | undefined>(initialToken);

  // Fetch token on mount (only in browser)
  useEffect(() => {
    if (!token) {
      async function fetchToken() {
        try {
          const res = await fetch("/api/session", { credentials: "include" });
          if (!res.ok) throw new Error("Failed to fetch token");

          const data = await res.json();
          if (data.token) setToken(data.token);
        } catch (error) {
          console.error("Error fetching token:", error);
        }
      }
      fetchToken();
    }
  }, [token]); // Runs only if token is undefined

  // Decode user from token
  const user = useMemo(() => {
    if (!token) return null;
    try {
      return decode(token) as User;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser: () => {} }}>
      {children}
    </UserContext.Provider>
  );
};
