import { Article, Comment, User } from "@/__generated__/graphql";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import DeleteButton from "./DeleteButton";

interface Props {
  comment: Comment;
  user: User | null;
  setArticle: Dispatch<SetStateAction<Article>>;
  article: Article;
}

const CommentCard = ({ comment, user, article, setArticle }: Props) => {
  const userWhoCreatedComment: string = comment.user.id;

  return (
    <div className="flex flex-col gap-2 p-4  bg-gray-300 rounded-lg shadow-md mb-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {" "}
          <Image
            src={comment.user.profilePicture || ""}
            alt="user"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span>{comment.user.name || "Anonymous"}</span>
        </div>

        <div>
          <div>
            {userWhoCreatedComment === user?.id && (
              <DeleteButton
                className={""}
                article={article}
                setArticle={setArticle}
                commentId={comment.id}
              />
            )}
          </div>
        </div>
      </div>
      <div className="">{comment.content} </div>
    </div>
  );
};

export default CommentCard;
