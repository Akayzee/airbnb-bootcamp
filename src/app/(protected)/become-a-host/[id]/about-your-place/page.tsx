import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Metadata } from "next";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import React from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Step 1: Tell Us About Your Place | Become a Host",
  description: "Book your vacations and stay anywhere you want",
};

const AboutYourPlace = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <div className="h-screen md:h-[80vh] flex flex-col  overflow-hidden ">
        <div className="grid grid-cols-1 md:grid-cols-2 flex-1  min-h-0 ">
          <div className="self-center p-4 order-2 md:order-1">
            <div>Step 1</div>
            <h1 className="text-4xl font-bold mt-3 ">
              Tell us about your place
            </h1>
            <p className="mt-3 text-gray-600">
              In this step, we will ask you which type of property you have and
              if guests will book the entire place or just a room. Then let us
              know the location and how many guests can stay.
            </p>
          </div>
          <div className="self-center order-1 md:order-2">
            <video autoPlay muted>
              <source src="/videos/about-your-place.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <CreateListingFooter
          nextHref={`/become-a-host/${id}/structure`}
          backHref={`/become-a-host/${id}/overview`}
          prevProgress={0}
          nextProgress={0}
        />
      </div>
    </div>
  );
};

export default AboutYourPlace;
