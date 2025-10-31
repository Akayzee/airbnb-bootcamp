"use server";
import { prisma } from "@/lib/prisma";
import { Listing } from "../../../generated/prisma";
import { revalidatePath } from "next/cache";

export const updateListing = async (
  draft: Partial<Listing>,
  listingId: string
) => {
  try {
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data: draft,
    });

    if (!updatedListing) {
      throw new Error("Cannot update listing");
    }
    revalidatePath(`/become-a-host/${listingId}/structure`);
    return { success: "listing updated", updatedListing };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Unexpected error occurred" };
  }
};
