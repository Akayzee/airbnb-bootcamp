import { prisma } from "@/lib/prisma";

export const getUserListings = async (userId: string) => {
  const listings = await prisma.listing.findMany({
    where: {
      userId: userId,
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
