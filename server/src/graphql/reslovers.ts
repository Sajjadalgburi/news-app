import { categoryTypes } from "../types";
import { Resolvers } from "../types/types"; // ! Note: if you dont see this, run `npm run gen` in ./server directory
import { createJwtToken } from "../utils/jwt";
import "dotenv/config";
import { User } from "../models";

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
      { expressObjects: { res } },
    ) => {
      try {
        // todo: Before even creating a new user, check if the email is already in use

        const userExists = await User.findOne({
          email,
        });

        if (userExists) {
          return {
            success: false,
            message: `User with ${email} already exists`,
          };
        }

        // Save the new user into MongoDB
        const newUser = await User.create({
          email,
          password,
          name,
        });

        if (!newUser) {
          return {
            success: false,
            message: "User creation failed due to unknown error",
          };
        }

        // Create a JWT token for the new user
        const token = createJwtToken({
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        });

        // Store the JWT token in cookies
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 60 * 1000,
        });

        return {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
          success: true,
          message: "User created successfully!",
        };
      } catch (error) {
        console.error("Registration Error:", error);
        return { success: false };
      }
    },
  },
};
