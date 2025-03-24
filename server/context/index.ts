import { ArticlesAPI } from "../datasource";

/**
 * Context type definition that provides type annotations for the resolver context object.
 * This ensures type safety when accessing data sources within GraphQL resolvers.
 */
export type DataSourceContext = {
  dataSources: {
    articlesAPI: ArticlesAPI;
  };
};
