"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

export const deletePhoto = async (
  publicId: string,
  listingId: string,
  photoId: string,
) => {
  try {
    // Get the photo details first
    const photo = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (!photo) {
      return { success: false, error: "Photo not found" };
    }

    // Prepare Cloudinary deletion
    const timestamp = Math.round(new Date().getTime() / 1000);
    const cloudinaryApiSecret = process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
    const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
    const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudinaryApiSecret || !cloudinaryApiKey || !cloudinaryCloudName) {
      return { success: false, error: "Cloudinary credentials not configured" };
    }

    // Generate signature for Cloudinary
    const stringToSign = `public_id=${photo.publicId}&timestamp=${timestamp}${cloudinaryApiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(stringToSign)
      .digest("hex");

    // Execute both operations in parallel
    const [cloudinaryResponse, deletedPhoto] = await Promise.all([
      // Delete from Cloudinary
      fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/image/destroy`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            public_id: photo.publicId,
            signature: signature,
            api_key: cloudinaryApiKey,
            timestamp: timestamp,
          }),
        },
      ).then((res) => res.json()),

      // Delete from database
      prisma.photo.delete({
        where: { id: photoId },
      }),
    ]);

    // Check Cloudinary response
    if (cloudinaryResponse.result !== "ok") {
      console.error("Cloudinary deletion failed:", cloudinaryResponse);
      // Photo is already deleted from DB, but Cloudinary failed
      return {
        success: true,
        warning: "Photo deleted from database but Cloudinary deletion failed",
        deletedPhoto,
      };
    }

    revalidatePath(`/become-a-host/${listingId}/photos`);
    return {
      success: true,
      message: "Photo deleted successfully",
      deletedPhoto,
    };
  } catch (error) {
    console.error("Error deleting photo:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Unexpected error occurred" };
  }
};
