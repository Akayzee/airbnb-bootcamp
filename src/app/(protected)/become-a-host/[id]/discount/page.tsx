import React from "react";
import DiscountClient from "./DiscountClient";
import { getListingById } from "@/db/listing";

type Props = {
  params: Promise<{ id: string }>;
};

const DiscountPage = async ({ params }: Props) => {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }
  return <DiscountClient listing={listing} />;
};

export default DiscountPage;
