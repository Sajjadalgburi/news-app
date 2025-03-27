import { RESTDataSource } from "@apollo/datasource-rest";
import "dotenv/config";
import { categoryTypes, NewsAPIResponse } from "../types";
import { ArticleModel } from "../types/models";
import { getToday, goBackFiveDays } from "../helpers/date-helpers";
const apiKey = process.env.NEWS_API_KEY;

/**
 * This is the datasource class that will be used and passed as context for graphql.
 * There are various methods for fetching specific things
 */

const newsOutlets =
  "domains=wsj.com,techcrunch.com,thenextweb.com,bbc.com,cnn.com,nytimes.com,guardian.co.uk,aljazeera.com,reuters.com,forbes.com,bloomberg.com,bbc.co.uk,washingtonpost.com";
export class ArticlesAPI extends RESTDataSource {
  baseURL = `https://newsapi.org/v2/everything?apiKey=${apiKey}&sortBy=popularity&${newsOutlets}&from=${goBackFiveDays()}&to=${getToday()}`;

  async getHomePageArticles(): Promise<ArticleModel[]> {
    const response = await this.get<NewsAPIResponse>("");
    return response.articles;
  }

  /**
   * Pass in a specific category and this will return a proper url where we can get the results
   * We can make a method for every category but there is no point. FOLLOW DRY (dont repeat yourself)
   * @param category
   * @returns An array of articles in the given catagory
   */
  async getCategory(category: categoryTypes): Promise<ArticleModel[]> {
    const response = await this.get<NewsAPIResponse>(
      `?apiKey=${apiKey}&sortBy=relevance&${newsOutlets}&from=${goBackFiveDays()}&to=${getToday()}&q=${encodeURIComponent(
        category,
      )}`,
    );
    return response.articles;
  }

  /**
   * This get method will fetch artciles based on a given question query
   * @param question
   * @returns
   */
  async getArticlesBasedOnSearch(
    question: string,
  ): Promise<ArticleModel[] | null> {
    const response = await this.get<NewsAPIResponse>(
      `?apiKey=${apiKey}&sortBy=popularity&from=${goBackFiveDays()}&to=${getToday()}&q=${encodeURIComponent(
        question,
      )}`,
    );

    if (!response.articles.length || response.status !== "ok") {
      return null;
    }

    return response.articles;
  }
}
