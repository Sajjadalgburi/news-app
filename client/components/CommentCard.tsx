import { Article, Comment, User } from "@/__generated__/types";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";
import { formatDate } from "@/helpers";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "./ui/card";

interface Props {
  comment: Comment;
  user: User | null;
  setData: Dispatch<SetStateAction<Article>>;
  data: Article;
}

const CommentCard = ({ comment, user, data, setData }: Props) => {
  if (!comment) return null; // Skip if comment is null or undefined

  const commentUser = comment.user;
  if (!commentUser) return null; // Skip if comment user is null or undefined

  const userWhoCreatedComment = commentUser.id;

  return (
    <>
      <Card>
        <CardHeader className="md:px-6 px-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={commentUser.profilePicture || "/default-avatar.png"}
                alt="User Avatar"
                width={40}
                height={40}
                className="rounded-full border border-gray-700"
              />
              <div>
                <Link
                  href={`/profile?id=${comment.user?.id}`}
                  className="font-semibold hover:underline ">
                  {commentUser.name || "Anonymous"}
                </Link>
                <p className="text-xs text-gray-400">
                  {comment.createdAt
                    ? formatDate(comment.createdAt)
                    : "Unknown Date"}
                </p>
              </div>
            </div>

            {/* Delete Button */}
            {userWhoCreatedComment === user?.id && (
              <DeleteButton
                data={data}
                setData={setData}
                commentId={comment.id}
              />
            )}
          </div>
        </CardHeader>
        <CardContent>{comment.content}</CardContent>
      </Card>
    </>
  );
};

export default CommentCard;
