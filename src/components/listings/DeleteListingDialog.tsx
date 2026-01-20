"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
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
import { deleteListing } from "@/actions/listing/delete-listing";
import { useCurrentUser } from "@/hooks/use-current-user";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { ListingWithPhotos } from "@/lib/types";

type Props = {};

type DeleteListingProps = {
  listing: ListingWithPhotos;
};

const DeleteListingDialog = ({ listing }: DeleteListingProps) => {
  const { isOpen, close, open } = useDeleteListingDialogStore();
  const { open: openEditDialog } = useEditListingDialogStore();
  const user = useCurrentUser();

  const handleDelete = () => {
    close();
    deleteListing(listing.id).then((res) => {
      if (res.success) {
        toast.success("Listing removed successfully");
      } else if (res.error) {
        toast.error(`${res.error}`);
      }
    });
  };

  const handleCancel = () => {
    close();
    openEditDialog();
  };

  if (!listing) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="rounded-3xl flex flex-col gap-5 w-1/5">
        <DialogTitle className="text-center">Remove Listing?</DialogTitle>
        <DialogDescription>
          Are you sure you want to remove this listing? This action cannot be
          undone.
        </DialogDescription>
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
                {format(listing.createdAt, "MMMM do, yyyy")}
              </p>
            )}
          </div>
        </div>

        <hr />
        <div className="flex flex-col  gap-4">
          <Button
            className="w-full hover:cursor-pointer"
            onClick={handleDelete}
          >
            Yes, Remove Listing
          </Button>
          <div className="flex justify-center">
            <div
              className="flex items-center gap-2 hover:cursor-pointer"
              onClick={handleCancel}
            >
              Cancel
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteListingDialog;
