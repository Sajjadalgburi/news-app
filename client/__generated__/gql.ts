/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation SaveArticleMutation($input: SaveArticleInput!) {\n  saveArticle(input: $input) {\n    success\n    message\n    status\n  }\n}": typeof types.SaveArticleMutationDocument,
    "\n  mutation LoginMutation($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    message\n    token\n    status\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}": typeof types.LoginMutationDocument,
    "mutation RegisterMutation($name: String!, $email: String!, $password: String!) {\n  register(name: $name, email: $email, password: $password) {\n    success\n    message\n    status\n    token\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}": typeof types.RegisterMutationDocument,
    "\n  mutation logout {\n  logout {\n    success\n    status\n  }\n}": typeof types.LogoutDocument,
    "\n  mutation CreateCommentMutation($input: CreateCommentInput!) {\n  createComment(input: $input) {\n    success\n    message\n    status\n    article {\n      comments {\n        content\n        id\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n    }\n  }\n}": typeof types.CreateCommentMutationDocument,
    "mutation DeleteCommentMutation($commentId: ID!) {\n  deleteComment(commentId: $commentId) {\n    success\n    message\n  }\n}": typeof types.DeleteCommentMutationDocument,
    "\n  query DisplayTrendingArticles {\n    displayTrendingArticles {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n": typeof types.DisplayTrendingArticlesDocument,
    "\n  query GetCategory($category: String!) {\n    getCategory(category: $category) {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n": typeof types.GetCategoryDocument,
    "\n  query GetMe {\n  me {\n    user {\n      id\n      name\n      email\n    }\n    success\n    message\n    status\n  }\n}\n": typeof types.GetMeDocument,
    "\n  query GetArticlesBasedOnSearch($question: String!) {\n  getArticlesBasedOnSearch(question: $question) {\n    title\n    publishedAt\n    source {\n      name\n      id\n    }\n    url\n    description\n    content\n    image\n    author\n  }\n}": typeof types.GetArticlesBasedOnSearchDocument,
    "query Query($input: String!) {\n  getSingleArticle(input: $input) {\n    message\n    status\n    article {\n      id\n      title\n      publishedAt\n      source {\n        name\n        id\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n      url\n      description\n      content\n      image\n      author\n      ai {\n        worthinessRating\n        summarizedContent\n        biasReasoning\n        biasRating\n        createdAt\n      }\n    }\n    \n  }\n}": typeof types.QueryDocument,
    "\n  query QueryAiAnalasis($content: String!, $articleId: ID!) {\n  getAIAnalysis(content: $content, articleId: $articleId) {\n    status\n    message\n    success\n    ai {\n      worthinessRating\n      summarizedContent\n      biasReasoning\n      biasRating\n    }\n  }\n}": typeof types.QueryAiAnalasisDocument,
    "query GetSingleUserQuery($userId: ID!) {\n  getUser(userId: $userId) {\n    id\n    name\n    email\n    profilePicture\n    comments {\n      id\n      articleId\n      content\n      upvotes\n      downvotes\n      createdAt\n      user {\n        id\n        name\n        email\n        profilePicture\n      }\n    }\n  }\n}": typeof types.GetSingleUserQueryDocument,
};
const documents: Documents = {
    "\n  mutation SaveArticleMutation($input: SaveArticleInput!) {\n  saveArticle(input: $input) {\n    success\n    message\n    status\n  }\n}": types.SaveArticleMutationDocument,
    "\n  mutation LoginMutation($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    message\n    token\n    status\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}": types.LoginMutationDocument,
    "mutation RegisterMutation($name: String!, $email: String!, $password: String!) {\n  register(name: $name, email: $email, password: $password) {\n    success\n    message\n    status\n    token\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}": types.RegisterMutationDocument,
    "\n  mutation logout {\n  logout {\n    success\n    status\n  }\n}": types.LogoutDocument,
    "\n  mutation CreateCommentMutation($input: CreateCommentInput!) {\n  createComment(input: $input) {\n    success\n    message\n    status\n    article {\n      comments {\n        content\n        id\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n    }\n  }\n}": types.CreateCommentMutationDocument,
    "mutation DeleteCommentMutation($commentId: ID!) {\n  deleteComment(commentId: $commentId) {\n    success\n    message\n  }\n}": types.DeleteCommentMutationDocument,
    "\n  query DisplayTrendingArticles {\n    displayTrendingArticles {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n": types.DisplayTrendingArticlesDocument,
    "\n  query GetCategory($category: String!) {\n    getCategory(category: $category) {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n": types.GetCategoryDocument,
    "\n  query GetMe {\n  me {\n    user {\n      id\n      name\n      email\n    }\n    success\n    message\n    status\n  }\n}\n": types.GetMeDocument,
    "\n  query GetArticlesBasedOnSearch($question: String!) {\n  getArticlesBasedOnSearch(question: $question) {\n    title\n    publishedAt\n    source {\n      name\n      id\n    }\n    url\n    description\n    content\n    image\n    author\n  }\n}": types.GetArticlesBasedOnSearchDocument,
    "query Query($input: String!) {\n  getSingleArticle(input: $input) {\n    message\n    status\n    article {\n      id\n      title\n      publishedAt\n      source {\n        name\n        id\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n      url\n      description\n      content\n      image\n      author\n      ai {\n        worthinessRating\n        summarizedContent\n        biasReasoning\n        biasRating\n        createdAt\n      }\n    }\n    \n  }\n}": types.QueryDocument,
    "\n  query QueryAiAnalasis($content: String!, $articleId: ID!) {\n  getAIAnalysis(content: $content, articleId: $articleId) {\n    status\n    message\n    success\n    ai {\n      worthinessRating\n      summarizedContent\n      biasReasoning\n      biasRating\n    }\n  }\n}": types.QueryAiAnalasisDocument,
    "query GetSingleUserQuery($userId: ID!) {\n  getUser(userId: $userId) {\n    id\n    name\n    email\n    profilePicture\n    comments {\n      id\n      articleId\n      content\n      upvotes\n      downvotes\n      createdAt\n      user {\n        id\n        name\n        email\n        profilePicture\n      }\n    }\n  }\n}": types.GetSingleUserQueryDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation SaveArticleMutation($input: SaveArticleInput!) {\n  saveArticle(input: $input) {\n    success\n    message\n    status\n  }\n}"): (typeof documents)["\n  mutation SaveArticleMutation($input: SaveArticleInput!) {\n  saveArticle(input: $input) {\n    success\n    message\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation LoginMutation($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    message\n    token\n    status\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}"): (typeof documents)["\n  mutation LoginMutation($email: String!, $password: String!) {\n  login(email: $email, password: $password) {\n    message\n    token\n    status\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation RegisterMutation($name: String!, $email: String!, $password: String!) {\n  register(name: $name, email: $email, password: $password) {\n    success\n    message\n    status\n    token\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}"): (typeof documents)["mutation RegisterMutation($name: String!, $email: String!, $password: String!) {\n  register(name: $name, email: $email, password: $password) {\n    success\n    message\n    status\n    token\n    user {\n      id\n      name\n      email\n      profilePicture\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation logout {\n  logout {\n    success\n    status\n  }\n}"): (typeof documents)["\n  mutation logout {\n  logout {\n    success\n    status\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateCommentMutation($input: CreateCommentInput!) {\n  createComment(input: $input) {\n    success\n    message\n    status\n    article {\n      comments {\n        content\n        id\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n    }\n  }\n}"): (typeof documents)["\n  mutation CreateCommentMutation($input: CreateCommentInput!) {\n  createComment(input: $input) {\n    success\n    message\n    status\n    article {\n      comments {\n        content\n        id\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "mutation DeleteCommentMutation($commentId: ID!) {\n  deleteComment(commentId: $commentId) {\n    success\n    message\n  }\n}"): (typeof documents)["mutation DeleteCommentMutation($commentId: ID!) {\n  deleteComment(commentId: $commentId) {\n    success\n    message\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query DisplayTrendingArticles {\n    displayTrendingArticles {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query DisplayTrendingArticles {\n    displayTrendingArticles {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategory($category: String!) {\n    getCategory(category: $category) {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategory($category: String!) {\n    getCategory(category: $category) {\n      title\n      publishedAt\n      url\n      description\n      content\n      image\n      author\n      source {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetMe {\n  me {\n    user {\n      id\n      name\n      email\n    }\n    success\n    message\n    status\n  }\n}\n"): (typeof documents)["\n  query GetMe {\n  me {\n    user {\n      id\n      name\n      email\n    }\n    success\n    message\n    status\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetArticlesBasedOnSearch($question: String!) {\n  getArticlesBasedOnSearch(question: $question) {\n    title\n    publishedAt\n    source {\n      name\n      id\n    }\n    url\n    description\n    content\n    image\n    author\n  }\n}"): (typeof documents)["\n  query GetArticlesBasedOnSearch($question: String!) {\n  getArticlesBasedOnSearch(question: $question) {\n    title\n    publishedAt\n    source {\n      name\n      id\n    }\n    url\n    description\n    content\n    image\n    author\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query Query($input: String!) {\n  getSingleArticle(input: $input) {\n    message\n    status\n    article {\n      id\n      title\n      publishedAt\n      source {\n        name\n        id\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n      url\n      description\n      content\n      image\n      author\n      ai {\n        worthinessRating\n        summarizedContent\n        biasReasoning\n        biasRating\n        createdAt\n      }\n    }\n    \n  }\n}"): (typeof documents)["query Query($input: String!) {\n  getSingleArticle(input: $input) {\n    message\n    status\n    article {\n      id\n      title\n      publishedAt\n      source {\n        name\n        id\n      }\n      comments {\n        id\n        content\n        createdAt\n        user {\n          id\n          name\n          profilePicture\n        }\n      }\n      url\n      description\n      content\n      image\n      author\n      ai {\n        worthinessRating\n        summarizedContent\n        biasReasoning\n        biasRating\n        createdAt\n      }\n    }\n    \n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query QueryAiAnalasis($content: String!, $articleId: ID!) {\n  getAIAnalysis(content: $content, articleId: $articleId) {\n    status\n    message\n    success\n    ai {\n      worthinessRating\n      summarizedContent\n      biasReasoning\n      biasRating\n    }\n  }\n}"): (typeof documents)["\n  query QueryAiAnalasis($content: String!, $articleId: ID!) {\n  getAIAnalysis(content: $content, articleId: $articleId) {\n    status\n    message\n    success\n    ai {\n      worthinessRating\n      summarizedContent\n      biasReasoning\n      biasRating\n    }\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "query GetSingleUserQuery($userId: ID!) {\n  getUser(userId: $userId) {\n    id\n    name\n    email\n    profilePicture\n    comments {\n      id\n      articleId\n      content\n      upvotes\n      downvotes\n      createdAt\n      user {\n        id\n        name\n        email\n        profilePicture\n      }\n    }\n  }\n}"): (typeof documents)["query GetSingleUserQuery($userId: ID!) {\n  getUser(userId: $userId) {\n    id\n    name\n    email\n    profilePicture\n    comments {\n      id\n      articleId\n      content\n      upvotes\n      downvotes\n      createdAt\n      user {\n        id\n        name\n        email\n        profilePicture\n      }\n    }\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;