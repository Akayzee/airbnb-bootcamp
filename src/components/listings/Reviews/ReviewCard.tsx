import React, { useState, useTransition } from "react";
import { Review } from "../../../../generated/prisma";
import { ReviewWithUserInfo } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from "@/lib/helpers";
import StarRatings from "react-star-ratings";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import { useRouter } from "next/navigation";
import { updateReviewHelpfulness } from "@/actions/update-review-helpfulness";

type Props = {
  review: ReviewWithUserInfo;
};

const ReviewCard = ({ review }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [userVote, setUserVote] = useState<boolean | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [notHelpfulCount, setNotHelpfulCount] = useState(
    review.notHelpfulCount,
  );

  const handleVote = (isHelpful: boolean) => {
    startTransition(async () => {
      const result = await updateReviewHelpfulness(review.id, isHelpful);

      if (result.success) {
        setUserVote(result.userVote);
        setHelpfulCount(result.helpfulCount);
        setNotHelpfulCount(result.notHelpfulCount);
        // router.refresh();
      } else {
        console.error(result.error);
        toast.error(result.error || "Failed to update vote");
      }
    });
  };

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
      <div className="flex items-baseline gap-2">
        <p className="text-xs">Is this helpful?</p>

        <Button
          variant="ghost"
          onClick={() => handleVote(true)}
          disabled={isPending}
          className={userVote === true ? "bg-blue-50" : ""}
        >
          <FaThumbsUp
            className={`text-xs ${userVote === true ? "text-blue-600" : ""}`}
          />
          <span className="ml-1">{helpfulCount}</span>
        </Button>

        <Button
          variant="ghost"
          onClick={() => handleVote(false)}
          disabled={isPending}
          className={userVote === false ? "bg-red-50" : ""}
        >
          <FaThumbsDown
            className={`text-xs ${userVote === false ? "text-red-500" : ""}`}
          />
          <span className="ml-1">{notHelpfulCount}</span>
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;
