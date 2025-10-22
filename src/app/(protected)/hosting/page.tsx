import { Button } from "@/components/ui/button";
import React from "react";
import HostingClient from "./HostingClient";

type Props = {};

const page = (props: Props) => {
  const todaysReservations = [{}];
  const upcomingReservations = [{}];

  return (
    <HostingClient
      todaysReservations={todaysReservations}
      upcomingReservations={upcomingReservations}
    />
  );
};

export default page;
