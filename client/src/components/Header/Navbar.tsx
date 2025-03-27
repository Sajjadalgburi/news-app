import Image from "next/image";
import Link from "next/link";
import React from "react";
import { categories } from "@/src/helpers/constants";
import { ThemeToggle } from "../ThemeToggle";
import AuthGroup from "./AuthGroup";
import CatagoryTitle from "../CatagoryTitle";

const user = {
  loggedIn: false,
  name: "John Doe",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
};

const Navbar = () => {
  return (
    <header className="bg-accent rounded-md max-w-[90%] mx-auto shadow-md sticky top-0 z-50">
      <nav className="flex justify-between items-center p-4 ">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={user.imageUrl}
            width={50}
            height={50}
            className="rounded-full"
            alt="User Image"
          />

          <Link
            className="capitalize md:text-3xl text-lg font-semibold"
            href={"/"}>
            Canadian News
          </Link>
        </div>

        {/* Array of Catagories */}
        <div className="flex gap-2 font-semibold md:text-md">
          {categories.map((c) => (
            <CatagoryTitle key={c.name} name={c.name} />
          ))}
        </div>

        {/* Outmost right hand side */}
        <div className="flex gap-2 justify-center items-center">
          <ThemeToggle />
          {user.loggedIn ? (
            <div>
              <span>render stuff when user is logged in</span>
            </div>
          ) : (
            // Render this when user is not logged in
            <AuthGroup />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
