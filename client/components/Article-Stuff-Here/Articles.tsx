import React from "react";
import ArticleLaytout from "./ArticleLaytout";
import ArticleCard from "./ArticleCard";

interface Article {
  title: string;
  image?: string;
  content: string;
  author: string;
  publishedAt: string;
}

interface Props {
  articles: Article[];
  loading: boolean;
  error: any;
}

/**
 * Randomizes the layout of the article cards to make some featured and others minimal.
 */
const Articles: React.FC<Props> = ({ articles, loading, error }) => {
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  // Shuffle articles to create variety
  const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);

  return (
    <ArticleLaytout>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-auto grid-flow-dense"
        style={{
          gridAutoRows: "minmax(150px, auto)",
        }}>
        {shuffledArticles.map((article, i) => {
          const isFeatured = Math.random() > 0.7; // 30% chance to be a featured card
          const hasImage = Math.random() > 0.5; // 50% chance to show an image

          return (
            <div
              key={i}
              className={`bg-gray-100 rounded-xl shadow-md p-4 h-fit ${
                isFeatured
                  ? "col-span-2 row-span-2"
                  : hasImage
                  ? "row-span-1"
                  : "row-span-1"
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
