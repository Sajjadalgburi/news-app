"use client";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

/**
 * Custom hook to access the user context instead of repatedly re-declaring the context in every component.
 */
const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};

export default useUser;
