import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useParams } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";

type Props = {};

const SaveAndExitButton = (props: Props) => {
  const params = useParams<{ id: string }>();
  const { draft, reset } = useCreateListingStore();

  return (
    <Link href="/hosting/listings">
      <Button
        size="lg"
        className="border-1 rounded-full border-gray-300 text-gray-800 p-3 hover:border-black bg-transparent hover:bg-transparent hover:cursor-pointer"
        onClick={() => {
          updateListing(draft, params.id).then((res) => {
            if (res.success) {
              reset();
            }
          });
        }}
      >
        Save & Exit
      </Button>
    </Link>
  );
};

export default SaveAndExitButton;
