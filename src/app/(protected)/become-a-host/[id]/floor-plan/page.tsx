import { getListingById } from "@/db/listing";
import React from "react";
import FloorPlanClient from "./FloorPlanClient";

type PrivacyTypeProps = {
  params: Promise<{ id: string }>;
};

const FloorPlan = async ({ params }: PrivacyTypeProps) => {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return <div>listing Not Found</div>;
  }

  return (
    <div className="h-screen md:h-[80vh]  flex flex-col items-center justify-center">
      {/* <PrivacyClient privacyTypes={privacyTypes} listing={listing} /> */}
      <FloorPlanClient listing={listing} />
    </div>
  );
};

export default FloorPlan;
