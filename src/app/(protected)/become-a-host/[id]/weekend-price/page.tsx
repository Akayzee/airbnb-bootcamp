import React from "react";

import { getListingById } from "@/db/listing";
import WeekendPriceClient from "./WeekendPriceClient";

type Props = {};

const WeekendPricePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }
  return <WeekendPriceClient listing={listing} />;
};

export default WeekendPricePage;
