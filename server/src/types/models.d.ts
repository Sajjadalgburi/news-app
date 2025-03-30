import { Schema } from "mongoose";
import { ArtificialIntelligenceType } from "./types";

export type ArticleModel = {
  title: string;
  publishedAt: string;
  source: SourceModel;
  url: string;
  urlToImage: string;
  description?: string;
  content?: string;
  image?: string;
  author?: string;
  comments?: CommentModel[];
  ai: ArtificialIntelligenceType;
};

export type SourceModel = {
  name: string;
  id?: string;
};

export type UserModel = {
  id: string;
  name: string;
  email?: string;
  comments?: CommentModel[];
};

export type CommentModel = {
  id: string; // current Id of the comment
  articleId: Schema.Types.ObjectId; // the Id of the article
  content: string;
  userId: string | Schema.Types.ObjectId;
  upvotes?: number;
  downvotes?: number;
};
