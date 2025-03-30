"use client";
import { Article } from "@/__generated__/graphql";
import Articles from "@/components/Article-Stuff-Here/Articles";
import { GET_ARTICLE_BASED_ON_SEARCH } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const params = useSearchParams();
  const searchQuery: string = params.get("q") || params.get("name") || "";

  const { data, loading, error } = useQuery(GET_ARTICLE_BASED_ON_SEARCH, {
    variables: { question: searchQuery },
  });

  if (!searchQuery) return null; // Prevents flicker

  const dataLength = data?.getArticlesBasedOnSearch.length;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="text-xl text-gray-500 animate-pulse">
          Loading articles...
        </span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen p-4 text-red-500">
        <span className="text-xl font-semibold">
          Error fetching articles. Please try again later.
        </span>
      </div>
    );

  if (!dataLength)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-700">
          No articles found for &quot;{searchQuery}&quot;
        </h2>
        <p className="mt-2 text-gray-500">
          Try searching for different keywords or phrases, such as <br />
          <span className="font-medium text-gray-700">
            &quot;AI&quot;, &quot;Technology&quot;, &quot;Sports&quot;,
            &quot;Politics&quot;
          </span>
          , etc.
        </p>
      </div>
    );

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Search Results for &quot;{searchQuery}&quot;
        </h1>
        <p className="mt-1 text-gray-600">
          Found {dataLength} {dataLength === 1 ? "article" : "articles"}
        </p>
      </header>

      <Articles
        articles={data?.getArticlesBasedOnSearch as Article[]}
        loading={loading}
        error={error}
      />
    </section>
  );
};

export default SearchPage;
