"use client";

import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Listing } from "../../../../../../generated/prisma";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";
import { useCallback } from "react";
import useCreateListingStore from "@/hooks/use-create-listing-store";

type Props = {
  listing: Listing;
};

const PhotosClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/title`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center overflow-y-auto pb-32">
        <div className="flex justify-between items-center p-4  w-3/4">
          <div>
            <div className="text-2xl font-bold ">Choose at least 5 photos</div>
            <div className="text-md">Drag to reorder</div>
          </div>
          <Plus />
        </div>
        <div className="flex justify-center flex-col gap-8 items-center p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4"></div>
        </div>
      </div>
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/title`}
        backHref={`/become-a-host/${listing.id}/amenities`}
        prevProgress={45}
        nextProgress={54}
        // options={{ selectedAmenitiesIds }}
        // options={{ selectedCategory }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default PhotosClient;
