/**
 * GraphQL Codegen Configuration
 *
 * This file configures the GraphQL Code Generator to:
 * 1. Parse the GraphQL schema from ./graphql/schema.graphql
 * 2. Generate TypeScript type definitions and resolver types
 * 3. Output the generated types to ./types/types.ts
 *
 */

import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./graphql/schema.graphql",
  generates: {
    "./types/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "../context/index#DataSourceContext",
        mappers: {
          // Track: "./models#TrackModel",
        },
      },
    },
  },
};

export default config;
