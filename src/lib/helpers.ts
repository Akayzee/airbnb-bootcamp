import toast from "react-hot-toast";
import { Listing } from "../../generated/prisma";
import { Review } from "./types";

export const averageRating = (reviews: Review[]) =>
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

export function fixEmojiEncoding(str: string) {
  return decodeURIComponent(str);
}

export function validatePrice(draft: Partial<Listing>) {
  if (draft.price === 0 || draft.price! > 100000) {
    return toast.error("Invalid Price");
  }
}

export const priceFormatter = new Intl.NumberFormat("nb-NO");
