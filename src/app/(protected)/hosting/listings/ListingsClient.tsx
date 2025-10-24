"use client";
import { Plus, PlusCircle } from "lucide-react";
import { TbLayoutList } from "react-icons/tb";
import React from "react";
import useCreateListingDialogStore from "@/hooks/use-create-listing-dialog";

type Props = {};

const ListingsClient = (props: Props) => {
  const { open } = useCreateListingDialogStore();
  return (
    <div className="p-10">
      <div className="flex justify-between">
        <div className="text-xl text-gray-600 font-extrabold">
          Your listings
        </div>
        <div className="flex gap-3 text-gray-600">
          <TbLayoutList
            size={40}
            className="cursor-pointer border-[1px] rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
          />
          <Plus
            size={40}
            className="cursor-pointer border-[1px] rounded-full p-2 bg-gray-100 hover:bg-gray-200 transition"
            onClick={open}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingsClient;
