"use client";
import { Edit, Plus } from "lucide-react";
import { TbLayoutList } from "react-icons/tb";
import React, { useState } from "react";
import useCreateListingDialogStore from "@/hooks/use-create-listing-dialog";
import { Listing } from "../../../../../generated/prisma";
import HostingListingCard from "@/components/listings/HostingListingCard";
import useEditListingDialogStore from "@/hooks/use-edit-listing-dialog";
import EditListingDialog from "@/components/listings/EditListingDialog";
import DeleteListingDialog from "@/components/listings/DeleteListingDialog";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { ListingWithPhotos } from "@/lib/types";

type Props = {
  listings: ListingWithPhotos[];
};

const ListingsClient = ({ listings }: Props) => {
  const { open } = useCreateListingDialogStore();
  const { draft } = useCreateListingStore();
  const { open: openEditDialog } = useEditListingDialogStore();
  const [selectedListing, setSelectedListing] =
    useState<ListingWithPhotos | null>(null);

  return (
    <>
      <EditListingDialog listing={selectedListing!} />
      <DeleteListingDialog listing={selectedListing!} />

      <div className="p-10">
        <div className="flex justify-between">
          <div className="text-xl text-gray-600 font-extrabold">
            Your listings
          </div>
          <div className="flex gap-3 text-gray-600">
            <TbLayoutList
              size={40}
              className="cursor-pointer border-[1px] rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
            />
            <Plus
              size={40}
              className="cursor-pointer border-[1px] rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
              onClick={open}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5">
          {listings.map((listing) => (
            <HostingListingCard
              onClick={() => {
                openEditDialog();
                setSelectedListing(listing);
              }}
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ListingsClient;
