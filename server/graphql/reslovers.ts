import { categoryTypes } from "../types";
import { Resolvers } from "../types/types"; // ! Note: if you dont see this, run `npm run gen` in ./server directory
import { createJwtToken } from "../utils/jwt";
import "dotenv/config";

export const resolvers: Resolvers = {
  Query: {
    displayTrendingArticles: async (_, __, { dataSources }) => {
      const articles = await dataSources.articlesAPI.getHomePageArticles();
      // if the articles array is empty, then return empty array
      if (!articles.length || articles.length === 0) {
        return [];
      }

      return articles.map((article) => ({
        ...article,
        image: article.urlToImage,
      }));
    },

    getCategory: async (
      _,
      {
        category,
      }: {
        category: categoryTypes;
      },
      { dataSources },
    ) => {
      const articles = await dataSources.articlesAPI.getCategory(category);

      // if the articles array is empty, then return empty array
      if (!articles.length || articles.length === 0) {
        return [];
      }

      return articles.map((article) => ({
        ...article,
        image: article.urlToImage,
      }));
    },

    getSingleArticle: async (_, { title }, { dataSources }) => {
      const article = await dataSources.articlesAPI.getSingleArticle(title);

      if (!article) {
        return null; // Return null instead of an empty array
      }

      return {
        ...article,
        image: article.urlToImage,
      };
    },

    getArticlesBasedOnSearch: async (_, { question }, { dataSources }) => {
      const articles = await dataSources.articlesAPI.getArticlesBasedOnSearch(
        question,
      );

      if (!articles) {
        return [];
      }

      return articles.map((article) => ({
        ...article,
        image: article.urlToImage,
      }));
    },

    // Todo: Implement the me query later with mongodb
    // me: async (_, __, {}) => {
    //   return {
    //     id: "1",
    //     email: "  ",
    //     username: "  ",
    //   };
    // },
  },

  Mutation: {
    register: async (
      _,
      { email, password, name },
      { user, expressObjects: { res } },
    ) => {
      try {
        // todo : first thing is to save the user into mongodb

        const successOperation = false;

        // if the operation was not successful, return false
        if (!successOperation) {
          return {
            success: false,
          };
        }

        // we need to then create a JWT token for the user
        const token = createJwtToken({ ...user });

        // lastly, we need to store the JWT token in the cookes
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.MODE === "production" ? true : false,
          sameSite: "strict",
          maxAge: 60 * 60 * 60 * 1000,
        });

        return {
          ...user,
          success: true,
        };
      } catch (error) {
        return {
          success: false,
        };
      }
    },
  },
};
