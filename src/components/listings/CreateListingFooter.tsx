"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
    isFormComplete?: boolean;
  };
  handleNext?: () => void;
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

    return false;
  };

  const buttonDisabled = isDisabled();

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
      <Progress value={progress} className="mt-5" />
      <div className="mt-5 flex md:justify-between gap-2 flex-col md:flex-row">
        <Link href={backHref}>
          <Button
            onClick={reset}
            // onClick={handleGetStarted}
            // disabled={isPending}
            variant="outline"
            size="lg"
            className="w-full md:w-32 hover:cursor-pointer"
          >
            Back
          </Button>
        </Link>
        {buttonDisabled ? (
          <Button
            onClick={handleNext}
            disabled
            size="lg"
            className="w-full md:w-32 cursor-not-allowed opacity-50"
          >
            Next
          </Button>
        ) : (
          //   <Link href={nextHref}>
          <Button
            onClick={handleNext}
            size="lg"
            className="w-full md:w-32 hover:cursor-pointer"
          >
            Next
          </Button>
          //   </Link>
        )}
      </div>
    </div>
  );
};

export default CreateListingFooter;
