"use client";

import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache();
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache,
});

/**
 * This component will wrap our layout components and provide the Apollo client to the app
 * We cannot do this via layout.tsx because we need to wrap the entire app with the ApolloProvider and we need 'use client'
 * otherwise, we will get error because the layout.tsx is server rendered and 'use client' is not allowed there
 * @param children
 */
const CustomApolloProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default CustomApolloProvider;
