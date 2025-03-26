import React from "react";
import Image from "next/image";
import Link from "next/link";

interface Article {
  title: string;
  image?: string;
  content: string;
  author: string;
  publishedAt: string;
}

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
      className="block overflow-hidden rounded-xl h-full shadow-md transition-transform transform hover:scale-102 hover:underline hover:shadow-lg">
      {image && article.image && (
        <div className="relative w-full h-48">
          <Image
            src={article.image}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
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
              isFeatured ? "text-xl" : "text-xs"
            } text-gray-700 line-clamp-3 text-wrap`}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestiae
            exercitationem impedit perspiciatis nam, deleniti tempora sed
            necessitatibus alias neque consequatur vero iusto et minus.
            Excepturi deleniti fuga sed optio perferendis!
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 mt-2">
          <span className="font-medium">{article.author}</span>
          <span>{article.publishedAt}</span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
