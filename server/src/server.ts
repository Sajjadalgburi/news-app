// npm install @apollo/server express graphql cors
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { resolvers } from "./graphql/reslovers";
import fs from "fs";
import path from "path";
import connection from "./database/db";
import { ArticlesAPI } from "./api/datasource";
import { validateJwtToken } from "./utils/jwt";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT;

// Required logic for integrating with Express
const app = express();

// Same ApolloServer initialization as before, plus the drain plugin
// for our httpServer.
const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, "./graphql/schema.graphql"),
    "utf-8",
  ),
  resolvers,
});

const startServer = async () => {
  // Ensure we wait for our server to start
  await server.start();

  app.use(cookieParser()); // make sure to use parse the cookies before using them
  app.use(
    cors({
      origin:
        process.env.NODE_ENV !== "production" // Allow requests from the frontend
          ? "http://localhost:3000"
          : process.env.FRONTEND_URL, // Allow requests from Next.js
      credentials: true, // Allow cookies to be sent
    }), // cors only allows requests from the frontend and not from other domains
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/graphql",
    /**
     * expressMiddleware accepts the same arguments:
     * an Apollo Server instance and optional configuration options
     */
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const { cache } = server;
        const cookiesToken = req.cookies?.accessToken;

        if (!cookiesToken) {
          return {
            expressObjects: { req, res },
            user: null,
            dataSources: { articlesAPI: new ArticlesAPI({ cache }) },
          };
        }

        const user = validateJwtToken(cookiesToken);

        return {
          expressObjects: { req, res },
          user: user || null, // Ensure user is null if token validation fails
          dataSources: { articlesAPI: new ArticlesAPI({ cache }) },
        };
      },
    }),
  );

  connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`
    🚀  Server is running!
    📭  Query at ${
      process.env.NODE_ENV !== "production"
        ? `http://localhost:${PORT}/graphql`
        : `${process.env.BACKEND_URL}/graphql`
    }
    `);
    });
  });
};

startServer();
