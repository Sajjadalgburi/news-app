export type ArticleModel = {
  title: string;
  publishedAt: string;
  source: string;
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
  password?: string;
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
