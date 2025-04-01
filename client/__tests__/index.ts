import { Article } from "@/__generated__/graphql";

export const singleArticle: Article = {
  id: "1",
  title: "Breaking News: AI Revolutionizes Tech Industry",
  content:
    "Artificial Intelligence is transforming the tech industry at an unprecedented pace. Experts predict major advancements in the coming years.",
  description:
    "AI is reshaping the tech landscape with groundbreaking innovations.",
  image:
    "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
  publishedAt: "2023-10-01T10:00:00Z",
  url: "https://example.com/ai-revolution",
  source: {
    id: "tech-news",
    name: "Tech News Daily",
  },
  comments: [
    {
      articleId: "1",
      id: "1",
      content: "This is fascinating!",
      user: {
        id: "user123",
        email: "someone",
        name: "User123",
      },
    },
    {
      articleId: "1",
      id: "2",
      content: "Can't wait to see what's next.",
      user: {
        id: "user123",
        email: "someone",
        name: "User123",
      },
    },
  ],
};

export const multipleArticles: Article[] = [
  {
    id: "1",
    title: "Breaking News: AI Revolutionizes Tech Industry",
    content:
      "Artificial Intelligence is transforming the tech industry at an unprecedented pace. Experts predict major advancements in the coming years.",
    description:
      "AI is reshaping the tech landscape with groundbreaking innovations.",
    image:
      "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png",
    publishedAt: "2023-10-01T10:00:00Z",
    url: "https://example.com/ai-revolution",
    author: "awdawdawdaawdawddddddddddddddddddddddddddddd",
    source: {
      id: "tech-news",
      name: "Tech News Daily",
    },
    comments: [
      {
        articleId: "1",
        id: "1",
        content: "This is fascinating!",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
      {
        articleId: "1",
        id: "2",
        content: "Can't wait to see what's next.",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
    ],
  },
  {
    id: "2",
    title: "Climate Change: Urgent Action Needed",
    content:
      "Scientists warn that immediate action is required to combat the effects of climate change. Governments worldwide are urged to act swiftly.",
    description: "A call to action to address the growing climate crisis.",
    image: "https://example.com/climate-change.jpg",
    publishedAt: "2023-09-30T08:30:00Z",
    url: "https://example.com/climate-change",
    source: {
      id: "global-news",
      name: "Global News Network",
    },
    comments: [
      {
        articleId: "1",
        id: "1",
        content: "This is fascinating!",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
      {
        articleId: "1",
        id: "2",
        content: "Can't wait to see what's next.",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
    ],
  },
  {
    id: "3",
    title: "Top 10 Travel Destinations for 2024",
    content:
      "Discover the most exciting travel destinations for the upcoming year, from tropical beaches to bustling cities.",
    description: "Plan your next adventure with our top travel picks for 2024.",
    image: "https://example.com/travel-destinations.jpg",
    publishedAt: "2023-09-25T14:00:00Z",
    url: "https://example.com/travel-destinations",
    source: {
      id: "travel-magazine",
      name: "Travel Magazine",
    },
    comments: [
      {
        articleId: "1",
        id: "1",
        content: "This is fascinating!",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
      {
        articleId: "1",
        id: "2",
        content: "Can't wait to see what's next.",
        user: {
          id: "user123",
          email: "someone",
          name: "User123",
        },
      },
    ],
  },
];
