/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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


export const SaveArticleMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SaveArticleMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SaveArticleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"saveArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<SaveArticleMutationMutation, SaveArticleMutationMutationVariables>;
export const LoginMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutationMutation, LoginMutationMutationVariables>;
export const RegisterMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RegisterMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"register"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]} as unknown as DocumentNode<RegisterMutationMutation, RegisterMutationMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const CreateCommentMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCommentMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCommentInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"article"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<CreateCommentMutationMutation, CreateCommentMutationMutationVariables>;
export const DeleteCommentMutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteCommentMutation"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteComment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"commentId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commentId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]}}]} as unknown as DocumentNode<DeleteCommentMutationMutation, DeleteCommentMutationMutationVariables>;
export const DisplayTrendingArticlesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DisplayTrendingArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayTrendingArticles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<DisplayTrendingArticlesQuery, DisplayTrendingArticlesQueryVariables>;
export const GetCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"category"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;
export const GetArticlesBasedOnSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetArticlesBasedOnSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"question"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getArticlesBasedOnSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"question"},"value":{"kind":"Variable","name":{"kind":"Name","value":"question"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]} as unknown as DocumentNode<GetArticlesBasedOnSearchQuery, GetArticlesBasedOnSearchQueryVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSingleArticle"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"article"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"publishedAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"ai"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worthinessRating"}},{"kind":"Field","name":{"kind":"Name","value":"summarizedContent"}},{"kind":"Field","name":{"kind":"Name","value":"biasReasoning"}},{"kind":"Field","name":{"kind":"Name","value":"biasRating"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const QueryAiAnalasisDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryAiAnalasis"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAIAnalysis"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"articleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"articleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"ai"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"worthinessRating"}},{"kind":"Field","name":{"kind":"Name","value":"summarizedContent"}},{"kind":"Field","name":{"kind":"Name","value":"biasReasoning"}},{"kind":"Field","name":{"kind":"Name","value":"biasRating"}}]}}]}}]}}]} as unknown as DocumentNode<QueryAiAnalasisQuery, QueryAiAnalasisQueryVariables>;
export const GetSingleUserQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSingleUserQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"articleId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"upvotes"}},{"kind":"Field","name":{"kind":"Name","value":"downvotes"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetSingleUserQueryQuery, GetSingleUserQueryQueryVariables>;