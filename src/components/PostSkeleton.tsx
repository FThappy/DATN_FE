import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="p-4 shadow-beautiful rounded-[0.5rem]	bg-white mt-4">
      <div className="flex items-center">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 ml-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div>
        <Skeleton className="h-[300px] w-full rounded-[0.5rem] mt-4" />
      </div>
      <div className="flex items-center justify-between w-full mt-4">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default PostSkeleton;
