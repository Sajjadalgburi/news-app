import React from "react";
import ArticleLaytout from "./ArticleLaytout";
import ArticleCard from "./ArticleCard";
import ArticleLoadingState from "./ArticleLoadingState";
import { ApolloError } from "@apollo/client";
import { Article } from "@/__generated__/graphql";

interface Props {
  articles: Article[];
  loading: boolean;
  error: ApolloError | undefined;
}

const Articles: React.FC<Props> = ({ articles, loading, error }) => {
  if (loading) return <ArticleLoadingState />;
  if (error) return <h1>Error: {error.message}</h1>;

  const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);

  return (
    <ArticleLaytout>
      {/* Masonry-style column layout */}
      <div className="max-w-7xl mx-auto md:columns-2 lg:columns-3 xl:columns-4 space-y-4 md:space-y-6 md:gap-6">
        {shuffledArticles.map((article, i) => {
          const isFeatured = Math.random() > 0.9;
          const hasImage = Math.random() > 0.5;

          return (
            <div
              key={article.content?.slice(0, i) ?? ""}
              className={`break-inside-avoid rounded-xl shadow-xl p-4 ${
                isFeatured
                  ? "bg-gray-200"
                  : hasImage
                  ? "bg-red-300/60"
                  : "bg-red-400"
              }`}>
              <ArticleCard
                article={article}
                isFeatured={isFeatured}
                hasImage={hasImage}
                image={isFeatured || hasImage}
              />
            </div>
          );
        })}
      </div>
    </ArticleLaytout>
  );
};

export default Articles;
