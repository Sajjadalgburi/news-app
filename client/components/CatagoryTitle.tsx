"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryTitle = ({ name }: { name: string }) => {
  const pathname = usePathname();
  const isActive = pathname === `/category/${name.toLowerCase()}`;

  return (
    <Link
      className={`capitalize p-2 rounded-lg transition ${
        isActive ? "bg-gray-200 font-semibold" : "hover:bg-gray-200"
      }`}
      href={`/category/${name.toLowerCase()}`}>
      {name}
    </Link>
  );
};

export default CategoryTitle;
