import { Review } from "./types";

export const averageRating = (reviews: Review[]) =>
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

export function fixEmojiEncoding(str: string) {
  return decodeURIComponent(str);
}
