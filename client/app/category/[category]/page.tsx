"use client";

import { useEffect, use } from "react";
import { categories } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import { GET_ARTICLES_FOR_CATEGORY } from "@/graphql/queries";
import useFetch from "@/helpers/fetch";
import Articles from "@/components/Article-Stuff-Here/Articles";
import { Article } from "@/__generated__/graphql";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params); // we need to use the params hook to get the category. Nexjs will soon undergo migration to a new version of react-router-dom
  const router = useRouter();

  // Check if category exists
  const isValidCategory = categories.some((c) => c.name === category);

  useEffect(() => {
    if (!isValidCategory) {
      router.replace("/");
    }
  }, [isValidCategory, router]);

  const { data, loading, error } = useFetch(GET_ARTICLES_FOR_CATEGORY, {
    variables: { category },
  });

  if (!isValidCategory) return null; // Prevents flicker

  return (
    <Articles
      articles={data.getCategory as Article[]}
      loading={loading}
      error={error}
    />
  );
}
