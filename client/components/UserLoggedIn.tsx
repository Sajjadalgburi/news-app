import React from "react";
import LogoutButton from "./LogoutButton";
import { Button } from "./ui/button";
import Link from "next/link";

const UserLoggedIn = () => {
  return (
    <>
      <Button asChild>
        <Link href="/profile" className="text-accent">
          Profile
        </Link>
      </Button>
      <LogoutButton />
    </>
  );
};

export default UserLoggedIn;
