"use client";
import { Article } from "@/__generated__/graphql";
import Articles from "@/components/Article-Stuff-Here/Articles";
import { GET_ARTICLE_BASED_ON_SEARCH } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const params = useSearchParams();
  const searchQuery: string = params.get("q") || "";

  const { data, loading, error } = useQuery(GET_ARTICLE_BASED_ON_SEARCH, {
    variables: { question: searchQuery },
  });

  if (!searchQuery) return null; // Prevents flicker

  const dataLength = data?.getArticlesBasedOnSearch.length;

  if (dataLength === undefined || dataLength === 0)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full p-4 text-xl font-bold text-center text-gray-500">
        <span> No articles found for &quot;{searchQuery}&quot;</span>{" "}
        <span>
          <br />
          Tip: Try searching for different keywords or phrases. Such as
          &quot;AI&quot;, &quot;Trump&quot;, &quot;Sports&quot;,
          &quot;Islam&quot;, etc.
        </span>
      </div>
    );

  return (
    <>
      <div>
        <h1>Search Results for &quot;{searchQuery}&quot;</h1>
        <span>
          found {dataLength} related {dataLength === 1 ? "article" : "articles"}
        </span>
      </div>
      <Articles
        articles={data?.getArticlesBasedOnSearch as Article[]}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default SearchPage;
