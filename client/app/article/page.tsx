"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ARTICLE } from "@/src/graphql/queries";
import ArticleComponent from "@/src/components/Article-Stuff-Here/Single-Article/ArticleComponent";
import { Article } from "@/__generated__/types";

const ArticlePage = () => {
  const params = useSearchParams();
  const question = params.get("q") as string;

  const { data, loading, error } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { input: question },
  });

  if (!question) return null;

  return (
    <ArticleComponent
      article={data?.getSingleArticle.article as Article}
      loading={loading}
      error={error}
    />
  );
};

export default ArticlePage;
