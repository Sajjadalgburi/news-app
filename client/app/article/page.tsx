"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ARTICLE } from "@/graphql/queries";
import ArticleComponent from "@/components/Article-Stuff-Here/Single-Article/ArticleComponent";
import { Article } from "@/__generated__/types";

const ArticlePage = () => {
  const params = useSearchParams();
  const question = params.get("q") as string;

  const { data, loading, error } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { input: question },
  });

  if (!question) return null;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.getSingleArticle?.article) return <div>No article found.</div>;

  return (
    <ArticleComponent
      passedArticle={data.getSingleArticle.article as Article}
    />
  );
};

export default ArticlePage;
