"use client";

import useCreateListingDialogStore from "@/hooks/use-create-listing-dialog";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { HostingOptions } from "@/lib/constants";
import { useState } from "react";
import Link from "next/link";
import useSecurityCameraDialogStore from "@/hooks/use-security-camera-dialog";
import { Textarea } from "../ui/textarea";
import { FieldPath, FieldPathValue } from "react-hook-form";
import { LegalFormSchema } from "@/app/(protected)/become-a-host/[id]/legal/LegalClient";
import * as z from "zod";
import useCreateListingStore from "@/hooks/use-create-listing-store";
import { DialogDescription } from "@radix-ui/react-dialog";

type Props = {
  securityCameraDescription?: string;
  setCustomValue: <TField extends FieldPath<z.infer<typeof LegalFormSchema>>>(
    field: TField,
    value: FieldPathValue<z.infer<typeof LegalFormSchema>, TField>
  ) => void;
  isSecurityCamera: boolean;
};

const SecurityCameraDialog = ({
  securityCameraDescription,
  setCustomValue,
  isSecurityCamera,
}: Props) => {
  const { isOpen, close } = useSecurityCameraDialogStore();
  const { updateDraft, draft, reset } = useCreateListingStore();
  const handleDialogClose = () => {
    close();
  };

  const handleContinue = () => {
    setCustomValue("isSecurityCamera", true);
    updateDraft({
      isSecurityCamera: true,
    });
    close();
  };
  const isDisabled = () => {
    if (securityCameraDescription !== undefined) {
      return securityCameraDescription.length === 0;
    }

    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomValue("securityCameraDescription", e.target.value);
    updateDraft({
      securityCameraDescription: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="rounded-3xl ">
        <DialogTitle className="">
          Tell guests about your exterior security cameras
        </DialogTitle>
        <DialogDescription>
          Describe the area that each camera monitors, such as the backyard or
          pool.
        </DialogDescription>
        <Textarea
          maxLength={500}
          className="w-full rounded-lg border border-gray-800 bg-white px-3 py-2 text-base shadow-sm focus-visible:ring-2 focus-visible:ring-black min-h-32"
          onChange={handleChange}
          value={securityCameraDescription}
        />
        <hr />
        <div className="flex justify-end">
          <Button
            disabled={isDisabled()}
            onClick={handleContinue}
            size="lg"
            className="hover:cursor-pointer text-md"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SecurityCameraDialog;
