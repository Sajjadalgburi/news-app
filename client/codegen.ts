import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // ! Schema might be pointing to a remote server, so we need to specify the URL
  schema:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/graphql"
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`,
  documents: ["./graphql/**/*.ts"],
  generates: {
    "./__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./__generated__/types.ts": {
      plugins: ["typescript", "typescript-operations"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
