import { Request, Response } from "express";
import { ArticlesAPI } from "../api/datasource";

/**
 * Context type definition that provides type annotations for the resolver context object.
 * This ensures type safety when accessing data sources within GraphQL resolvers.
 */
export type DataSourceContext = {
  expressObjects: {
    req: Request;
    res: Response;
  };
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  dataSources: {
    articlesAPI: ArticlesAPI;
  };
};
