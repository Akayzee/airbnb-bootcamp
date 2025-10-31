"use server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

type deleteListingProps = {
  listingId: string;
};

export const deleteListing = async (listingId: string) => {
  try {
    const session = await auth();

    if (!session) {
      return { error: "Unauthorized" };
    }
    const deletedListing = await prisma.listing.delete({
      where: {
        id: listingId,
        userId: session.user.id,
      },
    });

    revalidatePath("/hosting/listings");
    return { success: "Listing deleted successfully", deletedListing };
  } catch (error) {
    return { error: "Failed to delete listing" };
  }
};
