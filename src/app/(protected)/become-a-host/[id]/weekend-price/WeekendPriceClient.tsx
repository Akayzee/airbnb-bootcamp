"use client";

import * as React from "react";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Listing } from "../../../../../../generated/prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { updateListing } from "@/actions/listing/update-listing";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { z } from "zod";
import { Slider } from "@/components/ui/slider";

const priceFormatter = new Intl.NumberFormat("nb-NO");

const priceSchema = z
  .number()
  .min(100, "Price must be at least 100 kr")
  .max(100000, "Price cannot exceed 100,000 kr");

type props = {
  listing: Listing;
};

const WeekendPriceClient = ({ listing }: props) => {
  const [weekendPrice, setWeekendPrice] = useState<number | null>(
    listing.weekendPrice || listing.price || 0
  );
  const [error, setError] = useState<string>("");
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [premium, setPremium] = useState<number>(listing.weekendPremium || 0);

  // Base weekday price
  const basePrice = listing.price || 0;

  // Calculate weekend price based on premium percentage
  const calculatedWeekendPrice = Math.round(basePrice * (1 + premium / 100));

  const formattedGuestPrice = new Intl.NumberFormat().format(
    Math.round(calculatedWeekendPrice * 1.14)
  );

  const router = useRouter();

  const handleSliderChange = (value: number[]) => {
    const newPremium = value[0];
    handleUpdate(newPremium);
  };

  function handleUpdate(value: number) {
    setPremium(value);
    const newWeekendPrice = Math.round(basePrice * (1 + value / 100));
    const result = priceSchema.safeParse(newWeekendPrice);

    if (!result.success) {
      setError(result.error?.flatten().formErrors[0]);
    } else {
      setError("");
    }

    setWeekendPrice(newWeekendPrice);
    updateDraft({
      weekendPrice: newWeekendPrice,
      weekendPremium: value,
      step: "weekend-price",
      id: listing.id,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      handleUpdate(0);
      return;
    }

    let newPrice = parseInt(value);
    if (Number.isNaN(newPrice)) {
      handleUpdate(0);

      return;
    }

    if (newPrice > 100) {
      newPrice = 100;
    }

    handleUpdate(newPrice);
  };

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/discount`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex  flex-col bg-background ">
      <div className="mx-auto flex w-full max-w-2xl items-center flex-1 flex-col px-6 pt-16 pb-12">
        <div className="flex flex-col space-y-3 w-full">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add Discounts
          </h1>
          <p className="text-sm text-muted-foreground">
            Help your place stand out to get booked faster and earn your first
            reviews.
          </p>
        </div>
        <div className="mt-16 flex flex-1 flex-col w-full justify-start gap-6">
          <div
            className="text-6xl md:text-8xl font-semibold tracking-tight leading-none text-center"
            style={{ minWidth: "300px" }}
          >
            <span className="">kr {calculatedWeekendPrice}</span>
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <p className="text-sm text-muted-foreground text-center">
            Guest price {formattedGuestPrice} kr NOK
          </p>
          <div className="w-full space-y-4">
            <div className="flex justify-between ">
              <div className="">
                <p className="text-sm md:text-lg  text-primary">
                  Weekend premium
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Tip: Try 2%
                </p>
              </div>
              <div
                className="flex items-center p-2 md:p-4  rounded-xl border-primary border-2"
                style={{ minWidth: "50px" }}
              >
                <input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={3}
                  max={100}
                  min={0}
                  style={{ width: "3ch" }}
                  value={premium}
                  onChange={handleChange}
                  className="
      inline
      text-sm
      md:text-lg
      p-0
      m-0
      border-0
      font-semibold
      tracking-tight
      leading-none
      text-center
      focus:outline-none
      focus:ring-0
      focus:border-0
   [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
    "
                />
                <div className="text-lg">%</div>
              </div>
            </div>
            <Slider
              value={[premium]}
              max={100}
              min={0}
              step={1}
              onValueChange={handleSliderChange}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">0%</p>
              <div className="text-xs text-muted-foreground">100%</div>
            </div>
          </div>
        </div>
      </div>
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/discount`}
        backHref={`/become-a-host/${listing.id}/price`}
        prevProgress={80}
        nextProgress={89}
        handleNext={handleNext}
        options={{ weekendPrice }}
      />
    </div>
  );
};

export default WeekendPriceClient;
