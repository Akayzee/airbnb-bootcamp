import { Prisma } from "../../generated/prisma";

export type Review = {
  id: number;
  rating: number;
  comment: string;
};

export type Listing = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  hostType: string;
  listingType: string;
  guestFavorite?: boolean;
  reviews: Review[];
};

export type ListingWithAmenities = Prisma.ListingGetPayload<{
  include: {
    amenities: true;
  };
}>;

export type ListingWithPhotos = Prisma.ListingGetPayload<{
  include: {
    photos: true;
  };
}>;

export type ImageContentProps = {
  url: string;
  publicId: string;
  signature: string;
  thumbnail: string;
};

export type ImageFormValues = {
  images: ImageContentProps[];
};
