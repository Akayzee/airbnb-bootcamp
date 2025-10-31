import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { averageRating } from "@/lib/helpers";
import { MIDDOT } from "@/lib/constants";
import { FaStar } from "react-icons/fa";
import { Listing } from "../../../generated/prisma";

type HostingListingCardProps = {
  listing: Listing;
  onClick?: () => void;
};

const HostingListingCard = ({ listing, onClick }: HostingListingCardProps) => {
  return (
    <div className="flex flex-col gap-1 hover:cursor-pointer" onClick={onClick}>
      <div className="flex flex-col gap-3">
        <div className="relative w-full rounded-2xl overflow-hidden">
          <Image
            src={listing.photos[0] || "/images/placeholder.avif"}
            alt={listing.title || "Listing Image"}
            width={300}
            height={300}

            //   loading="lazy"
          />

          <Badge
            variant="secondary"
            className="absolute top-2 left-2 rounded-full opacity-90  text-xs"
          >
            {listing.isPublished ? (
              ""
            ) : (
              <div className="flex items-center gap-2">
                <div className="rounded-full  text-orange-300">{MIDDOT}</div>
                <span className="text-xs leading-none">In Progress</span>
              </div>
            )}
          </Badge>
        </div>
        <div className="flex flex-col gap-1">
          {listing.title && listing.location ? (
            <p className="font-semibold text-xs text-gray-900 ">
              {listing.title} in {listing.location}
            </p>
          ) : (
            <p className="font-semibold text-xs text-gray-900 ">
              Your House listing started on {""}
              {listing.createdAt.toDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostingListingCard;
