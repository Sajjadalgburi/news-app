import OpenAI from "openai";
import { ArtificialIntelligenceType } from "../types/types";

const client = new OpenAI();

/**
 * Analyzes an article by summarizing it, providing a bias rating, and a worthiness rating.
 * @param content - The article content to analyze.
 * @returns A promise that resolves with the analysis results.
 */
const analyzeArticle = async (
  content: string,
): Promise<ArtificialIntelligenceType | null> => {
  try {
    const completion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `
            You are a skilled journalist and media expert. Your task is to analyze a given news article and provide:
            1. A concise summary of the article.
            2. A bias rating out of 100 (0 = completely unbiased, 100 = extremely biased).
            3. A worthiness rating out of 100 (0 = completely worthless, 100 = extremely valuable).
            
            Return the result in the following JSON format:
            {
              "biasRating": <bias_score>,
              "worthinessRating": <worthiness_score>,
              "summarizedContent": "<summary_text>"
            }
          `,
        },
        {
          role: "user",
          content: `Here is the article content:\n\n${content}`,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) throw new Error("Empty response from OpenAI API");

    return JSON.parse(response) as ArtificialIntelligenceType;
  } catch (error) {
    console.error("Error analyzing article:", error);
    return null;
  }
};

export default analyzeArticle;
