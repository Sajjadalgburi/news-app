import OpenAI from "openai";
import { ArtificialIntelligenceType } from "../types/types";
import "dotenv/config";

if (!process.env.OPENAI_API_KEY) {
  throw new Error(
    "OPENAI_API_KEY is not defined in the environment variables.",
  );
}

const apiKey = process.env.OPENAI_API_KEY;

const client = new OpenAI({
  apiKey,
});

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
        You are an expert journalist, media analyst, and AI assistant. Your task is to analyze a given news article and provide the following:
        1. A concise and accurate summary of the article in plain language.
        2. A bias rating on a scale of 0 to 100 (0 = completely unbiased, 100 = extremely biased).
        3. A detailed explanation for the bias rating, including specific examples or patterns observed in the article.
        4. A worthiness rating on a scale of 0 to 100 (0 = completely worthless, 100 = extremely valuable), based on the article's relevance, credibility, and informativeness.
        
        Ensure your response is objective, well-reasoned, and formatted as valid JSON. Use the following structure:
        {
          "biasRating": <bias_score>,
          "biasReasoning": "<bias_reasoning>",
          "worthinessRating": <worthiness_score>,
          "summarizedContent": "<summary_text>"
        }
        `,
        },
        {
          role: "user",
          content: `Analyze the following article content:\n\n${content}`,
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
