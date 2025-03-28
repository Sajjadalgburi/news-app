import { Article } from "@/__generated__/graphql";
import { ApolloError, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_ARTICLE_AI_ANALYSIS } from "@/graphql/queries";
import { Skeleton } from "../../ui/skeleton";

interface Props {
  article: Article;
  loading: boolean;
  error: ApolloError | undefined;
}

const ArticleComponent = ({ article, error, loading }: Props) => {
  const [showSummary, setShowSummary] = useState(false);

  const {
    data,
    loading: AiAnalysisLoading,
    error: AiAnalysisError,
  } = useQuery(GET_ARTICLE_AI_ANALYSIS, {
    variables:
      article?.content && article?.id
        ? { content: article.content, articleId: article.id }
        : undefined,
    skip: loading || !!error || !article?.content || !article?.id,
  });

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  console.log(data?.getAIAnalysis);

  const bias = data?.getAIAnalysis.ai?.biasRating;
  const worthiness = data?.getAIAnalysis.ai?.worthinessRating;
  const summary = data?.getAIAnalysis.ai?.summarizedContent;
  const aiStatus = data?.getAIAnalysis.status;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg transition-all duration-300">
      {/* Article Image */}
      {article.image && (
        <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden shadow-md">
          <Image
            src={article.image}
            alt={article.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {/* Article Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">
        {article.title}
      </h1>

      {/* Author & Published Date */}
      <div className="text-gray-500 text-sm mt-2">
        By <span className="font-semibold">{article.author || "Unknown"}</span>{" "}
        | {new Date(article.publishedAt).toLocaleDateString()}
      </div>

      {/* AI Analysis */}
      {data && !AiAnalysisLoading && !AiAnalysisError ? (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-sm">
          <p className="text-gray-700 font-semibold">AI Analysis</p>
          {aiStatus === 500 ? (
            <span className="text-red-500 font-medium capitalize">
              Our AI is running into minor issues. Please refreash or try
              another article
            </span>
          ) : (
            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm font-medium ${
                  bias! > 60 ? "text-red-500" : "text-green-500"
                }`}>
                Bias Rating: {bias}/100
              </span>
              <span className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-md">
                Worthiness: {worthiness}/100
              </span>
            </div>
          )}
        </div>
      ) : (
        <Skeleton className="mt-4 w-full h-24 bg-gray-200 rounded-lg" />
      )}

      {/* Article Content */}
      <div className="mt-6 text-gray-800 leading-loose border-t pt-4">
        <p>{showSummary ? summary : article.content}</p>
      </div>

      {/* Toggle Summary Button */}
      <button
        onClick={() => setShowSummary(!showSummary)}
        className="mt-6 px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
        {showSummary ? "Show Full Article" : "Show AI Summary"}
      </button>

      {/* Source & Link */}
      <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
        <span>
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
    </div>
  );
};

export default ArticleComponent;
