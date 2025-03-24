import { ArticlesAPI } from "../api/datasource";

/**
 * Context type definition that provides type annotations for the resolver context object.
 * This ensures type safety when accessing data sources within GraphQL resolvers.
 */
export type DataSourceContext = {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  dataSources: {
    articlesAPI: ArticlesAPI;
  };
};
