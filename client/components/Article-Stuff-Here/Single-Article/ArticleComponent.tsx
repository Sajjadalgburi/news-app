"use client";
import { Article } from "@/__generated__/types";
import { useQuery, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GET_ARTICLE_AI_ANALYSIS } from "@/graphql/queries";
import { Skeleton } from "../../ui/skeleton";
import { Button } from "@/components/ui/button";
import RenderImage from "@/components/RenderImage";
import useUser from "@/hooks/useUser";
import { CREATE_NEW_COMMENT } from "@/graphql/mutations";
import toast from "react-hot-toast";
import CommentCard from "@/components/CommentCard";

interface Props {
  passedArticle: Article;
}

const ArticleComponent = ({ passedArticle }: Props) => {
  const [showSummary, setShowSummary] = useState(false);
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [article, setArticle] = useState<Article | null>(passedArticle || null);

  useEffect(() => {
    if (passedArticle) {
      setArticle(passedArticle);
    }
  }, [passedArticle]);

  const {
    data,
    loading: AiAnalysisLoading,
    error: AiAnalysisError,
  } = useQuery(GET_ARTICLE_AI_ANALYSIS, {
    variables:
      article?.content && article?.id
        ? { content: article.content, articleId: article.id }
        : undefined,
    skip: !article?.content || !article?.id,
  });

  const [createComment, { loading: commentLoading }] = useMutation(
    CREATE_NEW_COMMENT,
    {
      onCompleted: (commentData) => {
        if (
          commentData.createComment.message &&
          commentData.createComment.status === 400
        ) {
          toast.error(commentData.createComment.message);
          return;
        }

        // Check if the comments exist and are properly structured
        const newComments = commentData.createComment.article?.comments;

        if (newComments) {
          toast.success("Comment added successfully!");

          setArticle((prev) => {
            if (!prev || prev === null) return prev;

            return {
              ...prev,
              comments: newComments.map((comment) => ({
                ...comment,
                articleId: article?.id ?? "",
                content: comment?.content ?? "",
                id: comment?.id ?? "",
                createdAt: comment?.createdAt ?? "",
                user: {
                  id: comment?.user?.id ?? "",
                  profilePicture: comment?.user?.profilePicture ?? "",
                  name: comment?.user?.name ?? "",
                },
              })),
            };
          });

          setCommentText("");
        } else {
          // Handle case where comments aren't returned as expected
          toast.success("Comment added successfully!");
          setCommentText("");
        }
      },
      onError: (error) => {
        toast.error("Error adding comment: " + error.message);
      },
    },
  );

  if (!article) return null;

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty!");
      return;
    }
    try {
      await createComment({
        variables: {
          input: {
            articleId: article?.id ?? "",
            content: commentText,
            user: { id: user?.id ?? "" },
          },
        },
      });
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const articleComments = article?.comments || [];

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Article content - takes up more space on larger screens */}
        <div className="lg:w-2/3 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 transition-all duration-300">
            {article.image && (
              <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden shadow-md">
                <RenderImage image={article.image} alt={article.title} />
              </div>
            )}

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
              {article.title}
            </h1>

            <div className="text-gray-500 text-sm mt-2 mb-4">
              By{" "}
              <span className="font-semibold">
                {article.author || "Unknown"}
              </span>{" "}
              | {new Date(article.publishedAt).toLocaleDateString()}
            </div>

            {data && article && !AiAnalysisLoading && !AiAnalysisError ? (
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                <p className="text-gray-700 dark:text-gray-200 font-semibold">
                  AI Analysis
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm font-medium ${
                      data.getAIAnalysis.ai &&
                      data.getAIAnalysis.ai.biasRating > 60
                        ? "text-red-500"
                        : "text-green-500"
                    }`}>
                    Bias Rating: {data?.getAIAnalysis?.ai?.biasRating}/100
                  </span>
                  <span className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-md">
                    Worthiness: {data?.getAIAnalysis?.ai?.worthinessRating}/100
                  </span>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">
                  <strong>Bias Reasoning:</strong>{" "}
                  {data?.getAIAnalysis?.ai?.biasReasoning}
                </p>
              </div>
            ) : (
              <Skeleton className="mt-4 w-full h-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            )}

            <div className="mt-6 text-gray-700 dark:text-gray-300 leading-relaxed border-t border-gray-200 dark:border-gray-700 pt-6">
              {AiAnalysisLoading ? (
                <Skeleton className="w-full h-24 bg-gray-200 dark:bg-gray-700" />
              ) : (
                <p className="whitespace-pre-line">
                  {!AiAnalysisError
                    ? showSummary
                      ? data?.getAIAnalysis?.ai?.summarizedContent
                      : article.content
                    : article.content}
                </p>
              )}
            </div>

            {!AiAnalysisError && !AiAnalysisLoading && (
              <Button
                onClick={() => setShowSummary(!showSummary)}
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all">
                {showSummary ? "Show Full Article" : "Show AI Summary"}
              </Button>
            )}

            <div className="mt-6 flex justify-between items-center text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700 pt-4">
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
        </div>

        {/* Comments section - fixed at top right on large screens, below article on smaller screens */}
        <div className="lg:w-1/3 w-full lg:sticky lg:top-4 self-start">
          <div className="bg-blue-50 dark:bg-gray-700 rounded-xl shadow-md p-6 transition-all duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Comments
            </h2>

            <textarea
              className="w-full resize-none p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-gray-100"
              placeholder="Write your comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows={4}
            />

            <Button
              disabled={commentLoading || !user}
              onClick={handleCommentSubmit}
              className="cursor-pointer mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors">
              {user
                ? commentLoading
                  ? "Publishing Comment..."
                  : "Post Comment"
                : "Login to Comment"}
            </Button>

            <div className="mt-6 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
              {articleComments.length > 0 ? (
                <div className="space-y-4">
                  {articleComments.map((comment) => {
                    return comment ? (
                      <CommentCard
                        key={comment.id}
                        data={article}
                        setData={
                          setArticle as React.Dispatch<
                            React.SetStateAction<Article>
                          >
                        }
                        user={user}
                        comment={comment}
                      />
                    ) : null;
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No comments yet. Be the first!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleComponent;
