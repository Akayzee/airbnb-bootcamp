import React from "react";
import AmenitiesClient from "./AmenitiesClient";
import { getAmenities } from "@/db/amenities";
import { getListingWithAmenitiesById } from "@/db/listing";

type Props = {};

const AmenitiesPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const listing = await getListingWithAmenitiesById(id);
  const amenities = await getAmenities();

  if (!listing) {
    return <div>No Listing Found </div>;
  }

  return <AmenitiesClient amenities={amenities} listing={listing} />;
};

export default AmenitiesPage;
