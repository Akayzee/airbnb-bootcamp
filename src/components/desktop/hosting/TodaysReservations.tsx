import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {
  reservations: object[];
};

const TodaysReservations = ({ reservations }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-72 w-72 md:h-48 md:w-48">
        <Image
          src="/images/rai.avif"
          alt="book-reservation"
          height={500}
          width={500}
          className="object-cover"
        />
      </div>

      <p className="text-xl font-extrabold text-gray-800">
        You do not have any reservations
      </p>
      {/* <p className="text-sm">
        Your place wont appear in search results and cant be booked.
      </p> */}
      <Link href="/hosting/listings" className="mt-10">
        <Button
          className="bg-gray-300 hover:bg-gray-300 text-gray-600 hover:cursor-pointer"
          size="lg"
        >
          Go to listings
        </Button>
      </Link>
    </div>
  );
};

export default TodaysReservations;
