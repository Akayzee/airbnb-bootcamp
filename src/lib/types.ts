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

export type ListingWithRelations = Prisma.ListingGetPayload<{
  include: {
    photos: true;
    reviews: {
      include: {
        user: {
          select: {
            image: true;
            name: true;
            createdAt: true;
          };
        };
      };
    };
    amenities: true;
    category: true;
    privacyType: true;
    user: true;
    reservations: true;
  };
}>;

export type ReviewWithUserInfo = Prisma.ReviewGetPayload<{
  include: {
    user: {
      select: {
        image: true;
        name: true;
        createdAt: true;
      };
    };
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
