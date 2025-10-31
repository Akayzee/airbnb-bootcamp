import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export const GET = async (
  req: Request,
  { params }: { params: { listingId: string } }
) => {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id: params.listingId },
    });

    if (!listing) {
      return new Response("Listing not found", { status: 404 });
    }

    return new Response(JSON.stringify(listing), { status: 200 });
  } catch (error) {
    console.error("Error fetching listing:", error);
    return new Response("Error fetching listing", { status: 500 });
  }
};

export const POST = async (
  req: Request,
  { params }: { params: Promise<{ listingId: string }> }
) => {
  try {
    const { listingId } = await params;
    const data = await req.json();
    const updatedListing = await prisma.listing.update({
      where: { id: listingId },
      data,
    });

    if (!updatedListing) {
      return new Response("Cannot update listing", { status: 400 });
    }
    revalidatePath(`/become-a-host/${listingId}/structure`);

    return new Response(JSON.stringify(updatedListing), { status: 200 });
  } catch (error) {
    console.error("Error updating listing:", error);
    return new Response("Error updating listing", { status: 500 });
  }
};
