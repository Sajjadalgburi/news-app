export const resolvers = {
  Query: {
    displayTrendingArticles: async (_, __, { dataSources }) => {
      const { articles } = await dataSources.articlesAPI.getHomePageArticles();

      // if the articles array is empty, then return empty array
      if (!articles.length) {
        return [];
      }

      return articles.map((article) => ({
        ...article,
        image: article.urlToImage,
      }));
    },
  },
};
