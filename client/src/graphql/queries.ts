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
