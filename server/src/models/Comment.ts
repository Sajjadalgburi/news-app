import { Schema, model, Document } from "mongoose";
import { CommentModel } from "../types/models";
import User from "./User";
import Article from "./Article";

interface CommentDocument extends Omit<CommentModel, "id">, Document {
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema<CommentDocument> = new Schema({
  articleId: {
    type: Schema.Types.ObjectId,
    required: [true, "The articleId must be provided"],
  },
  content: { type: String, required: [true, "Content is a required field"] },
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "Please provide the userId who created this comment"],
  }, // the user who made this comment
  upvote: { type: Number, default: 0 },
  downvote: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

/**
 * Middleware to update the Models that relay on the comment id field.
 * this is used to remove the comment id from the user and article models.
 */
commentSchema.pre("findOneAndDelete", async function (next) {
  const commentId = this.getQuery()._id;
  await User.updateMany({}, { $pull: { comments: commentId } });
  await Article.updateMany({}, { $pull: { comments: commentId } });
  next();
});

const Comment = model<CommentDocument>("Comment", commentSchema);

export default Comment;
