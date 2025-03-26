import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuthGroup = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>{" "}
      <Button variant={"secondary"} asChild>
        <Link href="/register">Login</Link>
      </Button>{" "}
    </div>
  );
};

export default AuthGroup;
