import { prisma } from "@/lib/prisma";

export const getUserListings = async (userId: string) => {
  const listings = await prisma.listing.findMany({
    where: {
      userId: userId,
    },
    include: {
      photos: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return listings;
};

export const getListingById = async (listingId: string) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });
  return listing;
};

export const getListingWithRelations = async (listingId: string) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      amenities: true,
      category: true,
      photos: true,
      reviews: true,
      privacyType: true,
      user: true,
    },
  });
  return listing;
};

export const getListingWithAmenitiesById = async (listingId: string) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      amenities: true,
    },
  });
  return listing;
};

export const getListingWithPhotosById = async (listingId: string) => {
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
    include: {
      photos: {
        orderBy: {
          order: "asc",
        },
      },
    },
  });
  return listing;
};
