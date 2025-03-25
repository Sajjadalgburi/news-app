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
};

export type SourceModel = {
  name: string;
  id?: string;
};

export type UserModel = {
  id: string;
  name: string;
  email: string;
  comments?: CommentModel[];
};

export type CommentModel = {
  id: string;
  articleUrl: string;
  content: string;
  userId: string;
  upvote?: number;
  downvote?: number;
};
