"use client";

import { User } from "@/__generated__/graphql";
import React, { createContext, useState, useEffect, useMemo } from "react";
import { decode } from "jsonwebtoken";

interface UserContextProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUser: () => {},
  isLoading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and decode token on mount and whenever token state might change
  useEffect(() => {
    async function checkSession() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/session", { credentials: "include" });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        if (data.token) {
          try {
            const decodedUser = decode(data.token) as User;
            setUser(decodedUser);
          } catch (error) {
            console.error("Failed to decode token:", error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();

    // Set up an interval to periodically check for session changes
    const intervalId = setInterval(checkSession, 30000); // Check every minute

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      isLoading,
    }),
    [user, isLoading]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
