import React from "react";
import { Article } from "@/__generated__/graphql";
import { formatDate, formatString } from "@/helpers";
import useSaveArticle from "@/helpers/saveArticle";
import { useRouter } from "next/navigation";
import RenderImage from "../RenderImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  article: Article;
  image?: boolean;
  isFeatured?: boolean;
  hasImage?: boolean;
}

/**
 * Component for displaying a single article card with improved layout
 */
const ArticleCard: React.FC<Props> = ({
  article,
  isFeatured,
  image = true,
  hasImage,
}) => {
  const { loading, saveArticle, error } = useSaveArticle(article);
  const router = useRouter();

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await saveArticle(); // Ensure article is saved before redirecting
      if (loading && error) {
        return;
      } else {
        router.push(`/article?q=${encodeURIComponent(article.title)}`);
      }
    } catch (error) {
      console.error("Failed to save article:", error);
    }
  };

  return (
    <>
      <Card className="block hover:shadow-lg hover:cursor-pointer hover:scale-[1.05] hover:underline transition-all duration-500 ease-in-out rounded-lg overflow-hidden">
        <a role="button" aria-disabled={loading} onClick={handleClick}>
          <CardHeader>
            {image && article.image && (
              <div
                className={`relative w-full ${isFeatured ? "h-96" : "h-48"}`}>
                <RenderImage image={article.image!} alt={article.title} />
              </div>
            )}{" "}
            <CardTitle> {article.title}</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          {hasImage !== true && (
            <CardContent>
              <p
                className={`${
                  isFeatured ? "text-md" : "text-xs"
                }  line-clamp-3 text-wrap`}>
                {article.description}
              </p>
            </CardContent>
          )}

          <CardFooter className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span className="font-medium capitalize">
              By: {article.author ? formatString(article.author) : "anonymous"}
            </span>
            <span>{formatDate(article.publishedAt)}</span>
          </CardFooter>
        </a>
      </Card>
    </>
  );
};

export default ArticleCard;
