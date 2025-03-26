"use client";

import { categories } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface CategoryPageProps {
  params: { category: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const router = useRouter();

  // Check if category exists
  const isValidCategory = categories.some((c) => c.name === category);

  useEffect(() => {
    if (!isValidCategory) {
      router.replace("/");
    }
  }, [isValidCategory, router]);

  if (!isValidCategory) return null; // Prevents flicker

  return (
    <div>
      <h1>Category: {category.toUpperCase()}</h1>
      <p>Showing posts for the &quot;{category}&quot; category.</p>
    </div>
  );
}
