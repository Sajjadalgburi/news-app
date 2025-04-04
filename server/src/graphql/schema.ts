import gql from "graphql-tag";

export const typeDefs = gql`
  # refer to https://newsapi.org/docs/endpoints/top-headlines for types from the API doc
  scalar Date

  type Query {
    # This query is for showcasing the hottest trends on the homepage
    displayTrendingArticles: [Article]! # must be an array of non-null
    # Query to get a category by a given string
    getCategory(category: String!): [Article!]!
    # Query which fetches a single article from our database based on the ID
    getSingleArticle(input: String!): AuthResponse!
    # Query to fetch an array of related articles based on the based in question query
    getArticlesBasedOnSearch(question: String!): [Article]!
    # This will return the currently signed in user
    me: AuthResponse!
    # Query to grab the article analasis from the AI
    getAIAnalysis(content: String!, articleId: ID!): AIResponse!
    # Query to grab a speicific user from the database
    getUser(userId: ID!): User
  }

  type Mutation {
    # Mutation to log in the user - returns an Auth object which will update the cookies
    login(email: String!, password: String!): AuthResponse!
    # Mutation to sign up the user - returns an Auth object which will update the cookies
    register(name: String!, email: String!, password: String!): AuthResponse!
    # When a user clicks on an article, this mutation will be called to save the article in the database
    saveArticle(input: SaveArticleInput!): AuthResponse!
    # create a comment on an article
    createComment(input: CreateCommentInput!): AuthResponse!
    # action to logout the user by removing the cookie
    logout: AuthResponse!
    # Mutation to delete a comment
    deleteComment(commentId: ID!): AuthResponse!
    # Mutation to upvote a comment
    upvoteComment(commentId: ID!): AuthResponse!
  }

  input CreateCommentInput {
    # ID of the article the comment is associated with
    articleId: ID!
    # The text content of the comment
    content: String!
    # The user who wrote the comment
    user: UserInput
  }

  type AIResponse {
    ai: ArtificialIntelligenceType
    status: Int!
    message: String!
    success: Boolean!
  }

  type ArtificialIntelligenceType {
    biasRating: Int!
    summarizedContent: String!
    biasReasoning: String!
    worthinessRating: Int!
    createdAt: String
  }

  input SaveArticleInput {
    # The headline or title of the article.
    title: String!
    # The date and time that the article was published, in UTC (+000).
    publishedAt: String!
    # The source from which this article originated.
    source: SourceInput!
    # The direct URL to the article. Used to associate comments.
    url: String!
    # A description or snippet from the article.
    description: String
    # The unformatted content of the article (where available). This is truncated to 200 characters.
    content: String
    # The URL to a relevant image for the article.
    image: String
    # The author of the article. Can be null.
    author: String
  }

  input UserInput {
    # We only need the users ID to associate the comment with the user
    id: ID!
  }

  input CreateCommentInput {
    # ID of the article the comment is associated with
    articleId: ID!
    # The text content of the comment
    content: String!
    # The user who wrote the comment
    user: UserInput!
    # Number of upvotes the comment has received
    upvote: Int
    # Number of downvotes the comment has received
    downvote: Int
    # The date and time that the comment was created, in UTC (+000).
    createdAt: String
  }

  input SourceInput {
    # The display name of the source.
    name: String!
    # The identifier of the source. Can be null.
    id: String
  }

  type Article {
    id: ID
    # The headline or title of the article.
    title: String!
    # The date and time that the article was published, in UTC (+000).
    publishedAt: String!
    # The source from which this article originated.
    source: Source!
    # The direct URL to the article. Used to associate comments.
    url: String!
    # A description or snippet from the article.
    description: String
    # The unformatted content of the article (where available). This is truncated to 200 characters.
    content: String
    # The URL to a relevant image for the article.
    image: String
    # The author of the article. Can be null.
    author: String
    # Fetches all comments related to this article by matching the URL.
    comments: [Comment]
    # The AI generated content for the article
    ai: ArtificialIntelligenceType
  }

  # Represents the source of the article.
  type Source {
    # The display name of the source.
    name: String!
    # The identifier of the source. Can be null.
    id: String
  }

  type User {
    # ID field. Will be populated from MongoDB
    id: ID!
    # Name of the user
    name: String!
    # The user's email
    email: String
    # The user's past comments
    comments: [Comment]
    # The users profile picture
    profilePicture: String
  }

  type AuthResponse {
    # The user that was authenticated
    user: User
    # The token that was generated for the user
    token: String
    # Whether the operation was successful
    success: Boolean!
    # A message to display to the user in the event of an error
    message: String!
    # status code of the operation
    status: Int!
    # The article that was saved. if any
    article: Article
  }

  # Represents a user comment on an article
  type Comment {
    # Unique identifier for the comment
    id: ID!
    # ID of the article the comment is associated with
    articleId: ID!
    # The text content of the comment
    content: String!
    # The user who wrote the comment
    user: User
    # Number of upvotes the comment has received
    upvotes: Int
    # Number of downvotes the comment has received
    downvotes: Int
    # The date and time that the comment was created, in UTC (+000).
    createdAt: Date
  }
`;
