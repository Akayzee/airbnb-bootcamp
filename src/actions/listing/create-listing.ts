"use server";
import { prisma } from "@/lib/prisma";

export type CreateListingData = {
  userId: string;
  step: string;
};

export const createListing = async (data: CreateListingData) => {
  try {
    const listing = await prisma.listing.create({
      data,
    });

    if (!listing) {
      throw new Error("Cannot start process");
    }

    return { success: "Listing created successfully", listing };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Unexpected error occurred" };
  }
};
