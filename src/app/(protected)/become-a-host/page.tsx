import React from "react";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

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

const page = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2  ">
        <div className="text-4xl md:text-6xl font-bold self-center p-4">
          It is easy to get started on Airbnb
        </div>
        <div>
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
                  <div className="text-muted-foreground w-full ">
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
      <Progress value={0} className="mt-5" />
      <div className="mt-5 flex md:justify-end">
        <Button size="lg" className="w-full md:w-32 hover:cursor-pointer">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default page;
