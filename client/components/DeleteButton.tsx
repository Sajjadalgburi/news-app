import React from "react";
import { Button } from "./ui/button";

interface Props {
  commentId: string;
  className?: string;
}

const DeleteButton = ({ className, commentId }: Props) => {
  return <Button className={`${className} cursor-pointer`}>delete</Button>;
};

export default DeleteButton;
