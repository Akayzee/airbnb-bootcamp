import { prisma } from "../src/lib/prisma";

type Category = { name: string; icon: string };

type PrivacyType = { name: string; description: string; icon: string };

const categories: Category[] = [
  { name: "House", icon: "Home" },
  { name: "Apartment", icon: "Building2" },
  { name: "Barn", icon: "Building2" },
  { name: "Bed & breakfast", icon: "Coffee" },
  { name: "Boat", icon: "Sailboat" },
  { name: "Cabin", icon: "Trees" },
  { name: "Camper/RV", icon: "Bus" },
  { name: "Casa particular", icon: "Home" },
  { name: "Castle", icon: "Castle" },
  { name: "Cave", icon: "Mountain" },
  { name: "Container", icon: "Box" },
  { name: "Cycladic home", icon: "Home" },
  { name: "Dammuso", icon: "Building2" },
  { name: "Dome", icon: "Circle" },
  { name: "Earth home", icon: "Leaf" },
  { name: "Farm", icon: "Tractor" },
  { name: "Guesthouse", icon: "Users" },
  { name: "Hotel", icon: "Bed" },
  { name: "Houseboat", icon: "Sailboat" },
  { name: "Kezhan", icon: "Building2" },
  { name: "Minsu", icon: "Building2" },
  { name: "Riad", icon: "Flower" },
  { name: "Ryokan", icon: "Flower" },
  { name: "Shepherd’s hut", icon: "Home" },
  { name: "Tent", icon: "Tent" },
  { name: "Tiny home", icon: "Home" },
  { name: "Tower", icon: "RadioTower" },
  { name: "Treehouse", icon: "TreePine" },
  { name: "Trullo", icon: "Building2" },
  { name: "Windmill", icon: "Wind" },
  { name: "Yurt", icon: "Tent" },
];

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

const privacyTypes: PrivacyType[] = [
  {
    name: "An Entire Place",
    description: "Guests will have the entire place to themselves.",
    icon: "Home",
  },
  {
    name: "A room",
    description:
      "Guests will have their own room in a home, plus shared access to spaces",
    icon: "Bed",
  },
  {
    name: "A shared room in a hostel",
    description:
      "Guests sleep in a shared room in a professionally managed hostel with staff onsite 24/7",
    icon: "Users",
  },
];

function toSlug(s: string) {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[’'`]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function seedPrivacyTypes() {
  console.log("🌱 Seeding privacy types...");

  for (const { name, icon, description } of privacyTypes) {
    const slug = toSlug(name);

    await prisma.privacyType.upsert({
      where: { name },
      update: { slug, icon, description },
      create: { name, slug, icon, description },
    });
  }

  console.log("✅ Privacy types seeded.");
}

async function seedCategories() {
  console.log("🌱 Seeding categories...");

  for (const { name, icon } of categories) {
    const slug = toSlug(name);

    await prisma.category.upsert({
      where: { name },
      update: { slug, icon },
      create: { name, slug, icon },
    });
  }

  console.log("✅ Categories seeded.");
}

async function seedAmenities() {
  console.log("🌱 Seeding amenities...");

  await Promise.all(
    amenities.map((amenity) =>
      prisma.amenity.upsert({
        where: { name: amenity.name },
        update: amenity,
        create: amenity,
      }),
    ),
  );

  console.log(`✅ ${amenities.length} amenities seeded.`);
}

async function main() {
  console.log("🚀 Starting database seed...");

  await seedCategories();
  await seedPrivacyTypes();
  await seedAmenities();

  console.log("🎉 Database seeding completed successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
