"use client";

import React, { useCallback, useState } from "react";
import { Amenity } from "../../../../../../generated/prisma";
import { ListingWithAmenities } from "@/lib/types";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { updateListing } from "@/actions/listing/update-listing";
import { useRouter } from "next/navigation";
import { CustomIcon } from "@/components/CustomIcon";

type Props = {
  amenities: Amenity[];
  listing: ListingWithAmenities;
};

const AmenitiesClient = ({ listing, amenities }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [selectedAmenitiesIds, setSelectedAmenitiesIds] = useState<string[]>(
    listing.amenityIds
  );

  const isGuestFavoriteAmenities = amenities.filter(
    (amenity) => amenity.isGuestFavorite
  );
  const isStandOutAmenities = amenities.filter((amenity) => amenity.isStandOut);
  const isSafetyAmenities = amenities.filter((amenity) => amenity.isSafety);

  const router = useRouter();

  const handleSelectAmenity = (amenityId: string) => {
    const isSelected = selectedAmenitiesIds.includes(amenityId);
    const newAmenityIds = isSelected
      ? selectedAmenitiesIds.filter((id) => id !== amenityId)
      : [...selectedAmenitiesIds, amenityId];
    setSelectedAmenitiesIds(newAmenityIds);
    updateDraft({
      amenityIds: newAmenityIds,
      step: "amenities",
      id: listing.id,
    });
  };

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/photos`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-center flex-col gap-8 items-center p-4">
          <div className="text-4xl font-bold text-center">
            Tell guests what your place has to offer
          </div>
          <p className="text-sm text-muted-foreground">
            You can add more amenities after you publish your listing{" "}
          </p>

          <p className="text-lg font-bold">
            What about these guest favorite amenties?
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isGuestFavoriteAmenities.map((amenity) => (
              <div
                className={`border-1 md:w-60 rounded-md p-4 flex flex-col gap-2 hover:border-black cursor-pointer transition transform active:scale-95
 
  ${
    selectedAmenitiesIds.includes(amenity.id)
      ? "border-2 border-black bg-gray-100"
      : ""
  }

                }`}
                key={amenity.id}
                onClick={() => handleSelectAmenity(amenity.id)}
              >
                <CustomIcon icon={amenity.icon} />
                {amenity.name}
              </div>
            ))}
          </div>

          <p className="text-lg font-bold">
            What about these Standout amenties?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isStandOutAmenities.map((amenity) => (
              <div
                className={`border-1 md:w-60 rounded-md p-4 flex flex-col gap-2 hover:border-black cursor-pointer transition transform active:scale-95
  ${
    selectedAmenitiesIds.includes(amenity.id)
      ? "border-2 border-black bg-gray-100"
      : ""
  }


                }`}
                key={amenity.id}
                onClick={() => handleSelectAmenity(amenity.id)}
              >
                <CustomIcon icon={amenity.icon} />
                {amenity.name}
              </div>
            ))}
          </div>

          <p className="text-lg font-bold">What about these Safety amenties?</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isSafetyAmenities.map((amenity) => (
              <div
                className={`border-1 md:w-60 rounded-md p-4 flex flex-col gap-2 hover:border-black cursor-pointer transition transform active:scale-95
   ${
     selectedAmenitiesIds.includes(amenity.id)
       ? "border-2 border-black bg-gray-100"
       : ""
   }


                }`}
                key={amenity.id}
                onClick={() => handleSelectAmenity(amenity.id)}
              >
                <CustomIcon icon={amenity.icon} />
                {amenity.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/photos`}
        backHref={`/become-a-host/${listing.id}/stand-out`}
        prevProgress={36}
        nextProgress={45}
        options={{ selectedAmenitiesIds }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default AmenitiesClient;
