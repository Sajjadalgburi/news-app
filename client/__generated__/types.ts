export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
};

export type AiResponse = {
  __typename?: 'AIResponse';
  ai?: Maybe<ArtificialIntelligenceType>;
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type Article = {
  __typename?: 'Article';
  ai?: Maybe<ArtificialIntelligenceType>;
  author?: Maybe<Scalars['String']['output']>;
  comments?: Maybe<Array<Maybe<Comment>>>;
  content?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  publishedAt: Scalars['String']['output'];
  source: Source;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ArtificialIntelligenceType = {
  __typename?: 'ArtificialIntelligenceType';
  biasRating: Scalars['Int']['output'];
  biasReasoning: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  summarizedContent: Scalars['String']['output'];
  worthinessRating: Scalars['Int']['output'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  article?: Maybe<Article>;
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Comment = {
  __typename?: 'Comment';
  articleId: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['Date']['output']>;
  downvotes?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  upvotes?: Maybe<Scalars['Int']['output']>;
  user?: Maybe<User>;
};

export type CreateCommentInput = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
  createdAt?: InputMaybe<Scalars['String']['input']>;
  downvote?: InputMaybe<Scalars['Int']['input']>;
  upvote?: InputMaybe<Scalars['Int']['input']>;
  user: UserInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: AuthResponse;
  deleteComment: AuthResponse;
  login: AuthResponse;
  logout: AuthResponse;
  register: AuthResponse;
  saveArticle: AuthResponse;
  upvoteComment: AuthResponse;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSaveArticleArgs = {
  input: SaveArticleInput;
};


export type MutationUpvoteCommentArgs = {
  commentId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  displayTrendingArticles: Array<Maybe<Article>>;
  getAIAnalysis: AiResponse;
  getArticlesBasedOnSearch: Array<Maybe<Article>>;
  getCategory: Array<Article>;
  getSingleArticle: AuthResponse;
  getUser?: Maybe<User>;
  me: AuthResponse;
};


export type QueryGetAiAnalysisArgs = {
  articleId: Scalars['ID']['input'];
  content: Scalars['String']['input'];
};


export type QueryGetArticlesBasedOnSearchArgs = {
  question: Scalars['String']['input'];
};


export type QueryGetCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryGetSingleArticleArgs = {
  input: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID']['input'];
};

export type SaveArticleInput = {
  author?: InputMaybe<Scalars['String']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  publishedAt: Scalars['String']['input'];
  source: SourceInput;
  title: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type Source = {
  __typename?: 'Source';
  id?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type SourceInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  comments?: Maybe<Array<Maybe<Comment>>>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  profilePicture?: Maybe<Scalars['String']['output']>;
};

export type UserInput = {
  id: Scalars['ID']['input'];
};

export type SaveArticleMutationMutationVariables = Exact<{
  input: SaveArticleInput;
}>;


export type SaveArticleMutationMutation = { __typename?: 'Mutation', saveArticle: { __typename?: 'AuthResponse', success: boolean, message: string, status: number } };

export type LoginMutationMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutationMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthResponse', message: string, token?: string | null, status: number, user?: { __typename?: 'User', id: string, name: string, email?: string | null, profilePicture?: string | null } | null } };

export type RegisterMutationMutationVariables = Exact<{
  name: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutationMutation = { __typename?: 'Mutation', register: { __typename?: 'AuthResponse', success: boolean, message: string, status: number, token?: string | null, user?: { __typename?: 'User', id: string, name: string, email?: string | null, profilePicture?: string | null } | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'AuthResponse', success: boolean, status: number } };

export type CreateCommentMutationMutationVariables = Exact<{
  input: CreateCommentInput;
}>;


export type CreateCommentMutationMutation = { __typename?: 'Mutation', createComment: { __typename?: 'AuthResponse', success: boolean, message: string, status: number, article?: { __typename?: 'Article', comments?: Array<{ __typename?: 'Comment', content: string, id: string, createdAt?: any | null, user?: { __typename?: 'User', id: string, name: string, profilePicture?: string | null } | null } | null> | null } | null } };

export type DeleteCommentMutationMutationVariables = Exact<{
  commentId: Scalars['ID']['input'];
}>;


export type DeleteCommentMutationMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'AuthResponse', success: boolean, message: string } };

export type DisplayTrendingArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type DisplayTrendingArticlesQuery = { __typename?: 'Query', displayTrendingArticles: Array<{ __typename?: 'Article', title: string, publishedAt: string, url: string, description?: string | null, content?: string | null, image?: string | null, author?: string | null, source: { __typename?: 'Source', id?: string | null, name: string } } | null> };

export type GetCategoryQueryVariables = Exact<{
  category: Scalars['String']['input'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', getCategory: Array<{ __typename?: 'Article', title: string, publishedAt: string, url: string, description?: string | null, content?: string | null, image?: string | null, author?: string | null, source: { __typename?: 'Source', id?: string | null, name: string } }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'AuthResponse', success: boolean, message: string, status: number, user?: { __typename?: 'User', id: string, name: string, email?: string | null } | null } };

export type GetArticlesBasedOnSearchQueryVariables = Exact<{
  question: Scalars['String']['input'];
}>;


export type GetArticlesBasedOnSearchQuery = { __typename?: 'Query', getArticlesBasedOnSearch: Array<{ __typename?: 'Article', title: string, publishedAt: string, url: string, description?: string | null, content?: string | null, image?: string | null, author?: string | null, source: { __typename?: 'Source', name: string, id?: string | null } } | null> };

export type QueryQueryVariables = Exact<{
  input: Scalars['String']['input'];
}>;


export type QueryQuery = { __typename?: 'Query', getSingleArticle: { __typename?: 'AuthResponse', message: string, status: number, article?: { __typename?: 'Article', id?: string | null, title: string, publishedAt: string, url: string, description?: string | null, content?: string | null, image?: string | null, author?: string | null, source: { __typename?: 'Source', name: string, id?: string | null }, comments?: Array<{ __typename?: 'Comment', id: string, content: string, createdAt?: any | null, user?: { __typename?: 'User', id: string, name: string, profilePicture?: string | null } | null } | null> | null, ai?: { __typename?: 'ArtificialIntelligenceType', worthinessRating: number, summarizedContent: string, biasReasoning: string, biasRating: number, createdAt?: string | null } | null } | null } };

export type QueryAiAnalasisQueryVariables = Exact<{
  content: Scalars['String']['input'];
  articleId: Scalars['ID']['input'];
}>;


export type QueryAiAnalasisQuery = { __typename?: 'Query', getAIAnalysis: { __typename?: 'AIResponse', status: number, message: string, success: boolean, ai?: { __typename?: 'ArtificialIntelligenceType', worthinessRating: number, summarizedContent: string, biasReasoning: string, biasRating: number } | null } };

export type GetSingleUserQueryQueryVariables = Exact<{
  userId: Scalars['ID']['input'];
}>;


export type GetSingleUserQueryQuery = { __typename?: 'Query', getUser?: { __typename?: 'User', id: string, name: string, email?: string | null, profilePicture?: string | null, comments?: Array<{ __typename?: 'Comment', id: string, articleId: string, content: string, upvotes?: number | null, downvotes?: number | null, createdAt?: any | null, user?: { __typename?: 'User', id: string, name: string, email?: string | null, profilePicture?: string | null } | null } | null> | null } | null };
