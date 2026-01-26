"use client";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import React, { useCallback, useState } from "react";
import { Listing } from "../../../../../../generated/prisma";
import { updateListing } from "@/actions/listing/update-listing";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useRouter } from "next/navigation";
import {
  AddressMinimap,
  useConfirmAddress,
  AddressAutofill,
} from "@mapbox/search-js-react";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  AddressAutofillFeatureSuggestion,
  AddressAutofillRetrieveResponse,
} from "@mapbox/search-js-core";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

type Props = {
  listing: Listing;
};

export const addressSchema = z.object({
  address1: z
    .string()
    .min(1, "Address line 1 is required")
    .max(200, "Address line 1 is too long"),
  address2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postcode: z
    .string()
    .min(1, "Postcode is required")
    .max(20, "Postcode must be shorter than 20 characters"),
  full_address: z
    .string()
    .min(1, "Full address is required")
    .max(300, "Full address is too long"),
  country_code: z
    .string()
    .min(1, "Country code is required")
    .max(5, "Invalid country code format"),
});

const LocationClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const [showFormFields, setShowFormFields] = useState(false);

  const [minimapFeature, setMinimapFeature] =
    useState<AddressAutofillFeatureSuggestion>();
  const { formRef, showConfirm } = useConfirmAddress({
    accessToken: process.env.NEXT_MAPBOX_KEY,
  });
  const router = useRouter();

  const form = useForm<z.infer<typeof addressSchema>>({
    defaultValues: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      postcode: "",
      full_address: "",
      country_code: "",
    },
    resolver: zodResolver(addressSchema),
    mode: "all",
  });

  const updateForm = useCallback(
    (feature: AddressAutofillFeatureSuggestion) => {
      const properties = feature.properties;
      form.setValue("address1", properties.address_line1 || "");
      form.setValue("address2", properties.address_line2 || "");
      form.setValue("city", properties.address_level2 || "");
      form.setValue("state", properties.address_level1 || "");
      form.setValue("country", properties.country || "");
      form.setValue("country_code", properties.country_code || "");
      form.setValue("postcode", properties.postcode || "");
      form.setValue("full_address", properties.full_address || "");

      const fullAddress = form.watch("full_address");
      const country = form.watch("country");
      const city = form.watch("city");
      const state = form.watch("state");
      const postcode = form.watch("postcode");

      updateDraft({
        location: fullAddress,
        country: country,
        city: city,
        state: state,
        country_code: properties.country_code,
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
        step: "location",
      });
    },
    [form, updateDraft],
  );

  const handleAutofillRetrieve = (
    response: AddressAutofillRetrieveResponse,
  ) => {
    if (response.features && response.features.length > 0) {
      const feature = response.features[0];
      setShowFormFields(true);
      setMinimapFeature(feature);
      const properties = feature.properties;
      updateForm(feature);
    }
  };

  const handleFormSubmit = useCallback(async () => {}, []);

  const handleChangeAddress = () => {};

  const handleNext = useCallback(async () => {
    const result = await showConfirm();

    if (result.type === "nochange") {
      updateListing(draft, listing.id).then((res) => {
        if (res.success) {
          router.push(`/become-a-host/${listing.id}/floor-plan`);
          reset();
        }
      });
    }
    // // submit the address data from the better match chosen by the user
    if (result.type === "change") {
      //   submitFormWithChanges(result.feature);
      updateForm(result.feature);
    }
  }, [showConfirm, updateForm]);

  const handleTryAgain = () => {
    formRef.current.reset();
    // setMinimapFeature();
  };

  console.log(draft);

  return (
    <div>
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="flex justify-center flex-col gap-8 items-center p-4">
          <div className="flex flex-col  gap-4">
            <div className="text-4xl font-bold ">
              Where is your place located?
            </div>
            <div className="text-xl text-gray-500">
              Your address is only shared with guests after they have booked a
              reservation.
            </div>
          </div>
          <Form {...form}>
            <form
              ref={formRef}
              onSubmit={form.handleSubmit(handleFormSubmit)}
              className="w-full md:w-3/5 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-4 w-full">
                <AddressAutofill
                  accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
                  onRetrieve={handleAutofillRetrieve}
                >
                  <FormField
                    control={form.control}
                    name="address1"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Address Line 1</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your address"
                            {...field}
                            className="border-1 border-gray-700 w-full"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </AddressAutofill>
                {showFormFields && (
                  <>
                    <FormField
                      control={form.control}
                      name="address2"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Address Line 2 (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Apartment, suite, unit, building, floor, etc."
                              {...field}
                              className="border-1 border-gray-700 w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="City"
                              {...field}
                              className="border-1 border-gray-700 w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="State or Province"
                              {...field}
                              className="border-1 border-gray-700 w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Country"
                              {...field}
                              className="border-1 border-gray-700 w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Postal Code"
                              {...field}
                              className="border-1 border-gray-700 w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button>Confirm New Address</Button>
                  </>
                )}
              </div>
              <div
                id="minimap-container"
                className={clsx("h-90 w-full relative", {
                  none: !minimapFeature,
                })}
              >
                <AddressMinimap
                  feature={minimapFeature}
                  show={!!minimapFeature}
                  satelliteToggle
                  canAdjustMarker
                  footer
                  accessToken={`${process.env.NEXT_PUBLIC_MAPBOX_KEY}`}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>
      <CreateListingFooter
        backHref={`/become-a-host/${listing.id}/privacy-type`}
        nextHref={`/become-a-host/${listing.id}/floor-plan`}
        prevProgress={13}
        nextProgress={20}
        options={{
          hasValidAddress:
            form.formState.isValid && !!form.watch("full_address"),
          hasNoErrors: Object.keys(form.formState.errors).length === 0,
          isFormComplete:
            !!form.watch("address1") &&
            !!form.watch("city") &&
            !!form.watch("country"),
        }}
        handleNext={handleNext}
      />
    </div>
  );
};

export default LocationClient;
