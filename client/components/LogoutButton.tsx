"use client";

import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import { LOGOUT_USER } from "@/graphql/mutations"; // Update the path to point to mutations instead of queries
import toast from "react-hot-toast";
import useUser from "@/hooks/useUser";

const LogoutButton = () => {
  const { setUser } = useUser(); // Assuming you have a way to set user in your context or state

  const [logoutUser, { loading }] = useMutation(LOGOUT_USER, {
    onCompleted: () => {
      setUser(null); // Clear user data on logout
      toast.success("Logout successful!", {
        duration: 2000,
      });
    },
    onError: () => toast.error("Logout failed. Please try again."),
  });

  return (
    <Button
      disabled={loading}
      variant="destructive"
      className="cursor-pointer"
      onClick={() => logoutUser()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
