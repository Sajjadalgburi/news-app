import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { DELETE_COMMENT } from "@/graphql/mutations";
import { Article } from "@/__generated__/graphql";

interface Props {
  commentId: string;
  className?: string;
  setArticle: Dispatch<SetStateAction<Article>>;
  article: Article;
}

const DeleteButton = ({ className, commentId, article, setArticle }: Props) => {
  const [deleteComment, { loading: deleteLoading }] = useMutation(
    DELETE_COMMENT,
    {
      onCompleted: ({ deleteComment }) => {
        if (deleteComment?.success) {
          toast.success(deleteComment.message);
        } else {
          toast.error(deleteComment?.message || "Failed to delete comment");
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const comments = article?.comments || [];

  if (!comments) return null;

  const handleDeleteComment = () => {
    if (article) {
      const updatedComments = comments.filter(
        (comment) => comment && comment.id !== commentId,
      );

      const existingComments = comments || [];

      setArticle((prev) => {
        return {
          ...prev,
          comments: updatedComments || existingComments,
        };
      });
    }

    deleteComment({ variables: { commentId } });
  };

  return (
    <Button
      onClick={handleDeleteComment}
      disabled={deleteLoading}
      variant="destructive"
      className={`${className} cursor-pointer`}>
      {deleteLoading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
