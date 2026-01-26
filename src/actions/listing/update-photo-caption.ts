"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const updatePhotoCaption = async (
  listingId: string,
  caption: string | null,
  photoId: string,
) => {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return { success: false, error: "Photo not found" };
    }

    const updatedPhoto = await prisma.photo.update({
      where: {
        id: photoId,
      },
      data: {
        caption,
      },
    });

    revalidatePath(`/become-a-host/${listingId}/photos`);
    return {
      success: true,
      message: "Photo caption updated successfully",
    };
  } catch (error) {
    console.error("Error updating caption:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
};
