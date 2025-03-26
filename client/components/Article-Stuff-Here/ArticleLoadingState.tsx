import React from "react";
import { Skeleton } from "../ui/skeleton";

const ArticleLoadingState = () => {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {[...Array(9)].map((_, i) => {
        const isFeatured = i % 4 === 0; // Make every 4th item "featured"
        return (
          <div
            key={i}
            className={`flex flex-col space-y-3 ${
              isFeatured ? "col-span-2 md:col-span-2 lg:col-span-2" : ""
            }`}>
            {/* 🖼️ Image Skeleton */}
            <Skeleton
              className={`rounded-xl ${
                isFeatured ? "h-[280px] w-full" : "h-[180px] w-full"
              }`}
            />

            {/* 📄 Text Skeletons */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ArticleLoadingState;
