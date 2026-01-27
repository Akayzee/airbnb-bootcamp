import { getListingWithRelations } from "@/db/listing";
import ListingClient from "./ListingClient";

const ListingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const listing = await getListingWithRelations(id);

  if (!listing) {
    return <>Listing Not Found</>;
  }

  if (listing.photos.length === 0) {
    return <div>Upload a photo to your listing</div>;
  }

  return <ListingClient listing={listing} />;
};

export default ListingPage;
