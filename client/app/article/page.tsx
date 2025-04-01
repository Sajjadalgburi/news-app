"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_ARTICLE } from "@/graphql/queries";
import ArticleComponent from "@/components/Article-Stuff-Here/Single-Article/ArticleComponent";
import { Article } from "@/__generated__/types";
import SingleArticleLoading from "@/components/Article-Stuff-Here/Single-Article/SingleArticleLoading";
import CutomError from "@/components/CustomError";

const ArticlePage = () => {
  const params = useSearchParams();
  const question = params.get("q") as string;

  const { data, loading, error } = useQuery(GET_SINGLE_ARTICLE, {
    variables: { input: question },
  });

  if (!question) return null;
  if (loading) return <SingleArticleLoading />;
  if (error) return <CutomError error={error} />;
  if (!data?.getSingleArticle?.article)
    return <CutomError error={"No article found."} />;

  return (
    <Suspense fallback={<SingleArticleLoading />}>
      <ArticleComponent
        passedArticle={data.getSingleArticle.article as Article}
      />
    </Suspense>
  );
};

export default ArticlePage;
