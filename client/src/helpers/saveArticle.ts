"use client";

import { Article } from "@/__generated__/types";
import { SAVE_ARTICLE } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

/**
 * Custom hook to save an article to MongoDB.
 * It calls the useMutation hook and returns the mutation function along with its loading and error states.
 * @param article - The article to be saved.
 */
const useSaveArticle = (article: Article) => {
  const [saveArticleFunction, { data, error, loading }] =
    useMutation(SAVE_ARTICLE);

  const saveArticle = async () => {
    try {
      await saveArticleFunction({
        variables: {
          input: {
            title: article.title,
            publishedAt: article.publishedAt,
            source: {
              name: article.source.name,
              id: article.source.id ?? null,
            },
            url: article.url,
            image: article.image ?? null,
            description: article.description ?? null,
            content: article.content ?? null,
            author: article.author ?? null,
          },
        },
      });
    } catch (err) {
      console.error("Error saving article:", err);
    }
  };

  return {
    saveArticle,
    loading,
    error,
    data,
  };
};

export default useSaveArticle;
