import { prisma } from "@/lib/prisma";

const amenities = [
  // 👇 Guest favorites
  {
    name: "Wifi",
    description: "Fast, reliable Wi-Fi available throughout the listing.",
    icon: "Wifi",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "TV",
    description: "TV available for entertainment.",
    icon: "Tv",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Kitchen",
    description: "Fully equipped kitchen for cooking meals.",
    icon: "CookingPot",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Washer",
    description: "In-unit washer for your laundry.",
    icon: "WashingMachine",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Free parking on premises",
    description: "Free parking available at the property.",
    icon: "ParkingCircle",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Paid parking on premises",
    description: "Paid parking available at the property.",
    icon: "ParkingSquare",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Air conditioning",
    description: "Air conditioning to keep you comfortable.",
    icon: "Snowflake",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },
  {
    name: "Dedicated workspace",
    description: "Desk or workspace suitable for working.",
    icon: "Laptop",
    isGuestFavorite: true,
    isStandOut: false,
    isSafety: false,
  },

  // ✨ Stand-out amenities
  {
    name: "Pool",
    description: "Access to a swimming pool.",
    icon: "Waves",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Hot tub",
    description: "Relaxing hot tub available.",
    icon: "Bath",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Patio",
    description: "Outdoor patio area for relaxing.",
    icon: "Sun",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "BBQ grill",
    description: "Outdoor BBQ grill for cooking.",
    icon: "Flame",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Outdoor dining area",
    description: "Outdoor seating area for dining.",
    icon: "UtensilsCrossed",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Fire pit",
    description: "Cozy fire pit for evenings outside.",
    icon: "Flame",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Pool table",
    description: "Indoor pool table for games.",
    icon: "Dice5",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Indoor fireplace",
    description: "Indoor fireplace for warmth and atmosphere.",
    icon: "Home",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Piano",
    description: "Piano available for guests to play.",
    icon: "Music",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Exercise equipment",
    description: "Gym or exercise equipment on site.",
    icon: "Dumbbell",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Lake access",
    description: "Direct access to a lake.",
    icon: "Waves",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Beach access",
    description: "Direct access to the beach.",
    icon: "Umbrella",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Ski-in/Ski-out",
    description: "Direct access to ski slopes.",
    icon: "MountainSnow",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },
  {
    name: "Outdoor shower",
    description: "Outdoor shower available.",
    icon: "ShowerHead",
    isGuestFavorite: false,
    isStandOut: true,
    isSafety: false,
  },

  // 🛡 Safety amenities
  {
    name: "Smoke alarm",
    description: "Smoke alarms installed in the property.",
    icon: "AlarmSmoke",
    isGuestFavorite: false,
    isStandOut: false,
    isSafety: true,
  },
  {
    name: "First aid kit",
    description: "First aid kit available for emergencies.",
    icon: "FirstAidKit",
    isGuestFavorite: false,
    isStandOut: false,
    isSafety: true,
  },
  {
    name: "Fire extinguisher",
    description: "Fire extinguisher available on site.",
    icon: "FireExtinguisher",
    isGuestFavorite: false,
    isStandOut: false,
    isSafety: true,
  },
  {
    name: "Carbon monoxide alarm",
    description: "Carbon monoxide alarm installed.",
    icon: "AlarmSmoke",
    isGuestFavorite: false,
    isStandOut: false,
    isSafety: true,
  },
];

async function main() {
  await Promise.all(
    amenities.map((amenity) =>
      prisma.amenity.upsert({
        where: { name: amenity.name },
        update: amenity,
        create: amenity,
      })
    )
  );

  console.log(`Seeded ${amenities.length} amenities ✅`);
}

main()
  .catch((e) => {
    console.error("Error seeding amenities:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
