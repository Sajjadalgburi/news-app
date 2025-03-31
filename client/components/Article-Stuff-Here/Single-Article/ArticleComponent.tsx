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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
      window.document.title = passedArticle.title;
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
          <Card>
            <CardHeader>
              {article.image && (
                <div className="relative w-full h-80 mb-6 rounded-lg overflow-hidden shadow-md">
                  <RenderImage image={article.image} alt={article.title} />
                </div>
              )}

              <CardTitle className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight">
                {" "}
                {article.title}
              </CardTitle>
              <CardDescription>
                By{" "}
                <span className="font-semibold">
                  {article.author || "Unknown"}
                </span>{" "}
                | {new Date(article.publishedAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {data && article && !AiAnalysisLoading && !AiAnalysisError ? (
                <Card>
                  <CardHeader>
                    <CardTitle>AI Analysis</CardTitle>
                    <CardDescription className="flex justify-between items-center mt-2">
                      <Badge
                        variant={
                          data.getAIAnalysis.ai &&
                          data.getAIAnalysis.ai.biasRating > 60
                            ? "destructive"
                            : "outline"
                        }>
                        {" "}
                        Bias Rating: {data?.getAIAnalysis?.ai?.biasRating}/100
                      </Badge>

                      <Badge>
                        Worthiness: {data?.getAIAnalysis?.ai?.worthinessRating}
                        /100
                      </Badge>
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    {data?.getAIAnalysis?.ai?.biasReasoning}
                  </CardContent>
                </Card>
              ) : (
                <Skeleton className="mt-4 w-full h-24 rounded-lg" />
              )}

              <div className="mt-6  leading-relaxed border-t  pt-6">
                {AiAnalysisLoading ? (
                  <Skeleton className="w-full h-24" />
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
                  className="mt-6 px-6 py-2 cursor-pointer font-semibold transition-all">
                  {showSummary ? "Show Full Article" : "Show AI Summary"}
                </Button>
              )}
            </CardContent>
            <CardFooter className="mt-6 flex justify-between items-center text-sm border-t  pt-4">
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
            </CardFooter>
          </Card>
        </div>

        {/* Comments section - fixed at top right on large screens, below article on smaller screens */}
        <div className="lg:w-1/3 w-full sm:w-1/2 mx-auto lg:mx-1 lg:sticky lg:top-4 self-start">
          <Card>
            <CardHeader>
              <CardTitle>Comments</CardTitle>
              <CardDescription>
                Leave a your thoughts for others to see!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                className="w-full resize-none p-5"
                placeholder="Write your thoughts..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                disabled={!user}
              />

              <Button
                disabled={commentLoading || !user}
                onClick={handleCommentSubmit}
                className="cursor-pointer mt-3 w-full  font-medium py-2 rounded-lg transition-colors">
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
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArticleComponent;
