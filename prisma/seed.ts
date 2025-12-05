import { prisma } from "../src/lib/prisma";

type Cat = { name: string; icon: string };

type PrivacyType = { name: string; description: string; icon: string };

const categories: Cat[] = [
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

async function main() {
  console.log("🌱 Seeding privacyTypes with slugs and icons...");

  for (const { name, icon, description } of privacyTypes) {
    const slug = toSlug(name);

    await prisma.privacyType.upsert({
      where: { name },
      update: { slug, icon, description },
      create: { name, slug, icon, description },
    });
  }

  console.log("✅ privacy Types  seeded.");
}

// async function main() {
//   console.log("🌱 Seeding categories with slugs and icons...");

//   for (const { name, icon } of categories) {
//     const slug = toSlug(name);

//     await prisma.category.upsert({
//       where: { name },
//       update: { slug, icon },
//       create: { name, slug, icon },
//     });
//   }

//   console.log("✅ Categories seeded.");
// }

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
