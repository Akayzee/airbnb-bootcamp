"use server";

import { prisma } from "@/lib/prisma";
import { ImageContentProps, ImageFormValues } from "@/lib/types";
import { revalidatePath } from "next/cache";

export const uploadImages = async (
  images: ImageContentProps[],
  listingId: string,
) => {
  try {
    for (const photo of images) {
      await prisma.photo.create({
        data: {
          url: photo.url,
          signature: photo.signature,
          publicId: photo.publicId,
          listingId: listingId,
        },
      });
    }
    revalidatePath(`/become-a-host/${listingId}/photos`);

    return { success: true };
  } catch (error) {}
};
