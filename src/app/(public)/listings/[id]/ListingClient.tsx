"use client";
import React from "react";
import { ListingWithRelations } from "@/lib/types";
import Image from "next/image";
import { Heart, ShareIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import LeftFlower from "@/components/listings/LeftFlower";
import RightFlower from "@/components/listings/RightFlower";
import StarRatings from "react-star-ratings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbAugmentedReality } from "react-icons/tb";
import { CustomIcon } from "@/components/CustomIcon";
import ReviewCard from "@/components/listings/Reviews/ReviewCard";
import { Button } from "@/components/ui/button";
import AllReviewsDialog from "@/components/listings/Reviews/AllReviewsDialog";
import useShowAllReviewsDialogStore from "@/hooks/use-show-all-reviews-dialog";
import ReviewsHeader from "@/components/listings/Reviews/ReviewsHeader";
import { meanBy } from "lodash";

type Props = {
  listing: ListingWithRelations;
};

const ListingClient = ({ listing }: Props) => {
  const { open } = useShowAllReviewsDialogStore();
  const averageRating = meanBy(
    listing.reviews,
    (review) => review.averageRating,
  );
  return (
    <div className="max-w-7xl flex flex-col mx-auto gap-10 ">
      <div className="flex items-center justify-between">
        <div className="text-3xl font-bold">{listing.title}</div>

        <div className="flex gap-2">
          <div className="flex gap-2 items-center">
            <ShareIcon />
            <p>Share</p>
          </div>
          <div className="flex gap-2 items-center">
            <Heart />
            <p className="text-sm ">Save</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 h-[50vh]">
        <div className="w-1/2 h-full">
          <Image
            src={listing.photos[0].url}
            width={300}
            height={300}
            alt={listing.photos[0].caption ?? "Cover Picture"}
            className="object-cover rounded-tl-2xl rounded-bl-2xl w-full h-full transition"
          />
        </div>
        <div className="w-1/2 h-full grid grid-cols-2  gap-2">
          {listing.photos.slice(1, 5).map((photo, index) => (
            <div key={photo.id} className="relative w-full h-full">
              <Image
                src={photo.url}
                fill
                alt={photo.publicId}
                className={`object-cover transition 
                   ${index === 1 ? "rounded-tr-2xl" : ""}
                   ${index === 3 ? "rounded-br-2xl" : ""}
                  `}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex">
        <div className="w-3/4 p-4 flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">
              {`${listing.privacyType?.name} in ${listing.city}, ${listing.country}`}
            </p>

            <div className="flex items-center gap-2">
              <p className="text-sm">
                {listing.guestCount === 1
                  ? `${listing.guestCount} guest`
                  : `${listing.guestCount} guests`}
              </p>
              <p>&middot;</p>
              <p className="text-sm">
                {listing.bedroomCount === 1
                  ? `${listing.guestCount} bedroom`
                  : `${listing.guestCount} bedrooms`}
              </p>
              <p>&middot;</p>
              <p className="text-sm">
                {listing.bedCount === 1
                  ? `${listing.bedCount} bed`
                  : `${listing.bedCount} beds`}
              </p>
              <p>&middot;</p>
              <p className="text-sm">
                {listing.bathroomCount === 1
                  ? `${listing.bathroomCount} bathroom`
                  : `${listing.bathroomCount} bathrooms`}
              </p>
            </div>
          </div>
          <Card>
            <CardContent className="flex items-center justify-around gap-1">
              <div className="flex items-center gap-1">
                <LeftFlower height={32} />
                <div className="flex flex-col justify-center items-center h-[32px]">
                  <p className="text-sm font-bold">Guest</p>
                  <p className="text-sm font-bold">Favorite</p>
                </div>
                <RightFlower height={32} />
              </div>
              <p className="text-sm font-bold">
                One of the most loved homes on Airbnb,
                <br /> according to guests
              </p>
              <div className="flex flex-col items-center">
                <p className="text-xl font-bold">{averageRating}</p>
                <StarRatings
                  rating={averageRating}
                  starRatedColor="black"
                  starDimension="12px"
                  starSpacing="1px"
                />
              </div>

              <div className="border-l border-l-gray-400 h-full"></div>

              <div className="flex flex-col justify-center items-center">
                <p className="text-xl font-bold">{listing.reviews.length}</p>
                <p className="text-sm">
                  {listing.reviews.length === 1 ? "Review" : "Reviews"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Avatar className="size-12">
              <AvatarImage src={`${listing.user.image}`} />
              <AvatarFallback>{listing.user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-md font-bold">Hosted by {listing.user.name}</p>

              <p className="text-xs text-muted-foreground">
                {/* Needs to be dynamic not hardcoded */}
                Superhost &middot; 1 year hosting
              </p>
            </div>
          </div>
          <hr className="my-3" />
          <div>
            <p className="text-sm">{listing.description}</p>
          </div>
          <hr />
          <div className="flex flex-col gap-6">
            <p className="text-xl font-semibold">What this place offers</p>
            <div className="grid grid-cols-2 gap-6">
              {listing.amenities.map((amenity) => (
                <div key={amenity.id} className="flex gap-3 items-center">
                  <CustomIcon icon={amenity.icon} />
                  <p className="text-sm text-[]">{amenity.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-amber-300">Reservations Component</div>
      </div>
      <hr className="my-3" />
      <ReviewsHeader reviews={listing.reviews} />
      <hr className="my-3" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {listing.reviews.slice(0, 10).map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      {listing.reviews.length > 10 ? (
        <div className="w-full md:w-1/4">
          <Button
            variant="outline"
            className="w-full  pl-6 pr-6 bg-[#FAFAFA] text-black"
            onClick={open}
          >
            Show All {listing.reviews.length} Reviews
          </Button>
        </div>
      ) : null}
      <AllReviewsDialog reviews={listing.reviews} />
    </div>
  );
};

export default ListingClient;
