"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import useUser from "@/hooks/useUser";

const ProfileButton = () => {
  const { user } = useUser();

  return (
    <Button size={"lg"} asChild>
      <Link href={`/profile?id=${user?.id}`} className="text-accent">
        Profile
      </Link>
    </Button>
  );
};

export default ProfileButton;
