"use client";

import useCreateListingDialogStore from "@/hooks/use-create-listing-dialog";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { HostingOptions } from "@/lib/constants";
import { useState } from "react";
import Link from "next/link";

type Props = {};

type IHostingOptions = {
  label: string;
  path: string;
  image: string;
};

const CreateListingDialog = (props: Props) => {
  const { isOpen, close } = useCreateListingDialogStore();
  const initialState = {
    label: "",
    path: "",
    image: "",
  };
  const [selectedOption, setSelectedOption] =
    useState<IHostingOptions>(initialState);
  const handleOptionClick = (option: IHostingOptions) => {
    setSelectedOption(option);
  };

  const handleDialogClose = () => {
    close();
    setSelectedOption(initialState);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogClose}>
      <DialogContent className="rounded-3xl ">
        <DialogTitle className="text-center mb-10">
          What would you like to host?
        </DialogTitle>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-5">
          {HostingOptions.map((option) => (
            <div
              key={option.label}
              className={`flex flex-col rounded-lg items-center gap-5 border-1 p-5 cursor-pointer transition-colors hover:bg-gray-50 ${
                selectedOption.label === option.label
                  ? "border-black bg-gray-50 border-2"
                  : "border-gray-100"
              }`}
              onClick={() => handleOptionClick(option)}
            >
              <Image src={option.image} alt="home" height={100} width={100} />
              <p className="text-md font-bold ">{option.label}</p>
            </div>
          ))}
        </div>
        <hr />
        <div className="flex justify-end">
          {selectedOption.path === initialState.path ? (
            <Button
              disabled
              size="lg"
              className="hover:cursor-not-allowed text-md"
            >
              Next
            </Button>
          ) : (
            <Link
              href={selectedOption.path}
              onClick={close}
              className="hover:cursor-pointer"
            >
              <Button size="lg" className="hover:cursor-pointer text-md">
                Next
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateListingDialog;
