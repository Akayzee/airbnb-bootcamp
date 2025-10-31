import { auth } from "@/auth";
import React from "react";
import ListingsClient from "./ListingsClient";
import { getUserListings } from "@/db/listing";

type Props = {};

const HostingListings = async (props: Props) => {
  const session = await auth();

  if (!session) {
    return "You are not logged In ";
  }

  const userId = session.user?.id;
  if (!userId) {
    return "User id not found";
  }

  const listings = await getUserListings(userId);

  return (
    <div>
      <ListingsClient listings={listings} />
    </div>
  );
};

export default HostingListings;
