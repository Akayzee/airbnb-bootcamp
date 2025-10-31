import React from "react";
import LocationClient from "./LocationClient";
import { getListingById } from "@/db/listing";

type LocationProps = {
  params: Promise<{ id: string }>;
};

const LocationPage = async ({ params }: LocationProps) => {
  const { id } = await params;

  const listing = await getListingById(id);

  if (!listing) {
    return <div>Listing Not Found</div>;
  }

  return <LocationClient listing={listing} />;
};

export default LocationPage;
