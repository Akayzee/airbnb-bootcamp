import { Listing } from "@/lib/types";
import Link from "next/link";
import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import ListingCard from "./ListingCard";

type ListingGroupProps = {
  location: string;
  header: string;
  listings: Listing[];
};

const ListingsGroup = ({ location, header, listings }: ListingGroupProps) => {
  return (
    <div className="mb-10">
      <div className="flex items-center mb-5">
        <Link
          href={`/listings?location=${location}`}
          className="flex items-center"
        >
          <p className="font-semibold text-lg text-gray-900">{header}</p>
          <IoIosArrowForward
            size={16}
            className="font-semibold text-gray-900"
          />
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {listings.slice(0, 5).map((listing) => (
          <ListingCard key={listing.id} listing={listing} location={location} />
        ))}
      </div>
    </div>
  );
};

export default ListingsGroup;
