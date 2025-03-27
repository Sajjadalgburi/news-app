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
  }
}`);
