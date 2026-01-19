"use client";

import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Listing } from "../../../../../../generated/prisma";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { updateListing } from "@/actions/listing/update-listing";
import { useCallback } from "react";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UploadPhotoDialog from "@/components/listings/UploadPhotoDialog";
import useUploadPhotoDialogStore from "@/hooks/use-upload-photo-dialog";

type Props = {
  listing: Listing;
};

const PhotosClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();
  const { open } = useUploadPhotoDialogStore();

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/title`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);
  return (
    <div className="flex min-h-[120vh] md:min-h-[100vh] flex-col bg-background ">
      <div className="mx-auto flex w-full max-w-2xl items-center flex-1 flex-col px-2 md:px-6 pt-8 pb-12">
        <div className="flex flex-col space-y-3 w-full">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add Some photos of your apartment
          </h1>
          <p className="text-sm text-muted-foreground">
            You&apos;ll need 5 photos to get started. You can add more or or
            make changes later.
          </p>
        </div>
        <div className="mt-4 flex flex-1 p-10  flex-col w-full justify-center items-center  gap-6 border-dashed border-2 border-gray-300 rounded-lg bg-[#F6f6f6]">
          <Image
            src="/images/camera.jpeg"
            width={250}
            height={250}
            alt="camera"
          />
          <Button
            variant="outline"
            className="bg-white border-black w-1/3 hover:cursor-pointer"
            onClick={open}
          >
            Add photos
          </Button>
        </div>
      </div>
      <UploadPhotoDialog />
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/title`}
        backHref={`/become-a-host/${listing.id}/amenities`}
        prevProgress={45}
        nextProgress={54}
        handleNext={handleNext}
        // options={{
        //   hasNoDiscountErrors: Object.keys(errors).length === 0,
        // }}
      />
    </div>
  );
};

export default PhotosClient;
