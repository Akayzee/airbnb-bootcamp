import { getListingWithRelations } from "@/db/listing";
import ListingClient from "./ListingClient";

const ListingPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const listing = await getListingWithRelations(id);

  if (!listing) {
    return <>Listing Not Found</>;
  }

  return <ListingClient listing={listing} />;
};

export default ListingPage;
