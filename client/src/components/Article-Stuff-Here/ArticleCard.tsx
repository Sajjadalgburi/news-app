import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/__generated__/graphql";
import { formatDate } from "@/src/helpers";

interface Props {
  article: Article;
  image?: boolean;
  isFeatured?: boolean;
  hasImage?: boolean;
}

/**
 * Component for displaying a single article card with improved layout
 */
const ArticleCard: React.FC<Props> = ({
  article,
  isFeatured,
  image = true,
  hasImage,
}) => {
  return (
    <Link
      href={`/article/${encodeURIComponent(article.title)}`}
      className="block overflow-hidden rounded-xl min-h-fit mx-auto self-center shadow-md transition-transform transform hover:scale-102 hover:underline hover:shadow-lg">
      {image && article.image && (
        <div className={`relative w-full ${isFeatured ? "h-96" : "h-48"}`}>
          <Image
            src={article.image}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className={`rounded-t-xl `}
          />
        </div>
      )}
      <div className="flex  flex-col h-full p-4 bg-white ">
        <div className="">
          <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {article.title}
          </h2>
        </div>

        {hasImage !== true && (
          <p
            className={`${
              isFeatured ? "text-md" : "text-xs"
            } text-gray-700 line-clamp-3 text-wrap`}>
            {article.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span className="font-medium capitalize">
            By: {article.author ? article.author : "anonymous"}
          </span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
