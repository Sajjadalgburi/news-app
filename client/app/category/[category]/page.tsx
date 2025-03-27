"use client";

import Articles from "@/src/components/Article-Stuff-Here/Articles";
import { categories } from "@/src/helpers/constants";
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
      {/* <Articles articles={fakeData} loading={true} error={null} /> */}
    </div>
  );
}
