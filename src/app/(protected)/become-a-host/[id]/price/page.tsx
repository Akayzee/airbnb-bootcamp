import React from "react";
import PriceClient from "./PriceClient";
import { getListingById } from "@/db/listing";

type Props = {};

const PricePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }
  return <PriceClient listing={listing} />;
};

export default PricePage;
