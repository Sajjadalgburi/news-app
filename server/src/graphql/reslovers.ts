import "dotenv/config";
import { categoryTypes } from "../types";
import { Resolvers } from "../types/types"; // ! Note: if you dont see this, run `npm run gen` in ./server directory
import { createJwtToken, validateJwtToken } from "../utils/jwt";
import { Article, User, Comment } from "../models";
import { handleValidationErrors } from "../utils";
import analyzeArticle from "../api/openai";

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

    getAIAnalysis: async (_, { content, articleId }) => {
      try {
        // First, check if the article exists in the database
        const findArticle = await Article.findById(articleId);

        if (!findArticle) {
          return {
            success: false,
            message: "Article not found",
            status: 404,
          };
        }

        // Second, check if the article has already been analyzed
        // If it has, return the existing analysis
        if (findArticle.ai !== undefined) {
          return {
            success: true,
            message: "Article already analyzed",
            status: 200,
            ai: findArticle.ai,
          };
        }

        // Analyze the article using AI
        const res = await analyzeArticle(content);

        if (!res) {
          return {
            success: false,
            message: "Could not analyze article",
            status: 500,
          };
        }

        // Update the article with the AI analysis
        const updateArticle = await Article.findByIdAndUpdate(
          articleId,
          {
            ai: {
              biasRating: res.biasRating,
              worthinessRating: res.worthinessRating,
              summarizedContent: res.summarizedContent, // Fixed typo
            },
          },
          { new: true, runValidators: true },
        );

        if (!updateArticle) {
          return {
            success: false,
            message: "Failed to update article with AI analysis",
            status: 500,
          };
        }

        return {
          ai: updateArticle.ai, // Return updated AI analysis
          success: true,
          message: "Updated article to include AI analysis",
          status: 200,
        };
      } catch (error) {
        console.error("Error analyzing article:", error);
        return {
          success: false,
          message: "Could not analyze article",
          status: 500,
        };
      }
    },

    getSingleArticle: async (_, { input }) => {
      try {
        const foundArticle = await Article.findOne({
          title: input,
        });

        if (!foundArticle) {
          return {
            success: false,
            message: "Article not found",
            status: 404,
          };
        }

        // Fetch all comments for the article and populate user info
        const populatedComments = await Promise.all(
          foundArticle.comments.map(async (commentId) => {
            const comment = await Comment.findById(commentId);
            if (!comment) return null;

            const commentUser = await User.findById(comment.userId);

            return {
              id: comment._id.toString(),
              content: comment.content,
              createdAt: comment.createdAt,
              userId: comment.userId,
              articleId: comment.articleId,
              user: {
                id: commentUser._id.toString(),
                name: commentUser.name,
                profilePicture: commentUser.profilePicture,
              },
            };
          }),
        );

        // Filter out any null values (in case a comment was deleted)
        const filteredComments = populatedComments.filter(
          (comment) => comment !== null,
        );

        return {
          message: "Article found",
          article: {
            ...foundArticle.toObject(), // Convert Mongoose document to plain object
            id: foundArticle._id.toString(), // Convert ObjectId to string
            comments: filteredComments, // Attach populated comments
          },
          success: true,
          status: 200,
        };
      } catch (error) {
        return {
          message: "Could not find article",
          success: false,
          status: 500,
        };
      }
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

    me: async (_, __, { user, expressObjects: { req } }) => {
      try {
        const token = req.cookies.accessToken; // Get the token from cookies

        if (!token) {
          return {
            message: "You are not logged in",
            status: 401,
            success: false,
            user: null,
          };
        }

        const verifyToken = validateJwtToken(token);

        return {
          message: "User found",
          success: true,
          user: { ...verifyToken },
          status: 200,
        };
      } catch (error) {
        console.error("Error validating token:", error);
        return {
          message: "Could not find user",
          status: 500,
          success: false,
          user: null,
        };
      }
    },
    getUser: async (_, { userId }, { user }) => {
      try {
        const findUser = await User.findById(userId).populate("comments");

        if (!findUser || !user) {
          return null;
        }

        const foundUserToComment = findUser.comments.map((comment) => {
          return {
            id: comment.id.toString(),
            articleId: comment.articleId,
            content: comment.content,
            createdAt: comment.createdAt,
            userId: comment.userId,
            user: {
              id: findUser._id.toString(),
              name: findUser.name,
              email: findUser.email,
              profilePicture: findUser.profilePicture,
            },
          };
        });

        return {
          id: findUser._id.toString(),
          name: findUser.name,
          email: findUser.email,
          profilePicture: findUser.profilePicture,
          comments: [...foundUserToComment],
        };
      } catch (error) {
        return null;
      }
    },
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
            message: `${email} is already in use`,
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
            profilePicture: newUser.profilePicture,
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
    login: async (_, { email, password }, { expressObjects: { res } }) => {
      try {
        // Before even creating a new user, check if the email exists
        const userExists = await User.findOne({
          email,
        });

        if (!userExists) {
          return {
            success: false,
            message: `user with ${email} does not exist`,
            status: 400,
          };
        }

        // Check if the password is correct
        const isPasswordValid = await userExists.checkUserPassword(password);

        if (!isPasswordValid) {
          return {
            success: false,
            message: "Incorrect password",
            status: 400,
          };
        }

        // Create a JWT token for the new user
        const token = createJwtToken({
          id: userExists.id,
          email: userExists.email,
          name: userExists.name,
        });

        // Store the JWT token in cookies
        res.cookie("accessToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 60 * 1000,
        });

        return {
          token: token as string,
          success: true,
          message: "You will be logged in shortly!",
          status: 200,
          user: {
            id: userExists.id,
            email: userExists.email,
            name: userExists.name,
            profilePicture: userExists.profilePicture,
          },
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
            ? "Could not create article"
            : (error.toString() as string),
          status: 500,
        };
      }
    },
    createComment: async (_, { input }, { user }) => {
      try {
        // Check if user is logged in. If not, return an error because they are not authorized to create a comment
        if (!user) {
          return {
            success: false,
            message: "You must be logged in to create a comment",
            status: 401,
          };
        }

        // Validate that article exists
        const article = await Article.findById(input.articleId);
        if (!article) {
          return {
            success: false,
            message: "Article not found",
            status: 404,
          };
        }

        // Add logic so user does not comment more than 5 times for the same article
        const userAlreadyCommented = await Comment.find({
          userId: user.id,
          articleId: input.articleId, // Added this line to check comments for this specific article
        });

        if (userAlreadyCommented.length >= 5) {
          // Changed from 6 to 5 based on the requirement
          return {
            success: false,
            message:
              "You have reached the maximum number of comments for this article",
            status: 400,
          };
        }

        // ----- Save the comment -----
        const commentData = {
          ...input,
          userId: user.id,
        };

        // Save the new comment
        const newComment = new Comment(commentData);
        await newComment.save();

        // Update the article with the new comment
        article.comments = article.comments || [];
        article.comments.push(newComment.id);
        await article.save();

        // Update the user's comments array
        const foundUser = await User.findById(user.id);
        foundUser.comments = foundUser.comments || [];
        foundUser.comments.push(newComment.id);
        await foundUser.save();

        // Fetch all comments for the article and populate user info
        const populatedComments = await Promise.all(
          article.comments.map(async (commentId) => {
            const comment = await Comment.findById(commentId);
            if (!comment) return null;

            const commentUser = await User.findById(comment.userId);

            return {
              id: comment._id.toString(),
              content: comment.content,
              createdAt: comment.createdAt,
              userId: comment.userId,
              articleId: comment.articleId,
              user: {
                id: commentUser._id.toString(),
                name: commentUser.name,
                profilePicture: commentUser.profilePicture,
              },
            };
          }),
        );

        // Filter out any null values (in case a comment was deleted)
        const filteredComments = populatedComments.filter(
          (comment) => comment !== null,
        );

        // Return success response with properly formatted comments
        return {
          success: true,
          message: "Comment created successfully",
          status: 200,
          article: {
            ...article,
            comments: filteredComments,
          },
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
          message: "Could not create comment: " + error.toString(),
          status: 500,
        };
      }
    },
    logout: async (_, __, { expressObjects: { res } }) => {
      try {
        // Clear the accessToken cookie
        res.clearCookie("accessToken", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        // return success response
        return {
          message: "Logged out successfully",
          status: 200,
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          message: "Error in the catch block for logout resolver",
          status: 500,
        };
      }
    },
    deleteComment: async (_, { commentId }, { user }) => {
      try {
        if (!user) {
          return {
            success: false,
            message: "You must be logged in to delete a comment",
            status: 401,
          };
        }

        const findComment = await Comment.findByIdAndDelete(commentId);
        if (!findComment) {
          return {
            success: false,
            message: "Comment not found",
            status: 404,
          };
        }

        return {
          success: true,
          message: "Comment deleted successfully",
          status: 200,
        };
      } catch (error) {
        return {
          success: false,
          message: "Error occured during deleting comment process",
          status: 500,
        };
      }
    },

    // todo: this is just a small feature, we can add it later;
    // upvoteComment: async (_, { commentId }, { user }) => {
    //   try {
    //     if (!user) {
    //       return {
    //         success: false,
    //         message: "You must be logged in to upvote a comment",
    //         status: 401,
    //       };
    //     }

    //     const findComment = await Comment.findOne({ _id: commentId });

    //     if (user.id === findComment.userId) {
    //       return {
    //         success: false,
    //         message: "You Cannot upvote your own comment",
    //         status: 401,
    //       };
    //     }

    //     await Comment.findOneAndUpdate(
    //       { _id: commentId },
    //       {
    //         $inc: { upvotes: 1 },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       },
    //     );

    //     return {
    //       success: true,
    //       message: "Comment upvoted!",
    //       status: 200,
    //     };
    //   } catch (error) {
    //     return {
    //       success: false,
    //       message: "Error occured during upvoting comment process",
    //       status: 500,
    //     };
    //   }
    // },
  },
};
