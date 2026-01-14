// app/host/price/page.tsx or components/ListingPriceStep.tsx
"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Listing } from "../../../../../../generated/prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { updateListing } from "@/actions/listing/update-listing";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { priceFormatter } from "@/lib/helpers";
import { MdModeEdit } from "react-icons/md";

type props = {
  listing: Listing;
};

const priceSchema = z
  .number()
  .min(100, "Price must be at least 100 kr")
  .max(100000, "Price cannot exceed 100,000 kr");

const PriceClient = ({ listing }: props) => {
  const [price, setPrice] = React.useState<number | null>(listing.price || 750);
  const [error, setError] = React.useState<string>("");
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [isFocused, setIsFocused] = useState(false);

  const numericPrice = Number(price || 0);
  const formattedGuestPrice = new Intl.NumberFormat().format(
    Math.round(numericPrice * 1.14)
  );

  const displayValue =
    price === null ? "" : priceFormatter.format(Number(price));

  const length = price?.toString().length || 1;

  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value !== "" && !/^\d+$/.test(value)) {
      return;
    }

    const numericValue = value === "" ? 0 : Number(value);

    // Validate with Zod
    const result = priceSchema.safeParse(numericValue);

    if (!result.success) {
      setError(result.error?.flatten().formErrors[0]);
    } else {
      setError("");
    }

    setPrice(numericValue);
    updateDraft({
      price: numericValue,
      step: "price",
      id: listing.id,
    });
  };
  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/weekend-price`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex  flex-col bg-background">
      <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-16 pb-12">
        <div className="flex flex-col justify-center space-y-3">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Now, set a weekday base price
          </h1>
          <p className="text-sm text-muted-foreground">
            You will set a weekend price next.
          </p>
        </div>
        <div className="mt-16 flex flex-1 flex-col items-center justify-start gap-6">
          <div className="text-6xl md:text-8xl font-semibold tracking-tight leading-none ">
            <div className="flex items-baseline">
              <span className="">kr</span>

              <input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                style={{
                  width: `${length}ch`,
                }}
                value={price || 0}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="
      inline
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
    "
              />

              {!isFocused && (
                <div
                  className="rounded-full  border-1 p-1.5 hover:cursor-pointer"
                  onClick={() => inputRef.current?.focus()}
                >
                  <MdModeEdit size={20} />
                </div>
              )}
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <p className="text-sm text-muted-foreground">
            Guest price {formattedGuestPrice} kr NOK
          </p>
        </div>
      </div>
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/weekend-price`}
        backHref={`/become-a-host/${listing.id}/finish-setup`}
        prevProgress={80}
        nextProgress={89}
        handleNext={handleNext}
        options={{ price }}
      />
    </div>
  );
};

export default PriceClient;
