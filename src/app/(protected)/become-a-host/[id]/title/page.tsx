import React from "react";
import TitleClient from "./TitleClient";
import { getListingById } from "@/db/listing";

type Props = {};

const TitlePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }

  return <TitleClient listing={listing} />;
};

export default TitlePage;
