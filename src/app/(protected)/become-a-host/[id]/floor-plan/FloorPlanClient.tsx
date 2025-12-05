"use client";
import React, { useCallback, useState } from "react";
import { Listing } from "../../../../../../generated/prisma";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";

type Props = {
  listing: Listing;
};

const FloorPlanClient = ({ listing }: Props) => {
  const [bedCount, setBedCount] = useState(listing.bedCount);
  const [bedroomCount, setBedroomCount] = useState(listing.bedroomCount);
  const [guestCount, setGuestCount] = useState(listing.guestCount);
  const [bathroomCount, setBathroomCount] = useState(listing.bathroomCount);
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();

  const handleNext = useCallback(() => {
    updateListing(
      {
        ...draft,
        step: "stand-out",
      },
      listing.id
    ).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/stand-out`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex flex-col  ">
      <div className="mb-10">
        <div className="flex justify-center flex-col gap-8 mb-3 items-center">
          <div className="text-4xl font-bold text-center">
            Share some basics about your place
          </div>
        </div>
        <p className=" text-gray-600">
          You will add more details later, like bed types.
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between items-center p-2 gap-2 rounded-lg hover:cursor-pointer">
          <div className="w-1/2">
            <p className="text-lg font-medium">Guests</p>
          </div>
          <div className="flex w-1/2 gap-3 justify-end items-center select-none">
            <MinusCircle
              onClick={() => {
                const currentGuestCount = Math.max(guestCount - 1, 1);
                setGuestCount(currentGuestCount);
                updateDraft({
                  guestCount: currentGuestCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className={`text-gray-300 ${
                guestCount === 1
                  ? "hover:cursor-not-allowed hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            />
            <p className="tabular-nums text-gray-900 text-lg text-center w-[2ch] shrink-0">
              {guestCount}
            </p>
            <PlusCircle
              onClick={() => {
                const currentGuestCount = Math.max(guestCount + 1, 1);
                setGuestCount(currentGuestCount);
                updateDraft({
                  guestCount: currentGuestCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className="text-gray-400 hover:text-gray-500"
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center p-2 gap-2 rounded-lg hover:cursor-pointer">
          <div className="w-1/2 ">
            <p className="text-lg font-medium">Bedrooms</p>
          </div>
          <div className="flex gap-3 w-1/2 justify-end items-center select-none">
            <MinusCircle
              onClick={() => {
                const currentBedroomCount = Math.max(bedroomCount - 1, 0);
                setBedroomCount(currentBedroomCount);
                updateDraft({
                  bedroomCount: currentBedroomCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className={`text-gray-300 ${
                bedroomCount === 0
                  ? "hover:cursor-not-allowed hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            />
            <p className="tabular-nums text-gray-900 text-lg text-center w-[2ch] shrink-0">
              {bedroomCount}
            </p>
            <PlusCircle
              onClick={() => {
                const currentBedroomCount = Math.max(bedroomCount + 1, 0);
                setBedroomCount(currentBedroomCount);
                updateDraft({
                  bedroomCount: currentBedroomCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className="text-gray-400 hover:text-gray-500 "
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center p-2 gap-2 rounded-lg hover:cursor-pointer">
          <div className="w-1/2 ">
            <p className="text-lg font-medium">Beds</p>
          </div>
          <div className="flex gap-3 w-1/2 justify-end items-center select-none">
            <MinusCircle
              onClick={() => {
                const currentBedCount = Math.max(bedCount - 1, 1);
                setBedCount(currentBedCount);
                updateDraft({ bedCount: currentBedCount, step: "floor-plan" });
              }}
              size={36}
              className={`text-gray-300 ${
                bedCount === 1
                  ? "hover:cursor-not-allowed hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            />
            <p className="tabular-nums text-gray-900 text-lg text-center w-[2ch] shrink-0">
              {bedCount}
            </p>
            <PlusCircle
              onClick={() => {
                const currentBedCount = Math.max(bedCount + 1, 1);
                setBedCount(currentBedCount);
                updateDraft({ bedCount: currentBedCount, step: "floor-plan" });
              }}
              size={36}
              className="text-gray-400 hover:text-gray-500 "
            />
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between items-center p-2 gap-2 rounded-lg hover:cursor-pointer">
          <div className="w-1/2 ">
            <p className="text-lg font-medium">Bathrooms</p>
          </div>
          <div className="flex gap-3 w-1/2 justify-end  items-center select-none">
            <MinusCircle
              onClick={() => {
                const currentBathroomCount = Math.max(bathroomCount - 0.5, 0.5);
                setBathroomCount(currentBathroomCount);
                updateDraft({
                  bathroomCount: currentBathroomCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className={`text-gray-300 ${
                bathroomCount === 0.5
                  ? "hover:cursor-not-allowed hover:text-gray-300"
                  : "text-gray-400 hover:text-gray-500"
              }`}
            />
            <p className="tabular-nums text-gray-900 text-lg text-center w-[2ch] shrink-0">
              {bathroomCount}
            </p>
            <PlusCircle
              onClick={() => {
                const currentBathroomCount = Math.max(bathroomCount + 0.5, 0.5);
                setBathroomCount(currentBathroomCount);
                updateDraft({
                  bathroomCount: currentBathroomCount,
                  step: "floor-plan",
                });
              }}
              size={36}
              className="text-gray-400 hover:text-gray-500 "
            />
          </div>
        </div>
      </div>

      <CreateListingFooter
        backHref={`/become-a-host/${listing.id}/location`}
        nextHref={`/become-a-host/${listing.id}/stand-out`}
        prevProgress={20}
        nextProgress={27}
        options={{}}
        handleNext={handleNext}
      />
    </div>
  );
};

export default FloorPlanClient;
