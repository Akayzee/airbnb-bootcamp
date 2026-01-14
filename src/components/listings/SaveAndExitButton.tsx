"use client";
import Link from "next/link";
import React, { useTransition } from "react";
import { Button } from "../ui/button";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useParams, useRouter } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";
import toast from "react-hot-toast";
import { validatePrice } from "@/lib/helpers";
import useExitDialogStore from "@/hooks/use-exit-dialog";

type Props = {};

const SaveAndExitButton = (props: Props) => {
  const params = useParams<{ id: string }>();
  const { draft, reset } = useCreateListingStore();
  const { open, isOpen } = useExitDialogStore();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (draft.price! < 100 || draft.price! > 100000) {
      open();
      return;
    }
    if (draft.weeklyDiscount! > draft.monthlyDiscount!) {
      open();
      return;
    }
    startTransition(() => {
      updateListing(draft, params.id).then((res) => {
        if (res.success) {
          reset();
          router.push("/hosting/listings");
        }
      });
    });
  };

  return (
    <Button
      size="lg"
      className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
      onClick={handleSave}
    >
      {isPending ? (
        <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
      ) : (
        "Save & Exit"
      )}
    </Button>
  );
};

export default SaveAndExitButton;
