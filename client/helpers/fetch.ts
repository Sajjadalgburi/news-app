import { DocumentNode, useQuery } from "@apollo/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type UseFetchOptions = {
  gql: DocumentNode;
  options?: {
    variables?: Record<string, any>;
  };
};

/**
 * Custom hook to abstract the repetitive GraphQL query logic using Apollo Client.
 * @param gql - The GraphQL query
 * @param options - Additional query options, such as variables
 * @returns The data, loading, and error state
 */
const useFetch = ({ gql, options }: UseFetchOptions) => {
  if (!gql) throw new Error("GraphQL query (gql) is required");

  const { data, loading, error } = useQuery(gql, {
    variables: options?.variables ?? {},
  });

  return { data, loading, error };
};

export default useFetch;
