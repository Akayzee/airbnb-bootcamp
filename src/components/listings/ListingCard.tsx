import { Listing } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { averageRating } from "@/lib/helpers";
import { MIDDOT } from "@/lib/constants";
import { FaStar } from "react-icons/fa";

type ListingCardProps = {
  listing: Listing;
  location?: string;
};

const ListingCard = ({ listing, location }: ListingCardProps) => {
  return (
    <div className="flex flex-col gap-1 ">
      <Link href={`/listings/${listing.id}`}>
        <div className="flex flex-col gap-3">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <div className="h-72 w-72 md:h-48 md:w-48">
              <Image
                src={listing.imageUrl}
                alt={listing.title}
                fill={true}
                objectFit="cover"

                //   loading="lazy"
              />
            </div>

            {listing.guestFavorite && (
              <Badge
                variant="secondary"
                className="absolute top-2 left-2 rounded-full opacity-90  text-xs"
              >
                Guest favorite
              </Badge>
            )}
            <AiOutlineHeart
              size={20}
              className="absolute top-2 right-2 text-white opacity-90 cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-xs text-gray-900 ">
              {listing.listingType} in {location}
            </p>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <p>${listing.price * 2} for 2 nights</p>
              <p className="scale-200">{MIDDOT}</p>
              <FaStar className="inline-block text-gray-500" />
              <p>{averageRating(listing.reviews).toFixed(1)} </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
