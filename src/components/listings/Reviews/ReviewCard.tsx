import React from "react";
import { Review } from "../../../../generated/prisma";
import { ReviewWithUserInfo } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/helpers";
import StarRatings from "react-star-ratings";

type Props = {
  review: ReviewWithUserInfo;
};

const ReviewCard = ({ review }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-3">
        <Avatar className="size-12">
          <AvatarImage src={`${review.user.image}`} />
          <AvatarFallback>{review.user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-md font-bold">{review.user.name}</p>

          <p className="text-xs text-muted-foreground">
            Joined Airbnb {timeAgo(review.user.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <StarRatings
          rating={review.averageRating}
          starRatedColor="black"
          starDimension="12px"
          starSpacing="1px"
        />
        <p>&middot;</p>
        <p className="text-xs">{timeAgo(review.createdAt)}</p>
      </div>
      <div className="text-xs">
        {review.comment} Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Error impedit est sit porro velit rerum delectus ullam! Cumque at
        dolorum voluptatum dolores ratione provident? Ducimus omnis maiores
        doloribus ea corrupti?
      </div>
    </div>
  );
};

export default ReviewCard;
