"use client";
import React, { useCallback, useEffect } from "react";
import { Listing } from "../../../../../../generated/prisma";
import * as z from "zod";
import { FieldPath, FieldPathValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { updateListing } from "@/actions/listing/update-listing";
import { useRouter } from "next/navigation";

type Props = {
  listing: Listing;
};

const DiscountFormSchema = z
  .object({
    isNewListingDiscount: z.boolean(),
    isLastMinuteDiscount: z.boolean(),
    isWeeklyDiscount: z.boolean(),
    isMonthlyDiscount: z.boolean(),
    lastMinuteDiscount: z
      .number()
      .int()
      .min(0)
      .max(99, {
        error: "Cannot be greater than 99%",
      })
      .optional(),
    weeklyDiscount: z.number().min(0).max(99).optional(),
    monthlyDiscount: z.number().int().min(0).max(99).optional(),
  })
  .refine(
    (data) =>
      !data.isLastMinuteDiscount || data.lastMinuteDiscount !== undefined,
    {
      message: "Last minute discount must be set when enabled",
      path: ["lastMinuteDiscount"],
    }
  )
  .refine(
    (data) => !data.isWeeklyDiscount || data.weeklyDiscount !== undefined,
    {
      message: "Weekly discount must be set when enabled",
      path: ["weeklyDiscount"],
    }
  )
  .refine(
    (data) => !data.isMonthlyDiscount || data.monthlyDiscount !== undefined,
    {
      message: "Monthly discount must be set when enabled",
      path: ["monthlyDiscount"],
    }
  )
  .refine(
    (data) => {
      // Only validate comparison when BOTH discounts are enabled
      if (!data.isWeeklyDiscount || !data.isMonthlyDiscount) return true;
      if (
        data.weeklyDiscount === undefined ||
        data.monthlyDiscount === undefined
      )
        return true;
      return data.weeklyDiscount < data.monthlyDiscount;
    },
    {
      message: `Weekly discount must be less than monthly discount`,
      path: ["weeklyDiscount"],
    }
  )
  .refine(
    (data) => {
      // Only validate comparison when BOTH discounts are enabled
      if (!data.isWeeklyDiscount || !data.isMonthlyDiscount) return true;
      if (
        data.weeklyDiscount === undefined ||
        data.monthlyDiscount === undefined
      )
        return true;
      return data.monthlyDiscount > data.weeklyDiscount;
    },
    {
      message: `Monthly discount must be greater than weekly discount`,
      path: ["monthlyDiscount"],
    }
  );

const DiscountClient = ({ listing }: Props) => {
  const form = useForm<z.infer<typeof DiscountFormSchema>>({
    resolver: zodResolver(DiscountFormSchema),
    defaultValues: {
      isNewListingDiscount: listing.isNewListingDiscount,
      isLastMinuteDiscount: listing.isLastMinuteDiscount,
      isMonthlyDiscount: listing.isMonthlyDiscount,
      isWeeklyDiscount: listing.isWeeklyDiscount,
      lastMinuteDiscount: listing.lastMinuteDiscount || 0,
      weeklyDiscount: listing.weeklyDiscount || 0,
      monthlyDiscount: listing.monthlyDiscount || 0,
    },
    mode: "all",
  });
  const { updateDraft, draft, reset } = useCreateListingStore();
  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const router = useRouter();

  const isLastMinuteDiscount = watch("isLastMinuteDiscount");
  const isMonthlyDiscount = watch("isMonthlyDiscount");
  const isNewListingDiscount = watch("isNewListingDiscount");
  const isWeeklyDiscount = watch("isWeeklyDiscount");
  const lastMinuteDiscount = watch("lastMinuteDiscount");
  const weeklyDiscount = watch("weeklyDiscount");
  const monthlyDiscount = watch("monthlyDiscount");

  const setCustomValue = <
    TField extends FieldPath<z.infer<typeof DiscountFormSchema>>,
  >(
    id: TField,
    value: FieldPathValue<z.infer<typeof DiscountFormSchema>, TField>
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //   const handleLastMinuteDiscountChange = (
  //     e: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const value = e.target.value;
  //     if (value === "") {
  //       handleLastMinuteDiscountUpdate(0);
  //       return;
  //     }

  //     let lastMinuteDiscount = parseInt(value);
  //     if (Number.isNaN(lastMinuteDiscount)) {
  //       handleLastMinuteDiscountUpdate(0);
  //       return;
  //     }

  //     if (lastMinuteDiscount > 100) {
  //       lastMinuteDiscount = 100;
  //     }

  //     handleLastMinuteDiscountUpdate(lastMinuteDiscount);
  //   };

  //   function handleLastMinuteDiscountUpdate(value: number) {
  //     setValue("lastMinuteDiscount", value);
  //     updateDraft({
  //       lastMinuteDiscount: value,
  //     });
  //   }

  //   const handleWeeklyDiscountChange = (
  //     e: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const value = e.target.value;
  //     if (value === "") {
  //       handleWeeklyDiscountUpdate(0);
  //       return;
  //     }

  //     let weeklyDiscount = parseInt(value);
  //     if (Number.isNaN(weeklyDiscount)) {
  //       handleWeeklyDiscountUpdate(0);
  //       return;
  //     }

  //     if (weeklyDiscount > 100) {
  //       weeklyDiscount = 100;
  //     }

  //     handleWeeklyDiscountUpdate(weeklyDiscount);
  //   };

  //   const handleMonthlyDiscountChange = (
  //     e: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const value = e.target.value;
  //     if (value === "") {
  //       handleMonthlyDiscountUpdate(0);
  //       return;
  //     }

  //     let monthlyDiscount = parseInt(value);
  //     if (Number.isNaN(monthlyDiscount)) {
  //       handleMonthlyDiscountUpdate(0);
  //       return;
  //     }

  //     if (monthlyDiscount > 100) {
  //       monthlyDiscount = 100;
  //     }

  //     handleMonthlyDiscountUpdate(monthlyDiscount);
  //   };
  //   function handleWeeklyDiscountUpdate(value: number) {
  //     setValue("weeklyDiscount", value);
  //     updateDraft({
  //       weeklyDiscount: value,
  //     });
  //   }

  //   function handleMonthlyDiscountUpdate(value: number) {
  //     setValue("monthlyDiscount", value);
  //     updateDraft({
  //       monthlyDiscount: value,
  //     });
  //   }

  type DiscountField =
    | "lastMinuteDiscount"
    | "weeklyDiscount"
    | "monthlyDiscount";

  const clamp = (n: number, min: number, max: number) =>
    Math.min(max, Math.max(min, n));

  function parsePercentInput(raw: string) {
    if (raw.trim() === "") return 0;

    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return 0;

    return clamp(n, 0, 99);
  }

  function updateDiscount(field: DiscountField, value: number) {
    setCustomValue(field, value);
    trigger();
    updateDraft({ [field]: value } as Pick<
      Parameters<typeof updateDraft>[0],
      DiscountField
    >);
  }

  function onDiscountChange(field: DiscountField) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parsePercentInput(e.target.value);
      updateDiscount(field, value);
    };
  }

  const handleLastMinuteDiscountChange = onDiscountChange("lastMinuteDiscount");
  const handleWeeklyDiscountChange = onDiscountChange("weeklyDiscount");
  const handleMonthlyDiscountChange = onDiscountChange("monthlyDiscount");

  useEffect(() => {
    updateDraft({
      id: listing.id,
      step: "discount",
      lastMinuteDiscount: listing.lastMinuteDiscount || 0,
      weeklyDiscount: listing.weeklyDiscount || 0,
      monthlyDiscount: listing.monthlyDiscount || 0,
    });
  }, [updateDraft, listing]);

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/legal`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  return (
    <div className="flex min-h-[120vh] md:min-h-screen flex-col bg-background ">
      <div className="mx-auto flex w-full max-w-2xl items-center flex-1 flex-col px-2 md:px-6 pt-8 pb-12">
        <div className="flex flex-col space-y-3 w-full">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add Discounts
          </h1>
          <p className="text-sm text-muted-foreground">
            Help your place stand out to get booked faster and earn your first
            reviews.
          </p>
        </div>
        <div className="mt-4 flex flex-1 flex-col w-full justify-start gap-6">
          <Card className="bg-[#f7f7f7] border-1 border-gray-300 pt-10 pb-10">
            <CardContent className="flex items-center ">
              <div className="flex items-center w-4/5 gap-6">
                <div className="flex items-center  p-2 gap-0.5 font-extrabold text-md">
                  <div className="text-sm md:text-md 2ch">
                    {listing.newListingDiscount}
                  </div>
                  <div className="text-xs">%</div>
                </div>
                <div className="flex flex-col w-4/5">
                  <div className="text-md font-semibold">
                    New Listing Promotion
                  </div>
                  <div className="text-xs text-shadow-muted-foreground">
                    Offer 20% off your first bookings
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-1/5 ">
                <Checkbox
                  className="h-6 w-6 bg-white"
                  checked={isNewListingDiscount}
                  onCheckedChange={(val) => {
                    setValue("isNewListingDiscount", Boolean(val));
                    updateDraft({
                      isNewListingDiscount: Boolean(val),
                    });
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#f7f7f7] border-1 border-gray-300 pt-10 pb-10">
            <CardContent className="flex items-center  ">
              <div className="flex flex-col w-full">
                <div className="flex items-center  gap-6 w-full ">
                  <div
                    className={`flex items-center p-2  rounded-xl  border-1 gap-0.5  
                    ${!isLastMinuteDiscount ? " border-gray-300 select-none hover:cursor-not-allowed" : "border-primary"}
                    `}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      disabled={!isLastMinuteDiscount}
                      pattern="[0-9]*"
                      maxLength={3}
                      max={100}
                      min={0}
                      style={{ width: "2ch" }}
                      value={lastMinuteDiscount}
                      onChange={handleLastMinuteDiscountChange}
                      className={`
      inline
      text-sm
      md:text-md
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
${!isLastMinuteDiscount ? "text-gray-300 select-none hover:cursor-not-allowed" : ""}
    `}
                    />
                    <div
                      className={`text-xs
                   ${!isLastMinuteDiscount ? " text-gray-300 " : ""} 
                    `}
                    >
                      %
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-md font-semibold">
                      Last Minute Discount
                    </div>
                    <div className="text-xs text-shadow-muted-foreground">
                      For stays booked 14 days or less before arrival
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Checkbox
                      className="h-6 w-6 bg-white"
                      checked={isLastMinuteDiscount}
                      onCheckedChange={(val) => {
                        setValue("isLastMinuteDiscount", Boolean(val), {
                          shouldValidate: true,
                        });
                        updateDraft({
                          isLastMinuteDiscount: Boolean(val),
                        });
                      }}
                    />
                  </div>
                </div>
                {errors.lastMinuteDiscount && (
                  <p className="text-xs text-destructive mt-3">
                    {`${errors.lastMinuteDiscount?.message}`}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#f7f7f7] border-1 border-gray-300 pt-10 pb-10">
            <CardContent className="flex items-center  ">
              <div className="flex flex-col w-full">
                <div className="flex items-center  gap-6 w-full ">
                  <div
                    className={`flex items-center p-2  rounded-xl  border-1 gap-0.5  
                    ${!isWeeklyDiscount ? " border-gray-300 select-none hover:cursor-not-allowed" : "border-primary"}
                    `}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      disabled={!isWeeklyDiscount}
                      pattern="[0-9]*"
                      maxLength={3}
                      max={100}
                      min={0}
                      style={{ width: "2ch" }}
                      value={weeklyDiscount}
                      onChange={handleWeeklyDiscountChange}
                      className={`
      inline
      text-sm
      md:text-md
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
${!isWeeklyDiscount ? "text-gray-300 select-none hover:cursor-not-allowed" : ""}
    `}
                    />
                    <div
                      className={`text-xs
                   ${!isWeeklyDiscount ? " text-gray-300 " : ""} 
                    `}
                    >
                      %
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-md font-semibold">Weekly Discount</div>
                    <div className="text-xs text-shadow-muted-foreground">
                      For stays of 7 nights or more
                    </div>
                  </div>

                  <div className="flex  justify-end">
                    <Checkbox
                      className="h-6 w-6 bg-white"
                      checked={isWeeklyDiscount}
                      onCheckedChange={(val) => {
                        setValue("isWeeklyDiscount", Boolean(val), {
                          shouldValidate: true,
                        });
                        updateDraft({
                          isWeeklyDiscount: Boolean(val),
                        });
                      }}
                    />
                  </div>
                </div>
                {errors.weeklyDiscount && (
                  <p className="text-xs text-destructive mt-3">
                    {`${errors.weeklyDiscount?.message} of ${monthlyDiscount}%`}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-[#f7f7f7] border-1 border-gray-300 pt-10 pb-10">
            <CardContent className="flex items-center  ">
              <div className="flex flex-col w-full">
                <div className="flex items-center  gap-6 w-full ">
                  <div
                    className={`flex items-center p-2  rounded-xl  border-1 gap-0.5 
                    ${!isMonthlyDiscount ? " border-gray-300 select-none hover:cursor-not-allowed" : "border-primary"}
                    `}
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      disabled={!isMonthlyDiscount}
                      pattern="[0-9]*"
                      maxLength={3}
                      max={100}
                      min={0}
                      style={{ width: "2ch" }}
                      value={monthlyDiscount}
                      onChange={handleMonthlyDiscountChange}
                      className={`
      inline
      text-sm
      md:text-md
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
${!isMonthlyDiscount ? "text-gray-300 select-none hover:cursor-not-allowed" : ""}
    `}
                    />
                    <div
                      className={`text-xs
                   ${!isMonthlyDiscount ? " text-gray-300 " : ""} 
                    `}
                    >
                      %
                    </div>
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="text-md font-semibold">
                      Monthly Discount
                    </div>
                    <div className="text-xs text-shadow-muted-foreground">
                      For stays of 28 nights or more
                    </div>
                  </div>

                  <div className="flex  justify-end">
                    <Checkbox
                      className="h-6 w-6 bg-white"
                      checked={isMonthlyDiscount}
                      onCheckedChange={(val) => {
                        setValue("isMonthlyDiscount", Boolean(val), {
                          shouldValidate: true,
                        });
                        updateDraft({
                          isMonthlyDiscount: Boolean(val),
                        });
                      }}
                    />
                  </div>
                </div>
                {errors.monthlyDiscount && (
                  <p className="text-xs text-destructive mt-3">
                    {`${errors.monthlyDiscount?.message} of ${weeklyDiscount}%`}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/legal`}
        backHref={`/become-a-host/${listing.id}/weekend-price`}
        prevProgress={89}
        nextProgress={97}
        handleNext={handleNext}
        options={{
          hasNoDiscountErrors: Object.keys(errors).length === 0,
        }}
      />
    </div>
  );
};

export default DiscountClient;
