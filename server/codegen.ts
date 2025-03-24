import type { CodegenConfig } from "@graphql-codegen/cli";

/**
 * GraphQL Codegen Configuration
 *
 * This file configures the GraphQL Code Generator to:
 * 1. Parse the GraphQL schema from ./graphql/schema.graphql
 * 2. Generate TypeScript type definitions and resolver types
 * 3. Output the generated types to ./types/types.ts
 *
 */
const config: CodegenConfig = {
  schema: "./graphql/schema.graphql",
  generates: {
    "./types/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context/index#DataSourceContext",
        mappers: {
          Article: "./types/models.d.ts#ArticleModel",
          User: "./types/models.d.ts#UserModel",
          Comment: "./types/models.d.ts#CommentModel",
          Source: "./types/models.d.ts#SourceModel",
        },
      },
    },
  },
};

export default config;
