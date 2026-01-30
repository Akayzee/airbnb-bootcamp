"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type UpdateReviewHelpfulnessResult = {
  success: boolean;
  helpfulCount: number;
  notHelpfulCount: number;
  userVote: boolean | null;
  error?: string;
};

export const updateReviewHelpfulness = async (
  reviewId: string,
  isHelpful: boolean,
): Promise<UpdateReviewHelpfulnessResult> => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        helpfulCount: 0,
        notHelpfulCount: 0,
        userVote: null,
        error: "You must be logged in to vote",
      };
    }

    const userId = session.user.id;

    const existingVote = await prisma.reviewHelpfulness.findUnique({
      where: {
        reviewId_userId: {
          reviewId,
          userId,
        },
      },
    });

    let updatedReview;

    if (existingVote) {
      if (existingVote.isHelpful === isHelpful) {
        await prisma.$transaction([
          prisma.reviewHelpfulness.delete({
            where: {
              id: existingVote.id,
            },
          }),
          prisma.review.update({
            where: { id: reviewId },
            data: {
              helpfulCount: {
                decrement: isHelpful ? 1 : 0,
              },
              notHelpfulCount: {
                decrement: !isHelpful ? 1 : 0,
              },
            },
          }),
        ]);

        updatedReview = await prisma.review.findUnique({
          where: { id: reviewId },
          select: {
            helpfulCount: true,
            notHelpfulCount: true,
            listingId: true,
          },
        });

        revalidatePath(`/listings/${updatedReview?.listingId}`);

        return {
          success: true,
          helpfulCount: updatedReview?.helpfulCount ?? 0,
          notHelpfulCount: updatedReview?.notHelpfulCount ?? 0,
          userVote: null,
        };
      } else {
        await prisma.$transaction([
          prisma.reviewHelpfulness.update({
            where: { id: existingVote.id },
            data: { isHelpful },
          }),
          prisma.review.update({
            where: { id: reviewId },
            data: {
              helpfulCount: {
                increment: isHelpful ? 1 : -1,
              },
              notHelpfulCount: {
                increment: !isHelpful ? 1 : -1,
              },
            },
          }),
        ]);

        updatedReview = await prisma.review.findUnique({
          where: { id: reviewId },
          select: {
            helpfulCount: true,
            notHelpfulCount: true,
            listingId: true,
          },
        });

        revalidatePath(`/listings/${updatedReview?.listingId}`);
        return {
          success: true,
          helpfulCount: updatedReview?.helpfulCount ?? 0,
          notHelpfulCount: updatedReview?.notHelpfulCount ?? 0,
          userVote: isHelpful,
        };
      }
    } else {
      await prisma.$transaction([
        prisma.reviewHelpfulness.create({
          data: {
            reviewId,
            userId,
            isHelpful,
          },
        }),
        prisma.review.update({
          where: { id: reviewId },
          data: {
            helpfulCount: {
              increment: isHelpful ? 1 : 0,
            },
            notHelpfulCount: {
              increment: !isHelpful ? 1 : 0,
            },
          },
        }),
      ]);

      updatedReview = await prisma.review.findUnique({
        where: { id: reviewId },
        select: {
          helpfulCount: true,
          notHelpfulCount: true,
          listingId: true,
        },
      });

      revalidatePath(`/listings/${updatedReview?.listingId}`);
      return {
        success: true,
        helpfulCount: updatedReview?.helpfulCount ?? 0,
        notHelpfulCount: updatedReview?.notHelpfulCount ?? 0,
        userVote: isHelpful,
      };
    }
  } catch (error) {
    console.error("Error updating review helpfulness:", error);
    return {
      success: false,
      helpfulCount: 0,
      notHelpfulCount: 0,
      userVote: null,
      error: "Failed to update review helpfulness",
    };
  }
};
