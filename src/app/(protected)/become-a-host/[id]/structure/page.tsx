import { getCategories } from "@/db/category";
import React from "react";
import StructureClient from "./StructureClient";
import { getListingById } from "@/db/listing";

type Props = {};

const Structure = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const categories = await getCategories();
  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }

  return <StructureClient categories={categories} listing={listing} />;
};

export default Structure;
