"use client";

import { Article } from "@/__generated__/graphql";
import { GET_ARTICLES_FOR_HOMEPAGE } from "@/src/graphql/queries";
import useFetch from "@/src/helpers/fetch";
import React from "react";
import Articles from "../Article-Stuff-Here/Articles";

const HomePageNews = () => {
  const { data, loading, error } = useFetch(GET_ARTICLES_FOR_HOMEPAGE);

  return (
    <Articles
      articles={data.displayTrendingArticles as Article[]}
      loading={loading}
      error={error}
    />
  );
};

export default HomePageNews;
