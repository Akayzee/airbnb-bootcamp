"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Category, Listing } from "../../../../../../generated/prisma";
import { IconType } from "react-icons/lib";
import { CategoryIcon } from "@/components/CategoryIcon";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { updateListing } from "@/actions/listing/update-listing";
import { PrivacyType } from "../../../../../../generated/prisma";

type Props = {
  privacyTypes: PrivacyType[];
  listing: Listing;
  icon?: IconType;
};

const PrivacyClient = ({ privacyTypes, listing, icon: Icon }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const initialPrivacyType = listing.privacyTypeId
    ? privacyTypes.find(
        (privacyType) => privacyType.id === listing.privacyTypeId
      )
    : undefined;

  const [selectedPrivacyType, setSelectedPrivacyType] = useState<
    PrivacyType | undefined
  >(initialPrivacyType);
  const router = useRouter();

  const handleSelectPrivacyType = (privacyType: PrivacyType) => {
    setSelectedPrivacyType(privacyType);
    updateDraft({
      privacyTypeId: privacyType.id,
      step: "privacy-type",
    });
  };

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/location`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-center flex-col gap-8 items-center p-4">
          <div className="text-4xl font-bold text-center">
            Which type of place will guests have?
          </div>
          <div className="flex flex-col gap-4 ">
            {privacyTypes.map((privacyType) => (
              <div
                className={`border-1  rounded-md p-6 flex flex-col gap-2 hover:border-black cursor-pointer transition transform active:scale-95
                  ${selectedPrivacyType?.id === privacyType.id ? "border-2 border-black bg-gray-100" : ""}`}
                key={privacyType.id}
                onClick={() => handleSelectPrivacyType(privacyType)}
              >
                <div className="flex justify-between items-center">
                  <div className="w-3/5 ">
                    <p className=" text-lg">{privacyType.name}</p>
                    <p className="text-gray-500 text-sm w-full">
                      {privacyType.description}
                    </p>
                  </div>
                  <CategoryIcon icon={`${privacyType.icon}`} size={30} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
        <Progress value={7} className="mb-4" />
        <div className="flex justify-between gap-2">
          <Link href={`/become-a-host/${listing.id}/about-your-place`}>
            <Button
              variant="outline"
              size="lg"
              className="w-32 hover:cursor-pointer"
            >
              Back
            </Button>
          </Link>

          <Button
            size="lg"
            className={`w-32 ${selectedCategory ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}`}
            disabled={!selectedCategory}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div> */}
      <CreateListingFooter
        backHref={`/become-a-host/${listing.id}/structure`}
        nextHref={`/become-a-host/${listing.id}/location`}
        prevProgress={7}
        nextProgress={13}
        options={{ selectedPrivacyType }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default PrivacyClient;
