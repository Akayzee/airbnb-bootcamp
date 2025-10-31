"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Category, Listing } from "../../../../../../generated/prisma";
import { IconType } from "react-icons/lib";
import { CategoryIcon } from "@/components/CategoryIcon";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { updateListing } from "@/actions/listing/update-listing";

type Props = {
  categories: Category[];
  listing: Listing;
  icon?: IconType;
};

const StructureClient = ({ categories, listing, icon: Icon }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const initialCategory = listing.categoryId
    ? categories.find((cat) => cat.id === listing.categoryId)
    : undefined;

  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(initialCategory);
  const router = useRouter();

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    updateDraft({ categoryId: category.id, step: "structure", id: listing.id });
  };

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/privacy-type`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-center flex-col gap-8 items-center p-4">
          <div className="text-4xl font-bold text-center">
            Which of these best describes your place?
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                className={`border-1 md:w-60 rounded-md p-4 flex flex-col gap-2 hover:border-black cursor-pointer transition transform active:scale-95
                  ${selectedCategory?.id === category.id ? "border-2 border-black bg-gray-100" : ""}`}
                key={category.id}
                onClick={() => handleSelectCategory(category)}
              >
                <CategoryIcon icon={category.icon} />
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
        <Progress value={7} className="mb-4" />
        <div className="flex justify-between gap-2">
          <Link href={`/become-a-host/${listing.id}/about-your-place`}>
            <Button
              variant="outline"
              size="lg"
              className="w-32 hover:cursor-pointer"
            >
              Back
            </Button>
          </Link>

          <Button
            size="lg"
            className={`w-32 ${selectedCategory ? "hover:cursor-pointer" : "hover:cursor-not-allowed"}`}
            disabled={!selectedCategory}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
      </div> */}
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/privacy-type`}
        backHref={`/become-a-host/${listing.id}/about-your-place`}
        prevProgress={0}
        nextProgress={7}
        options={{ selectedCategory }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default StructureClient;
