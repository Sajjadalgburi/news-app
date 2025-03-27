import { gql } from "@/__generated__";

export const ARTICLES_FOR_HOMEPAGE = gql(`
displayTrendingArticles {
    title
    publishedAt
    url
    description
    content
    image
    author
    source {
      name
      id
    }
    comments {
      id
      articleId
      content
      user {
        id
        name
        email
      }
      upvote
      downvote
    }
  }`);
