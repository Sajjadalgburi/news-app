/**
 * This file will hold all of our backend data types that are needed for type annotations
 */

import { ArticleModel } from "./models";

export type categoryTypes =
  | "business"
  | "entertainment"
  | "general"
  | "health"
  | "science"
  | "sports"
  | "technology";

/**
 * The type which represents the News API returned object
 */
export type NewsAPIResponse = {
  status: string;
  totalResults: number;
  articles: ArticleModel[];
};
