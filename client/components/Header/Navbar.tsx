import Image from "next/image";
import Link from "next/link";
import React from "react";
import { categories } from "../../helpers/constants";
import { ThemeToggle } from "../ThemeToggle";
import AuthGroup from "./AuthGroup";

const user = {
  loggedIn: false,
  name: "John Doe",
  imageUrl:
    "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
};

const Navbar = () => {
  return (
    <header>
      <nav className="flex justify-between items-center p-4 ">
        <div className="flex items-center justify-center gap-2">
          <Image
            src={user.imageUrl}
            width={50}
            height={50}
            className="rounded-full"
            alt="User Image"
          />

          <Link href={"/"}>App Name</Link>
        </div>

        {/* Array of Catagories */}
        <div className="flex gap-2 font-semibold md:text-md">
          {categories.map((c) => (
            <Link
              key={`${c.name} - ${Math.random()}}`}
              className=" capitalize p-2 rounded-lg hover:bg-gray-200"
              href={`/category/${c.name.toLowerCase()}`}>
              {c.name}
            </Link>
          ))}
        </div>

        {/* Outmost right hand side */}
        <div className="flex gap-2">
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
