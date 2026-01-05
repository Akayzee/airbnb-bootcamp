import CreateListingFooter from "@/components/listings/CreateListingFooter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Metadata } from "next";
import { SearchParams } from "next/dist/server/request/search-params";
import Link from "next/link";
import React from "react";
import StandOutClient from "./StandOutClient";

type Props = {};

export const metadata: Metadata = {
  title: "Step 1: Tell Us About Your Place | Become a Host",
  description: "Book your vacations and stay anywhere you want",
};

const StandOut = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <StandOutClient id={id} />;
};

export default StandOut;
