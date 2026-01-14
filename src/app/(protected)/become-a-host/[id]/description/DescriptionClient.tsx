"use client";
import React, { ChangeEvent, useCallback, useState } from "react";
import { Listing } from "../../../../../../generated/prisma";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Textarea } from "@/components/ui/textarea";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { updateListing } from "@/actions/listing/update-listing";
import { useRouter } from "next/navigation";

type Props = {
  listing: Listing;
};

const DescriptionClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [description, setDescription] = useState(
    listing.description || undefined
  );
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    updateDraft({
      description: e.target.value,
      step: "title",
      id: listing.id,
    });
  };
  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/finish-setup`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex flex-col">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-16 pb-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-2xl font-semibold">Create your description</h2>

          <p className="text-sm text-muted-foreground">
            Share what makes your place special
          </p>

          <Textarea
            maxLength={500}
            className="w-full rounded-lg border border-gray-800 bg-white px-3 py-2 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black min-h-32"
            onChange={handleChange}
            defaultValue={description}
          />

          <span
            className={`text-sm ${
              description && description.length >= 500
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {description ? description.length : 0}/500
          </span>
        </div>
      </div>

      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/finish-setup`}
        backHref={`/become-a-host/${listing.id}/title`}
        prevProgress={63}
        nextProgress={72}
        options={{ description }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default DescriptionClient;
