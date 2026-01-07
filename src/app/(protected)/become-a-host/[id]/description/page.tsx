import { getListingById } from "@/db/listing";
import React from "react";
import DescriptionClient from "./DescriptionClient";

type Props = {};

const DescriptionPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }

  return <DescriptionClient listing={listing} />;
};

export default DescriptionPage;
