import { Article } from "@/__generated__/graphql";
import { ApolloError } from "@apollo/client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

/**
 * Component to display a single article with proper styling and responsiveness.
 */

interface Props {
  article: Article;
  loading: boolean;
  error: ApolloError | undefined;
}

const ArticleComponent = ({ article, error, loading }: Props) => {
  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-lg rounded-lg">
      {/* Article Image */}
      {article.image && (
        <div className="relative w-full h-64 md:h-96 mb-4">
          <Image
            src={article.image}
            alt={article.title}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      )}

      {/* Article Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {article.title}
      </h1>

      {/* Author & Published Date */}
      <div className="text-gray-600 text-sm mt-2">
        <span>
          By <strong>{article.author || "Unknown"}</strong> |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>

      {/* Article Description */}
      {article.description && (
        <p className="mt-4 text-gray-700 leading-relaxed">
          {article.description}
        </p>
      )}

      {/* Article Content */}
      {article.content && (
        <div className="mt-6 text-gray-800 leading-loose border-t pt-4">
          <p>{article.content}</p>
        </div>
      )}

      {/* Source & Link */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Source: <strong>{article.source.name}</strong>
        </span>
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline font-semibold">
          Read Full Article
        </Link>
      </div>

      {/* Comments Section (If Available) */}
      {article.comments && article.comments.length > 0 && (
        <div className="mt-8 border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-900">Comments</h3>
          <ul className="mt-2 space-y-2">
            {article.comments.map((comment, index) => (
              <li
                key={index}
                className="bg-gray-100 p-2 rounded-md text-gray-700">
                {comment?.content} -{" "}
                <strong>{comment?.user.name || "Anonymous"}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleComponent;
