"use client";
import Link from "next/link";
import React, { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Category, PrivacyType } from "../../../generated/prisma";
import useCreateListingStore from "@/hooks/use-create-listing-store";

type Props = {
  nextHref: string;
  backHref: string;
  prevProgress: number;
  nextProgress: number;
  options?: {
    selectedCategory?: Category;
    selectedPrivacyType?: PrivacyType;
    hasValidAddress?: boolean;
    hasNoErrors?: boolean;
    hasNoDiscountErrors?: boolean;
    isFormComplete?: boolean;
    selectedAmenitiesIds?: string[];
    title?: string;
    description?: string;
    price?: number | null;
    weekendPrice?: number | null;
    isPhotosEmpty?: boolean;
    isPhotosMinLength?: boolean;
  };
  handleNext: () => void;
};

const CreateListingFooter = ({
  nextHref,
  backHref,
  prevProgress,
  nextProgress,
  options,
  handleNext,
}: Props) => {
  const [progress, setProgress] = useState(prevProgress);
  const { reset } = useCreateListingStore();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(nextProgress), 100);
    return () => clearTimeout(timer);
  }, [nextProgress]);

  const isDisabled = () => {
    if (!options) return false;

    // For category selection page
    if (options.selectedCategory !== undefined) {
      return !options.selectedCategory;
    }

    if (options.title !== undefined) {
      return options.title === "";
    }
    if (options.description !== undefined) {
      return options.description === "";
    }

    if (options.price !== undefined && options.price !== null) {
      return (
        options.price === 0 || options.price < 100 || options.price > 100000
      );
    }

    if (options.selectedAmenitiesIds !== undefined) {
      return options.selectedAmenitiesIds.length === 0;
    }

    // For privacy type selection page
    if (options.selectedPrivacyType !== undefined) {
      return !options.selectedPrivacyType;
    }

    // For address/location page
    if (
      options.hasValidAddress !== undefined ||
      options.hasNoErrors !== undefined ||
      options.isFormComplete !== undefined
    ) {
      return !(
        options.hasValidAddress &&
        options.hasNoErrors &&
        options.isFormComplete
      );
    }

    if (options.isPhotosEmpty !== undefined || options.isPhotosMinLength) {
      return options.isPhotosEmpty || options.isPhotosMinLength;
    }
    //For Discount Page
    if (options.hasNoDiscountErrors !== undefined) {
      return !options.hasNoDiscountErrors;
    }

    return false;
  };

  const buttonDisabled = isDisabled();

  const handleNextButton = () => {
    startTransition(() => {
      handleNext();
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
      <Progress value={progress} className="mt-5" />
      <div className="mt-5 flex justify-between gap-2 ">
        <Link href={backHref}>
          <Button
            onClick={reset}
            // onClick={handleGetStarted}
            // disabled={isPending}
            variant="outline"
            size="lg"
            className="w-32  hover:cursor-pointer"
          >
            Back
          </Button>
        </Link>
        {buttonDisabled ? (
          <Button
            disabled
            size="lg"
            className="w-32  cursor-not-allowed opacity-50"
          >
            Next
          </Button>
        ) : (
          //   <Link href={nextHref}>
          <Button
            onClick={handleNextButton}
            size="lg"
            className="w-32  hover:cursor-pointer"
          >
            {isPending ? (
              <div className="h-4 w-4 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin" />
            ) : (
              "Next"
            )}
          </Button>
          //   </Link>
        )}
      </div>
    </div>
  );
};

export default CreateListingFooter;
