"use client";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import React, { useCallback } from "react";
import { Listing } from "../../../../../../generated/prisma";
import { updateListing } from "@/actions/listing/update-listing";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { useRouter } from "next/navigation";
import { AddressAutofill, AddressMinimap } from "@mapbox/search-js-react";
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

type Props = {
  listing: Listing;
};

const LocationClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/location`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  const form = useForm({
    defaultValues: {
      address1: "",
    },
  });

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
            <form>
              <AddressAutofill accessToken="pk.eyJ1IjoiYWtpbmxhd29uIiwiYSI6ImNrN3VxNnRzaDEzYWozbXNmYjFtNHYycmIifQ.AWVSyRhv1vFTrIYp0jYfnQ">
                <FormField
                  control={form.control}
                  name="address1"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          {...field}
                          className="border-1 border-gray-700"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </AddressAutofill>
            </form>
          </Form>
          <AddressMinimap accessToken="pk.eyJ1IjoiYWtpbmxhd29uIiwiYSI6ImNrN3VxNnRzaDEzYWozbXNmYjFtNHYycmIifQ.AWVSyRhv1vFTrIYp0jYfnQ" />
        </div>
      </div>
      <CreateListingFooter
        backHref={`/become-a-host/${listing.id}/privacy-type`}
        nextHref={`/become-a-host/${listing.id}/floor-plan`}
        prevProgress={13}
        nextProgress={20}
        options={{}}
      />
    </div>
  );
};

export default LocationClient;
