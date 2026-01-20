"use client";

import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { HostingOptions } from "@/lib/constants";
import { useState } from "react";
import Link from "next/link";
import useEditListingDialogStore from "@/hooks/use-edit-listing-dialog";
import { MdDelete } from "react-icons/md";
import { Listing } from "../../../generated/prisma";
import { useRouter } from "next/navigation";
import useDeleteListingDialogStore from "@/hooks/use-delete-listing-dialog";
import { ListingWithPhotos } from "@/lib/types";

type Props = {};

type EditListingProps = {
  listing: ListingWithPhotos;
};

const EditListingDialog = ({ listing }: EditListingProps) => {
  const { isOpen, close } = useEditListingDialogStore();
  const { open: openDeleteDialog, close: closeDeleteDialog } =
    useDeleteListingDialogStore();
  const router = useRouter();
  const handleDialogClose = () => {
    close();
  };

  const EditListingButton = () => {
    close();
    router.push(`/become-a-host/${listing.id}/${listing.step}`);
  };
  const removeListing = () => {
    close();
    openDeleteDialog();
  };

  if (!listing) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="rounded-3xl flex flex-col gap-5 ">
        <DialogTitle></DialogTitle>
        <div className="flex flex-col justify-center gap-3">
          <Image
            src={listing.photos[0]?.url || "/images/placeholder.avif"}
            alt={listing.title || "Listing Image"}
            width={200}
            height={200}
            className="rounded-xl self-center"

            //   loading="lazy"
          />
          <div className="flex flex-col gap-1">
            {listing.title && listing.location ? (
              <p className="font-semibold text-xs text-gray-900 ">
                {listing.title} in {listing.location}
              </p>
            ) : (
              <p className="font-semibold text-xs text-gray-900 ">
                Your House listing started on {""}
                {listing.createdAt.toDateString()}
              </p>
            )}
          </div>
        </div>

        <hr />
        <div className="flex flex-col  gap-4">
          <Button
            className="w-full hover:cursor-pointer"
            onClick={EditListingButton}
          >
            Edit Listing
          </Button>
          <div className="flex justify-center">
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={removeListing}
            >
              <MdDelete size={15} /> <p className="text-sm">Remove Listing</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditListingDialog;
