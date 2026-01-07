import React from "react";
import PhotosClient from "./PhotosClient";
import { getListingById } from "@/db/listing";

type Props = {};

const PhotosPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const listing = await getListingById(id);
  if (!listing) {
    return "Listing not found";
  }
  return <PhotosClient listing={listing} />;
};

export default PhotosPage;
