// ListingCardSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";

export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-col gap-3">
        {/* Image area */}
        <div className="relative w-full rounded-2xl overflow-hidden">
          {/* Keep same dimensions as your real image wrapper */}
          <div className="h-72 w-72 md:h-48 md:w-48">
            <Skeleton className="h-full w-full rounded-2xl" />
          </div>

          {/* Badge placeholder (Guest favorite) */}
          <div className="absolute top-2 left-2">
            <Skeleton className="h-6 w-24 rounded-full opacity-90" />
          </div>

          {/* Heart icon placeholder */}
          <div className="absolute top-2 right-2">
            <Skeleton className="h-5 w-5 rounded-full opacity-90" />
          </div>
        </div>

        {/* Text area */}
        <div className="flex flex-col gap-1">
          {/* "listingType in {location}" */}
          <Skeleton className="h-3 w-40" />
          {/* "$XXX for 2 nights · ★ 4.8" row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
