import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SingleArticleLoading = () => {
  return (
    <div className="flex flex-col gap-6 py-6 max-w-screen-lg mx-auto">
      {/* Featured Image */}
      <Skeleton className="w-full h-[300px] rounded-lg" />

      {/* Title & Subtitle */}
      <div className="space-y-4">
        <Skeleton className="w-3/4 h-[40px] rounded-md" />
        <Skeleton className="w-1/2 h-[30px] rounded-md" />
      </div>

      {/* Content Placeholder */}
      <div className="space-y-3">
        <Skeleton className="w-full h-[100px] rounded-md" />
        <Skeleton className="w-5/6 h-[20px] rounded-md" />
        <Skeleton className="w-4/6 h-[20px] rounded-md" />
      </div>

      {/* Meta Information (Author, Date, etc.) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Skeleton className="w-full h-[30px] rounded-md" />
        <Skeleton className="w-full h-[30px] rounded-md" />
        <Skeleton className="w-full h-[30px] rounded-md" />
      </div>
    </div>
  );
};

export default SingleArticleLoading;
