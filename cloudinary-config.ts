export const cloudinaryCloudName =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const bootcampUploadPreset =
  process.env.NEXT_PUBLIC_AIRBNB_IMAGES_UPLOAD_PRESETS;

export const cloudinaryApiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
export const cloudinaryApiSecret =
  process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET;
export const cloudinaryBaseUrl = `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}`;
export const cloudinaryUrl = `https://res.cloudinary.com/${cloudinaryCloudName}/image/upload`;
export const cloudinaryThumbnailUrl = `${cloudinaryUrl}/w_50,h_50,c_fill,g_auto:subject,q_auto,f_auto`;
