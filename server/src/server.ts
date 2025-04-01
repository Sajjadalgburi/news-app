// npm install @apollo/server express graphql cors
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { resolvers } from "./graphql/reslovers";
import connection from "./database/db";
import { ArticlesAPI } from "./api/datasource";
import { validateJwtToken } from "./utils/jwt";
import cookieParser from "cookie-parser";
import { typeDefs } from "./graphql/schema";
import { VercelRequest, VercelResponse } from "@vercel/node";

// Required logic for integrating with Express
const app = express();

// Same ApolloServer initialization as before
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Start the Apollo server immediately for serverless environment
const startServer = async () => {
  await server.start();

  // Middleware configuration
  app.use(cookieParser());
  // app.use(
  //   cors({
  //     origin:
  //       process.env.NODE_ENV !== "production"
  //         ? "http://localhost:3000"
  //         : process.env.FRONTEND_URL,
  //     credentials: true,
  //   }),
  // );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // MongoDB connection - only attempt once for serverless
  try {
    // For serverless we want to make sure the DB connection is established
    await new Promise<void>((resolve, reject) => {
      connection.once("open", () => {
        console.log("MongoDB connected successfully");
        resolve();
      });
      connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
        reject(err);
      });
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    // Continue anyway to avoid function hanging
  }

  app.use(
    "/graphql",
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
          user: user || null,
          dataSources: { articlesAPI: new ArticlesAPI({ cache }) },
        };
      },
    }),
  );

  // Add a health check endpoint
  app.get("/api/health", (req, res) => {
    res.status(200).send("Server is running");
  });
  app.get("/", (req, res) => {
    res.send("News API Backend is running! Try /graphql endpoint.");
  });
  // For local development
  if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`
🚀  Server is running!
📭  Query at http://localhost:${PORT}/graphql
      `);
    });
  }

  return app;
};

// Start server and expose it for Vercel's serverless functions
let serverPromise = startServer();

export default async (req: VercelRequest, res: VercelResponse) => {
  const appInstance = await serverPromise;
  return appInstance(req, res);
};
