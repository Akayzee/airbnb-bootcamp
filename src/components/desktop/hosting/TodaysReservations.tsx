import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
  reservations: object[];
};

const TodaysReservations = ({ reservations }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-30">
      <div>
        <Image
          src="/images/rai.avif"
          alt="book-reservation"
          height={300}
          width={300}
          className="object-cover"
        />
      </div>

      <p className="text-xl font-extrabold text-gray-800">
        You do not have any reservations
      </p>
      {/* <p className="text-sm">
        Your place wont appear in search results and cant be booked.
      </p> */}
      <Link href="/hosting/listings" className="mt-10 mb-50">
        <Button
          className="bg-gray-300 hover:bg-gray-300 text-gray-600 hover:cursor-pointer"
          size="lg"
        >
          Go to listings
        </Button>
      </Link>
      <Link
        href="/hosting/reservations"
        className="text-sm text-muted-foreground underline mb-30"
      >
        See all reservations
      </Link>
    </div>
  );
};

export default TodaysReservations;
