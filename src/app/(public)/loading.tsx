import { ListingCardSkeleton } from "@/components/listings/ListingCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="mb-10">
      {/* Header (matches your original structure) */}
      <div className="flex items-center mb-5">
        <div className="flex items-center">
          <Skeleton className="h-6 w-32 mr-2" />
          <IoIosArrowForward size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Grid (same breakpoints to avoid layout shift) */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
