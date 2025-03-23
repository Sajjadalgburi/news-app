import { RESTDataSource } from "@apollo/datasource-rest";
import "dotenv/config";
const apiKey = process.env.NEWS_API_KEY;

/**
 * This is the datasource class that will be used and passed as context for graphql.
 * There are various methods for fetching specific things
 */
export class ArticlesAPI extends RESTDataSource {
  baseURL = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=us`;

  getHomePageArticles() {
    return this.get("");
  }

  /**
   * This will essentiall make a call to the news api and make a fetch based on the title of the clicked article
   * @param title
   * @returns url
   */
  getSingleArticle(title: string) {
    return this.get(`&q=${title}`);
  }

  /**
   * Pass in a specific catagory and this will return a proper url where we can get the results
   * We can make a method for every catagory but there is no point. FOLLOW DRY (dont repeat yourself)
   * @param catagory
   * @returns
   */
  getCatagory(catagory: string) {
    return this.get(`&catagory=${catagory}`);
  }

  getArticlesBasedOnSearch(q: string) {
    return this.get(`&q=${q}`);
  }
}
