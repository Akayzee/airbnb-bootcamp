import React from "react";
import LegalClient from "./LegalClient";
import { getListingById } from "@/db/listing";

type Props = {
  params: Promise<{ id: string }>;
};

const LegalPage = async ({ params }: Props) => {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }
  return <LegalClient listing={listing} />;
};

export default LegalPage;
