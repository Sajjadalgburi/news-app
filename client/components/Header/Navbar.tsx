"use client";

import Link from "next/link";
import React from "react";
import { categories } from "@/helpers/constants";
import { ThemeToggle } from "../ThemeToggle";
import AuthGroup from "./AuthGroup";
import CatagoryTitle from "../CatagoryTitle";
import useUser from "@/hooks/useUser";
import UserLoggedIn from "../UserLoggedIn";
import MobileSheet from "../MobileSheet";

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="bg-accent rounded-md max-w-[90%] mx-auto shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center p-4 ">
        <div className="flex items-center justify-center gap-2">
          {/* todo : Add app logo here */}
          <Link
            className="capitalize md:text-2xl text-lg font-semibold"
            href={"/"}>
            Canadian News
          </Link>
        </div>

        {/* Array of Catagories */}
        <div className="lg:flex hidden xl:gap-2 font-semibold">
          {categories.map((c) => (
            <CatagoryTitle key={c.name} name={c.name} />
          ))}
        </div>

        {/* Desktop */}
        {/* Outmost right hand side */}
        <div className="lg:flex hidden gap-2 justify-center items-center">
          <ThemeToggle />
          {user ? (
            // the logout and profile button group
            <UserLoggedIn />
          ) : (
            // Render this when user is not logged in
            <AuthGroup />
          )}
        </div>

        <div className="lg:hidden flex items-center justify-center gap-2">
          <MobileSheet user={user} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
