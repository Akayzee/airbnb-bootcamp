import { auth } from "@/auth";
import React from "react";
import ListingsClient from "./ListingsClient";

type Props = {};

const HostingListings = async (props: Props) => {
  const session = await auth();

  if (!session) {
    return "You are not logged In ";
  }

  return (
    <div>
      <ListingsClient />
    </div>
  );
};

export default HostingListings;
