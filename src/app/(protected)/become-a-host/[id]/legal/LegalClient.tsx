"use client";
import React, { useCallback, useEffect } from "react";
import { Listing } from "../../../../../../generated/prisma";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import * as z from "zod";
import { FieldPath, FieldPathValue, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { updateListing } from "@/actions/listing/update-listing";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { motion, AnimatePresence } from "motion/react";
import useSecurityCameraDialogStore from "@/hooks/use-security-camera-dialog";
import SecurityCameraDialog from "@/components/listings/SecurityCameraDialog";
import { Button } from "@/components/ui/button";

type Props = {
  listing: Listing;
};

export const LegalFormSchema = z.object({
  isWeapons: z.boolean(),
  isNoiseMonitor: z.boolean(),
  isSecurityCamera: z.boolean(),
  securityCameraDescription: z
    .string()
    .min(15, {
      error: "Cannot be less than 15 characters",
    })
    .max(500, {
      error: "Cannot be more than 500 characters",
    }),
});

const LegalClient = ({ listing }: Props) => {
  const { updateDraft, draft, reset } = useCreateListingStore();
  const router = useRouter();
  const { open } = useSecurityCameraDialogStore();

  const form = useForm<z.infer<typeof LegalFormSchema>>({
    resolver: zodResolver(LegalFormSchema),
    defaultValues: {
      isNoiseMonitor: listing.isNoiseMonitor,
      isWeapons: listing.isWeapons,
      isSecurityCamera: listing.isSecurityCamera,
      securityCameraDescription: listing.securityCameraDescription || "",
    },
    mode: "all",
  });

  const {
    watch,
    setValue,
    formState: { errors },
  } = form;

  const isNoiseMonitor = watch("isNoiseMonitor");
  const isSecurityCamera = watch("isSecurityCamera");
  const isWeapons = watch("isWeapons");
  const securityCameraDescription = watch("securityCameraDescription");

  const setCustomValue = <
    TField extends FieldPath<z.infer<typeof LegalFormSchema>>,
  >(
    id: TField,
    value: FieldPathValue<z.infer<typeof LegalFormSchema>, TField>
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    updateDraft({
      id: listing.id,
      step: "legal",
    });
  }, [updateDraft, listing]);

  const handleNext = useCallback(() => {
    updateListing(draft, listing.id).then((res) => {
      if (res.success) {
        router.push(`/become-a-host/${listing.id}/receipt`);
        reset();
      }
    });
  }, [draft, listing.id, router, reset]);

  const handleSecurityCamera = () => {
    if (isSecurityCamera) {
      setCustomValue("isSecurityCamera", false);
      updateDraft({
        isSecurityCamera: false,
      });
      return;
    }
    open();
  };

  return (
    <div className="flex  flex-col bg-background ">
      <motion.div
        className="mx-auto flex w-full max-w-2xl items-center flex-1 flex-col px-6 pt-16 pb-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="flex flex-col space-y-3 w-full">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Share safety details
          </h1>
          <p className="text-sm text-muted-foreground">
            Does your place have any of these?
          </p>
        </div>
        <div className="mt-5 flex flex-1 flex-col w-full  gap-6">
          <div className="flex flex-col">
            <div
              className="flex justify-between hover:cursor-pointer"
              onClick={handleSecurityCamera}
            >
              <div className="text-sm ">Exterior camera present</div>
              <motion.div
                className="flex "
                animate={{ scale: isSecurityCamera ? 1.1 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Checkbox
                  className="h-6 w-6 hover:cursor-pointer"
                  checked={isSecurityCamera}
                  onCheckedChange={handleSecurityCamera}
                />
              </motion.div>
            </div>
            <AnimatePresence>
              {isSecurityCamera && securityCameraDescription.length > 0 && (
                <motion.div
                  className="flex flex-col gap-5 text-xs text-[#6a6a6a] rounded-lg mt-3 p-3 bg-[#F6F6F6]"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <p>&quot;{securityCameraDescription}&quot;</p>
                  <Button
                    onClick={open}
                    variant="outline"
                    size="sm"
                    className="bg-transparent w-1/6 border-black hover:cursor-pointer"
                  >
                    Edit
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div
            className="flex justify-between hover:cursor-pointer"
            onClick={() => setCustomValue("isNoiseMonitor", !isNoiseMonitor)}
          >
            <div className="text-sm ">Noise decibel monitor present</div>
            <motion.div
              className="flex "
              animate={{ scale: isNoiseMonitor ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Checkbox
                className="h-6 w-6 hover:cursor-pointer"
                checked={isNoiseMonitor}
                onCheckedChange={(val) => {
                  setCustomValue("isNoiseMonitor", Boolean(val));
                  updateDraft({
                    isNoiseMonitor: Boolean(val),
                  });
                }}
              />
            </motion.div>
          </div>
          <div
            className="flex justify-between hover:cursor-pointer"
            onClick={() => setCustomValue("isWeapons", !isWeapons)}
          >
            <div className="text-sm ">Weapon(s) on the property</div>
            <motion.div
              className="flex "
              animate={{ scale: isWeapons ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Checkbox
                className="h-6 w-6 hover:cursor-pointer"
                checked={isWeapons}
                onCheckedChange={(val) => {
                  setCustomValue("isWeapons", Boolean(val));
                  updateDraft({
                    isWeapons: Boolean(val),
                  });
                }}
              />
            </motion.div>
          </div>
        </div>
        <Separator className="mt-15 mb-10" />
        <div>
          <div className="w-full text-lg text-[#6A6A6A]">
            Important things to know
          </div>
          <div className="w-full text-sm mt-1 text-justify text-[#6A6A6A]">
            Security cameras that monitor indoor spaces are not allowed even if
            they&apos;re turned off. All exterior security cameras must be
            disclosed.
          </div>
          <div className="w-full text-sm mt-3 text-justify text-[#6A6A6A]">
            Be sure to comply with your local laws and review Airbnb&apos;s
            anti-discrimination policy and guest and Host fees.
          </div>
        </div>
      </motion.div>
      <SecurityCameraDialog
        securityCameraDescription={securityCameraDescription}
        setCustomValue={setCustomValue}
        isSecurityCamera={isSecurityCamera}
      />
      <CreateListingFooter
        nextHref={`/become-a-host/${listing.id}/receipt`}
        backHref={`/become-a-host/${listing.id}/discount`}
        prevProgress={97}
        nextProgress={99}
        handleNext={handleNext}
        // options={{  }}
      />
    </div>
  );
};

export default LegalClient;
