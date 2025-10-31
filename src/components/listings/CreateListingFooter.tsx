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
        <Link href={nextHref}>
          <Button
            onClick={handleNext}
            disabled={
              options &&
              !options?.selectedCategory &&
              !options?.selectedPrivacyType
            }
            size="lg"
            className="w-full md:w-32 hover:cursor-pointer"
          >
            Next
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CreateListingFooter;
