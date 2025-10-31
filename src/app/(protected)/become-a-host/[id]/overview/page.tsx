import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const GetStartedSteps = [
  {
    step: 1,
    title: "Tell us about your place",
    description:
      "Share some basic info, like where it is and how many guests can stay.",
    image: "/images/bed1.png",
  },
  {
    step: 2,
    title: "Make it stand out",
    description: "Add 5 or more photos plus a title and description.",
    image: "/images/desk1.png",
  },
  {
    step: 3,
    title: "Finish up and publish",
    description:
      "Choose a starting price, verify a few details, then publish your listing.",
    image: "/images/door1.png",
  },
];

const OverviewPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <div className="h-screen md:h-[80vh] flex flex-col overflow-hidden ">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-1  min-h-0 ">
        <div className="text-5xl md:text-5xl font-bold self-center p-4 ">
          It is easy to get started on Airbnb
        </div>
        <div className="self-center ">
          {GetStartedSteps.map((step, index) => (
            <div className="flex flex-col p-4" key={step.step}>
              <div className="flex justify-around gap-3">
                <div className="text-gray-800 font-bold text-lg">
                  {step.step}
                </div>
                <div className="flex flex-col w-full">
                  <div className="text-gray-800 font-bold text-lg">
                    {step.title}
                  </div>
                  <div className="text-muted-foreground w-full leading-tight ">
                    {step.description}
                  </div>
                </div>

                <Image
                  src={step.image}
                  alt={step.title}
                  width={150}
                  height={150}
                />
              </div>
              {index === GetStartedSteps.length - 1 ? null : (
                <hr className="mt-3" />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg z-50">
        <Progress value={0} className="mt-5" />
        <div className="mt-5 flex md:justify-end">
          <Link href={`/become-a-host/${id}/about-your-place`}>
            <Button size="lg" className="w-full md:w-32 hover:cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
