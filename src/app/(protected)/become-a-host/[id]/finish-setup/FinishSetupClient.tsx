"use client";

import { updateListing } from "@/actions/listing/update-listing";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

type Props = {
  id: string;
};

const FinishSetupClient = ({ id }: Props) => {
  const { draft, reset } = useCreateListingStore();
  const router = useRouter();

  const handleNext = useCallback(() => {
    updateListing(draft, id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${id}/price`);
        reset();
      }
    });
  }, [id, draft, reset, router]);
  return (
    <div className="flex flex-col ">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="self-center p-4 order-2 md:order-1">
          <div>Step 3</div>
          <h1 className="text-4xl font-bold mt-3 ">Finish up and publish</h1>
          <p className="mt-3 text-gray-600">
            You will set your nightly price. Then answer a few quick questions
            and publish your listing when you’re ready.
          </p>
        </div>
        <div className="self-center order-1 md:order-2">
          <video autoPlay muted>
            <source src="/videos/finish-up.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      <CreateListingFooter
        nextHref={`/become-a-host/${id}/price`}
        backHref={`/become-a-host/${id}/description`}
        prevProgress={72}
        nextProgress={80}
        handleNext={handleNext}
      />
    </div>
  );
};

export default FinishSetupClient;
