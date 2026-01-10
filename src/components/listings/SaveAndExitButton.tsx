"use client";
import Link from "next/link";
import React from "react";
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

  console.log(isOpen);

  return (
    <Button
      size="lg"
      className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
      onClick={() => {
        // validatePrice(draft);
        if (draft.price! < 100 || draft.price! > 100000) {
          open();
          return;
        }
        updateListing(draft, params.id).then((res) => {
          if (res.success) {
            reset();
            router.push("/hosting/listings");
          }
        });
      }}
    >
      Save & Exit
    </Button>
  );
};

export default SaveAndExitButton;
