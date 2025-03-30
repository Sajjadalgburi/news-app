import { Article, Comment, User } from "@/__generated__/graphql";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { formatDistanceToNow } from "date-fns";

interface Props {
  comment: Comment;
  user: User | null;
  setArticle: Dispatch<SetStateAction<Article>>;
  article: Article;
}

const CommentCard = ({ comment, user, article, setArticle }: Props) => {
  const userWhoCreatedComment: string = comment.user.id;
  const formattedDate = comment.createdAt
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    : "Unknown time";

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src={comment.user.profilePicture || "/default-avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full border border-gray-700"
          />
          <div>
            <p className="font-semibold">{comment.user.name || "Anonymous"}</p>
            <p className="text-xs text-gray-400">{formattedDate}</p>
          </div>
        </div>

        {/* Delete Button */}
        {userWhoCreatedComment === user?.id && (
          <DeleteButton
            article={article}
            setArticle={setArticle}
            commentId={comment.id}
          />
        )}
      </div>

      {/* Comment Content */}
      <p className="text-sm text-gray-300">{comment.content}</p>

      {/* Upvotes / Downvotes */}
      <div className="flex items-center gap-3 text-xs text-gray-400">
        {/* TODO ! ADD LIKE and dislike stuff */}
        <span>👍 {comment.upvote || 0}</span>
        <span>👎 {comment.downvote || 0}</span>
      </div>
    </div>
  );
};

export default CommentCard;
