import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Button size={"lg"} asChild>
      <Link href="/profile" className="text-accent">
        Profile
      </Link>
    </Button>
  );
};

export default ProfileButton;
