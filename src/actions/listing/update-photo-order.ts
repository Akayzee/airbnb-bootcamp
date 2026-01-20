"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePhotoOrder = async (
  listingId: string,
  photoIds: string[]
) => {
  try {
    // Update each photo's order based on its position in the array
    const updatePromises = photoIds.map((photoId, index) =>
      prisma.photo.update({
        where: { id: photoId },
        data: { order: index },
      })
    );

    await Promise.all(updatePromises);

    revalidatePath(`/become-a-host/${listingId}/photos`);
    return { success: true, message: "Photo order updated" };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
};
