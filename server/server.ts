// npm install @apollo/server express graphql cors
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import { resolvers } from "./graphql/reslovers";
import fs from "fs";
import path from "path";
import connection from "./database/db";
import "dotenv/config";
import { ArticlesAPI } from "./datasource/index";

const PORT = process.env.PORT || 5000;

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

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    "/graphql",
    /**
     * expressMiddleware accepts the same arguments:
     * an Apollo Server instance and optional configuration options
     */
    expressMiddleware(server, {
      context: async () => {
        const { cache } = server;
        return { dataSources: { articlesAPI: new ArticlesAPI({ cache }) } };
      },
    }),
  );

  connection.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startServer();
