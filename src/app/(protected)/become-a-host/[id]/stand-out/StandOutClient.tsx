"use client";

import { updateListing } from "@/actions/listing/update-listing";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

type Props = {
  id: string;
};

const StandOutClient = ({ id }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();

  const handleNext = useCallback(() => {
    updateListing(draft, id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${id}/amenities`);
        reset();
      }
    });
  }, [id, draft, reset, router]);
  return (
    <div>
      <div className="h-screen  flex flex-col  ">
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1">
          <div className="self-center p-4 order-2 md:order-1">
            <div>Step 2</div>
            <h1 className="text-4xl font-bold mt-3 ">
              Make Your Place Stand Out
            </h1>
            <p className="mt-3 text-gray-600">
              In this step, you will add some of the amenities your place
              offers, plus 5 or more photos. Then, you will create a title and
              description
            </p>
          </div>
          <div className="self-center order-1 md:order-2">
            <video autoPlay muted>
              <source src="/videos/stand-out.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
      <CreateListingFooter
        nextHref={`/become-a-host/${id}/amenities`}
        backHref={`/become-a-host/${id}/floor-plan`}
        prevProgress={27}
        nextProgress={27}
        handleNext={handleNext}
      />
    </div>
  );
};

export default StandOutClient;
