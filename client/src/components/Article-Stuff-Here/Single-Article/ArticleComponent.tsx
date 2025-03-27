import { Article } from "@/__generated__/graphql";
import { ApolloError, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GET_ARTICLE_AI_ANALYSIS } from "@/src/graphql/queries";

interface Props {
  article: Article;
  loading: boolean;
  error: ApolloError | undefined;
}

const ArticleComponent = ({ article, error, loading }: Props) => {
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

  const [showSummary, setShowSummary] = useState(false);

  if (loading)
    return <div className="text-center text-gray-500">Loading...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  const bias = data?.getAIAnalysis.ai?.biasRating;
  const worthiness = data?.getAIAnalysis.ai?.worthinessRating;
  const summary = data?.getAIAnalysis.ai?.summarizedContent;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
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

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
        {article.title}
      </h1>
      <div className="text-gray-600 text-sm mt-2">
        <span>
          By <strong>{article.author || "Unknown"}</strong> |{" "}
          {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>

      {article.description && (
        <p className="mt-4 text-gray-700 leading-relaxed">
          {article.description}
        </p>
      )}

      {AiAnalysisLoading ? (
        <div className="text-center text-gray-500">
          Analyzing AI insights...
        </div>
      ) : AiAnalysisError ? (
        <div className="text-center text-red-500">
          Failed to load AI insights
        </div>
      ) : (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-sm font-semibold">Bias Rating: {bias} / 100</p>
          <p className="text-sm font-semibold">
            Worthiness Score: {worthiness} / 100
          </p>
        </div>
      )}

      <div className="mt-6 text-gray-800 leading-loose border-t pt-4">
        {showSummary && summary ? <p>{summary}</p> : <p>{article.content}</p>}
      </div>

      <button
        onClick={() => setShowSummary((prev) => !prev)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">
        {showSummary ? "Show Full Article" : "Show AI Summary"}
      </button>

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
    </div>
  );
};

export default ArticleComponent;
