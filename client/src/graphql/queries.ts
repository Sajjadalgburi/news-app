import { gql } from "@/__generated__";

/**
 * Fetches all articles for the homepage. These articles are trending.
 */
export const ARTICLES_FOR_HOMEPAGE = gql(`
  query Query {
    displayTrendingArticles {
      title
      publishedAt
      url
      description
      content
      image
      author
      source {
        id
        name
      }
    }
  }
`);

/**
 * Fetches all articles for a specific category.
 * @param category The category to fetch articles for.
 */
export const ARTICLES_FOR_CATEGORY = gql(`
  query Query($category: String!) {
    getCategory(category: $category) {
      title
      publishedAt
      url
      description
      content
      image
      author
      source {
        id
        name
      }
    }
  }
`);

/**
 * Will fetch the currently logged in user if they exist.
 */
export const GET_ME = gql(`
  query Query {
  me {
    user {
      id
      name
      email
    }
    success
    message
    status
  }
}
`);

/**
 * This query will fetch all articles based on a search query from a search bar or something related
 */
export const GET_ARTICLE_BASED_ON_SEARCH = gql(`
  query Query($question: String!) {
  getArticlesBasedOnSearch(question: $question) {
    title
    publishedAt
    source {
      name
      id
    }
    url
    description
    content
    image
    author
  }
}`);

// todo
/**
 * This query will fetch a single article based on the articles ID from mongoDB.
 * When the user clicks on an article, 1. the article will be saved into the database
 * 2. the article will be fetched from the database and displayed to the user.
 */
export const GET_SINGLE_ARTICLE = gql(``);
// todo
