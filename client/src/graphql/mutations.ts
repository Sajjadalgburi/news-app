import { gql } from "@/__generated__";

export const SAVE_ARTICLE = gql(`
  mutation SaveArticleMutation($input: SaveArticleInput!) {
  saveArticle(input: $input) {
    success
    message
    status
  }
}`);
