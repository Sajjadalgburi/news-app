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
  token,
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  // Decode user only when token changes
  const decodedUser = useMemo(() => {
    if (!token) return null;
    try {
      return decode(token) as User;
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }, [token]);

  useEffect(() => {
    setUser(decodedUser);
  }, [decodedUser]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
