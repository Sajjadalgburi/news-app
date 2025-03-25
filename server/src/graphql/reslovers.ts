import { categoryTypes } from "../types";
import { Resolvers } from "../types/types"; // ! Note: if you dont see this, run `npm run gen` in ./server directory
import { createJwtToken } from "../utils/jwt";
import "dotenv/config";
import { Article, User } from "../models";
import { handleValidationErrors } from "../utils";

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
        // Before even creating a new user, check if the email is already in use
        const userExists = await User.findOne({
          email,
        });

        if (userExists) {
          return {
            success: false,
            message: `User with ${email} already exists`,
            status: 400,
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
            message: "Could not create user",
            status: 500,
          };
        }

        // Create a JWT token for the new user
        const token = createJwtToken({
          id: newUser.id,
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
          user: {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
          },
          token: token as string,
          success: true,
          message: "User created successfully!",
          status: 200,
        };
      } catch (error) {
        if (error.name === "ValidationError") {
          const messages = handleValidationErrors(error);

          return {
            success: false,
            message: messages,
            status: 400,
          };
        }

        return {
          success: false,
          message: Array.isArray(error)
            ? "Could not create user"
            : (error.toString() as string),
          status: 500,
        };
      }
    },
    saveArticle: async (_, { input }) => {
      try {
        // first, we need to double check our database, if the article already exists, then we must send back a response
        const foundArticle = await Article.findOne({
          title: input.title,
        });

        if (foundArticle) {
          return {
            success: false,
            message: "Article already exists",
            status: 400,
          };
        }

        // ----- else, we now save the article -----

        const articleData = {
          ...input,
          // If source is an object, ensure it's properly saved (example for ORM models)
          source: {
            name: input.source.name,
            id: input.source.id,
          },
        };

        // Save the new article
        const newArticle = new Article(articleData);
        await newArticle.save(); // Ensure saving is awaited

        return {
          success: true,
          message: "Article saved successfully",
          status: 200,
        };
      } catch (error) {
        if (error.name === "ValidationError") {
          const messages = handleValidationErrors(error);

          return {
            success: false,
            message: messages,
            status: 400,
          };
        }

        return {
          success: false,
          message: Array.isArray(error)
            ? "Could not create user"
            : (error.toString() as string),
          status: 500,
        };
      }
    },
  },
};
