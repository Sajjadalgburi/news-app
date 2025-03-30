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

  if (data?.getAIAnalysis.ai === undefined || data?.getAIAnalysis.ai === null)
    return null;

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
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-lg transition-all duration-300">
      {article.image && (
        <div className="relative w-full h-80 mb-4 rounded-lg overflow-hidden shadow-md">
          <RenderImage image={article.image} alt={article.title} />
        </div>
      )}

      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
        {article.title}
      </h1>
      <div className="text-gray-500 text-sm mt-2">
        By <span className="font-semibold">{article.author || "Unknown"}</span>{" "}
        | {new Date(article.publishedAt).toLocaleDateString()}
      </div>

      {data && article && !AiAnalysisLoading && !AiAnalysisError ? (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-300 rounded-lg shadow-sm">
          <p className="text-gray-700 font-semibold">AI Analysis</p>
          <div className="flex justify-between items-center mt-2">
            <span
              className={`text-sm font-medium ${
                data.getAIAnalysis.ai.biasRating > 60
                  ? "text-red-500"
                  : "text-green-500"
              }`}>
              Bias Rating: {data.getAIAnalysis.ai.biasRating}/100
            </span>
            <span className="text-sm font-medium bg-blue-500 text-white px-2 py-1 rounded-md">
              Worthiness: {data.getAIAnalysis.ai.worthinessRating}/100
            </span>
          </div>
        </div>
      ) : (
        <Skeleton className="mt-4 w-full h-24 bg-gray-200 rounded-lg" />
      )}

      <div className="mt-6 text-gray-700 dark:text-gray-300 leading-loose border-t pt-4">
        <p>
          {showSummary
            ? data?.getAIAnalysis.ai.summarizedContent
            : article.content}
        </p>
      </div>

      <Button
        onClick={() => setShowSummary(!showSummary)}
        className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all">
        {showSummary ? "Show Full Article" : "Show AI Summary"}
      </Button>

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

      <div className="mt-8">
        <h2 className="text-xl font-bold">Comments</h2>

        <textarea
          className="w-full resize-none mt-4 p-2 border border-gray-300 rounded-md"
          placeholder="Write your comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />

        <Button
          disabled={commentLoading || !user}
          variant="outline"
          onClick={handleCommentSubmit}
          className="cursor-pointer mt-2">
          {user
            ? commentLoading
              ? "Publishing Comment..."
              : "Create Comment"
            : "Login to Add Comment"}
        </Button>
        {articleComments.length > 0 ? (
          <div className="mt-6 gap-3 flex flex-col">
            {articleComments.map((comment) => {
              return comment && user ? (
                <CommentCard
                  key={comment.id}
                  data={article}
                  setData={
                    setArticle as React.Dispatch<React.SetStateAction<Article>>
                  }
                  user={user}
                  comment={comment}
                />
              ) : null;
            })}
          </div>
        ) : (
          <p className="text-gray-500 my-3">No comments yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default ArticleComponent;
