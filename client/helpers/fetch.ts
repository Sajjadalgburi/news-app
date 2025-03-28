import { ApolloError, DocumentNode, useQuery } from "@apollo/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UseFetchOptions = {
  variables?: Record<string, string | number>;
};

type Response = {
  data: any; // TODO: infer correct type
  loading: boolean;
  error: ApolloError | undefined;
};

/**
 * Custom hook to abstract the repetitive GraphQL query logic using Apollo Client.
 * @param gql - The GraphQL query
 * @param options - Additional query options, such as variables
 * @returns The data, loading, and error state
 */
const useFetch = (
  gql: DocumentNode,
  options: UseFetchOptions = {},
): Response => {
  if (!gql) throw new Error("GraphQL query (gql) is required");

  const { data, loading, error } = useQuery(gql, {
    variables: options.variables ?? {},
  });

  return { data: { ...data }, loading, error };
};

export default useFetch;
