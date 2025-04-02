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
import { SearchBar } from "../SearchBar";
import Image from "next/image";

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="bg-accent rounded-md  shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center p-4 ">
        <div className="flex items-center gap-1">
          {/* App Logo */}
          <Link href={"/"}>
            <Image
              src={"app-logo.png"}
              width={50}
              height={50}
              alt="App Logo"
              className="p-1 rounded-md shadow-md dark:bg-accent-foreground bg-gray-300"
            />
          </Link>

          {/* App Name */}
          <Link
            href={"/"}
            className="capitalize md:text-2xl text-lg font-semibold text-primary hover:text-primary-dark transition-colors">
            Network
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
      {/* Re enable after it has been fixed */}
      <SearchBar />
    </header>
  );
};

export default Navbar;
