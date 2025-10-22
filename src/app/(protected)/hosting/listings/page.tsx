import { auth } from "@/auth";
import React from "react";

type Props = {};

const HostingListings = async (props: Props) => {
  const session = await auth();

  if (!session) {
    return "You are not logged In ";
  }

  return <div>{JSON.stringify(session.user)}</div>;
};

export default HostingListings;
