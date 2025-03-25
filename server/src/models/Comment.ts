import { Schema, model, Document } from "mongoose";
import { CommentModel } from "../types/models";

interface CommentDocument extends Omit<CommentModel, "id">, Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema<CommentDocument> = new Schema({
  articleUrl: {
    type: String,
    required: [true, "The article URL must be provided"],
  }, // the article URL this comment is associated with
  content: { type: String, required: [true, "Content is a required field"] },
  userId: {
    type: String,
    required: [true, "Please provide the userId who created this comment"],
  }, // the user who made this comment
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: [
      true,
      "Please make sure to update this value when a comment is edited",
    ],
  },
});

const Comment = model<CommentDocument>("Comment", commentSchema);

export default Comment;
