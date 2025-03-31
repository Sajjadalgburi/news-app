import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { DELETE_COMMENT } from "@/graphql/mutations";
import { Article } from "@/__generated__/graphql";

interface Props {
  commentId: string;
  setData: Dispatch<SetStateAction<Article>>;
  data: Article;
  className?: string;
}

const DeleteButton = ({ className, commentId, data, setData }: Props) => {
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

  const comments = data?.comments || [];

  if (!comments) return null;

  const handleDeleteComment = () => {
    if (data) {
      const updatedComments = comments.filter(
        (comment) => comment && comment.id !== commentId,
      );

      const existingComments = comments || [];

      setData((prev) => {
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
      className={`${className} cursor-pointer md:w-16 md:h-10 w-12 h-8`}>
      {deleteLoading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DeleteButton;
