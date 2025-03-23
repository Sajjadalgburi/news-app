export const resolvers = {
  Query: {
    displayTrendingArticles: async (_, __, { dataSources }) => {
      const { articles } = await dataSources.articlesAPI.getHomePageArticles();
      return articles.map((article) => ({
        ...article,
        image: article.urlToImage,
      }));
    },
  },
};
