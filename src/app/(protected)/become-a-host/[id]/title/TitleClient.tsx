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

const TitleClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [title, setTitle] = useState(listing.title || undefined);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
    updateDraft({
      title: e.target.value,
      step: "title",
      id: listing.id,
    });
  };
  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/description`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="overflow-y-auto pb-32">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold">
              Now, let’s give your listing a title
            </h2>

            <p className="text-sm text-muted-foreground">
              Short titles work best
            </p>

            <Textarea
              maxLength={50}
              className="w-full rounded-lg border border-gray-800 bg-white px-3 py-2 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black min-h-32"
              onChange={(e) => handleChange(e)}
              defaultValue={title}
            />

            <span
              className={`text-sm ${
                title && title.length >= 50 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {title ? title.length : 0}/50
            </span>
          </div>
        </div>
      </div>

      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/description`}
        backHref={`/become-a-host/${listing.id}/photos`}
        prevProgress={54}
        nextProgress={63}
        options={{ title }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default TitleClient;
