import { getListingById } from "@/db/listing";
import { NextResponse } from "next/server";
import React from "react";
import PrivacyClient from "./PrivacyClient";
import StructureClient from "../structure/StructureClient";
import { getCategories } from "@/db/category";
import { getPrivacyTypes } from "@/db/privacy-type";

type PrivacyTypeProps = {
  params: Promise<{ id: string }>;
};

const PrivacyType = async ({ params }: PrivacyTypeProps) => {
  const { id } = await params;
  const listing = await getListingById(id);
  const privacyTypes = await getPrivacyTypes();

  if (!listing) {
    return <div>listing Not Found</div>;
  }

  return (
    <div className="h-screen md:h-[80vh]  flex flex-col items-center justify-center">
      <PrivacyClient privacyTypes={privacyTypes} listing={listing} />
    </div>
  );
};

export default PrivacyType;
