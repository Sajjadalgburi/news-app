import { RESTDataSource } from "@apollo/datasource-rest";
import "dotenv/config";
import { categoryTypes, NewsAPIResponse } from "../types";
import { ArticleModel } from "../types/models";
const apiKey = process.env.NEWS_API_KEY;

/**
 * This is the datasource class that will be used and passed as context for graphql.
 * There are various methods for fetching specific things
 */
export class ArticlesAPI extends RESTDataSource {
  // !
  // todo :  make sure to change country back to 'ca'
  // !
  baseURL = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;

  async getHomePageArticles(): Promise<ArticleModel[]> {
    const response = await this.get<NewsAPIResponse>("");
    return response.articles;
  }

  /**
   * This will essentiall make a call to the news api and make a fetch based on the title of the clicked article
   * @param title
   * @returns single array[0]. This is the value closest to the search
   */
  async getSingleArticle(title: string): Promise<ArticleModel | null> {

    const response = await this.get<NewsAPIResponse>(
      `?apiKey=${apiKey}&country=us&q=${title}`
    );

    if (response.status !== "ok" || !response.articles.length) {
      return null; // Ensures we don't return undefined
    }

    return response.articles[0]; // Return the first article
  }

  /**
   * Pass in a specific category and this will return a proper url where we can get the results
   * We can make a method for every category but there is no point. FOLLOW DRY (dont repeat yourself)
   * @param category
   * @returns An array of articles in the given catagory
   */
  async getCategory(category: categoryTypes): Promise<ArticleModel[]> {
    const response = await this.get<NewsAPIResponse>(
      `?apiKey=${apiKey}&country=us&category=${category}`
    );
    return response.articles;
  }

  /**
   * This get method will fetch artciles based on a given question query
   * @param question
   * @returns
   */
  async getArticlesBasedOnSearch(question: string): Promise<ArticleModel[]> {
    const response = await this.get<NewsAPIResponse>(
      `?apiKey=${apiKey}&country=us&q=${encodeURIComponent(question)}`
    );
    return response.articles;
  }
}
