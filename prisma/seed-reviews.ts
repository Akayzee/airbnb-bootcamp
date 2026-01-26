import { prisma } from "@/lib/prisma";

//replace listingId and userId with your listingId and userID
export const reviews = [
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 5,
    cleanlinessRating: 5,
    accuracyRating: 5,
    checkInRating: 5,
    communicationRating: 5,
    locationRating: 4,
    valueRating: 5,
    averageRating: 5,
    comment:
      "Spotless apartment and very smooth check-in. Host was responsive and helpful throughout.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 4,
    cleanlinessRating: 4,
    accuracyRating: 4,
    checkInRating: 5,
    communicationRating: 5,
    locationRating: 4,
    valueRating: 4,
    averageRating: 4,
    comment:
      "Great location and easy access. A bit smaller than expected, but overall very comfortable.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 5,
    cleanlinessRating: 5,
    accuracyRating: 5,
    checkInRating: 4,
    communicationRating: 5,
    locationRating: 5,
    valueRating: 5,
    averageRating: 5,
    comment:
      "Exactly as described. The neighborhood was perfect and the place felt brand new.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 3,
    cleanlinessRating: 3,
    accuracyRating: 4,
    checkInRating: 3,
    communicationRating: 4,
    locationRating: 3,
    valueRating: 3,
    averageRating: 3,
    comment:
      "Decent stay, but the apartment could use a deeper clean. Host was friendly though.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 5,
    cleanlinessRating: 5,
    accuracyRating: 5,
    checkInRating: 5,
    communicationRating: 5,
    locationRating: 5,
    valueRating: 4,
    averageRating: 5,
    comment:
      "One of the best stays I’ve had. Everything was seamless from start to finish.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 4,
    cleanlinessRating: 4,
    accuracyRating: 4,
    checkInRating: 4,
    communicationRating: 4,
    locationRating: 5,
    valueRating: 4,
    averageRating: 4,
    comment:
      "Very good overall. Location is the biggest plus — close to everything.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 2,
    cleanlinessRating: 2,
    accuracyRating: 3,
    checkInRating: 2,
    communicationRating: 3,
    locationRating: 4,
    valueRating: 2,
    averageRating: 3,
    comment:
      "Location was nice, but the place didn’t meet expectations for the price.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 5,
    cleanlinessRating: 5,
    accuracyRating: 5,
    checkInRating: 5,
    communicationRating: 5,
    locationRating: 5,
    valueRating: 5,
    averageRating: 5,
    comment: "Absolutely loved it. Would 100% stay here again.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 4,
    cleanlinessRating: 5,
    accuracyRating: 4,
    checkInRating: 4,
    communicationRating: 5,
    locationRating: 3,
    valueRating: 4,
    averageRating: 4,
    comment:
      "Very clean and well managed. Slightly far from the center but still convenient.",
  },
  {
    listingId: "cmh9n6v7o00018ufkfxnt670p",
    userId: "cmgw16zzg0000c7gyic4fifw8",
    rating: 5,
    cleanlinessRating: 5,
    accuracyRating: 5,
    checkInRating: 5,
    communicationRating: 4,
    locationRating: 4,
    valueRating: 5,
    averageRating: 5,
    comment: "Great value for money. Comfortable, quiet, and well-equipped.",
  },
];

export async function seedReviews() {
  console.log("Seeding reviews");
  await prisma.review.createMany({
    data: reviews,
  });
  console.log("Reviews seeded");
}

async function main() {
  seedReviews();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
