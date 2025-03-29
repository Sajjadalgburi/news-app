import { gql } from "@/__generated__";

export const SAVE_ARTICLE = gql(`
  mutation SaveArticleMutation($input: SaveArticleInput!) {
  saveArticle(input: $input) {
    success
    message
    status
  }
}`);

export const LOG_USER_IN = gql(`
  mutation LoginMutation($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    message
    token
    status
    user {
      id
      name
      email
      profilePicture
    }
  }
}`);

export const REGISTER_NEW_USER =
  gql(`mutation RegisterMutation($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    success
    message
    status
    token
    user {
      id
      name
      email
      profilePicture
    }
  }
}`);

/**
 * Mutation to logout the user from the application.
 * This will remove the JWT token from the local storage and set the user to null in the state.
 */
export const LOGOUT_USER = gql(`
  mutation logout {
  logout {
    success
    status
  }
}`);

export const CREATE_NEW_COMMENT = gql(`
  mutation CreateCommentMutation($input: CreateCommentInput!) {
  createComment(input: $input) {
    success
    message
    status
    article {
      comments {
        content
        id
        user {
          id
          name
          profilePicture
        }
      }
    }
  }
}`);

export const DELETE_COMMENT =
  gql(`mutation DeleteCommentMutation($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    success
    message
  }
}`);
