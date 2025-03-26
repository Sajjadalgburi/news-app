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

const Articles: React.FC<Props> = ({ articles, loading, error }) => {
  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error.message}</h1>;

  const shuffledArticles = [...articles].sort(() => Math.random() - 0.5);

  return (
    <ArticleLaytout>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 grid-flow-dense"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gridTemplateRows: "masonry",
          gap: "16px",
        }}>
        {shuffledArticles.map((article, i) => {
          const isFeatured = Math.random() > 0.9;
          const hasImage = Math.random() > 0.5;

          return (
            <div
              key={i}
              className={`bg-gray-100 rounded-xl shadow-md p-4 self-center ${
                isFeatured ? "col-span-2" : "col-span-1"
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
