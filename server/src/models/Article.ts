import { Schema, model, Document } from "mongoose";
import { ArticleModel } from "../types/models";

declare interface ArticleDocument extends ArticleModel, Document {
  createdAt: Date;
}

const ArticleSchema = new Schema<ArticleDocument>({
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  publishedAt: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => !isNaN(Date.parse(value)),
      message: "Invalid date format for publishedAt",
    },
  },
  source: {
    type: Object,
    required: true,
  },
  url: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => /^https?:\/\/.+\..+/.test(value),
      message: "Invalid URL format",
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) =>
        /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(value),
      message: "Invalid image URL format",
    },
  },
  description: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: false,
  },
  author: {
    type: String,
    required: false,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = model<ArticleDocument>("Article", ArticleSchema);

export default Article;
