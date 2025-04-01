import { ArticleModel } from "../types/models";

/**
 * Fake input for testing
 */
const fakeiInput: ArticleModel = {
  title: "Test",
  description: "Test",
  url: "https://test.com",
  urlToImage: "https://test.com/image.jpg",
  publishedAt: new Date().toISOString(), // 2025-03-25T10:23:31.803Z
  content: "Test",
  source: {
    id: "1",
    name: "Test",
  },
  ai: {
    biasRating: 9,
    biasReasoning: "some reason here",
    summarizedContent: "blah blahblah blahblah blahblah blahblah blah",
    worthinessRating: 90,
  },
};
