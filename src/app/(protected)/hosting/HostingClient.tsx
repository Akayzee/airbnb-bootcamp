"use client";
import TodaysReservations from "@/components/desktop/hosting/TodaysReservations";
import UpcomingReservations from "@/components/desktop/hosting/UpcomingReservations";
import TabsRenderer from "@/components/TabsRenderer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  todaysReservations: object[];
  upcomingReservations: object[];
};

const HostingClient = ({ todaysReservations, upcomingReservations }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    {
      trigger: "Today",
      slug: "today",
      content: <TodaysReservations reservations={todaysReservations} />,
    },
    {
      trigger: "Upcoming",
      slug: "upcoming",
      content: <UpcomingReservations reservations={upcomingReservations} />,
    },
  ];
  const [activeTab, setActiveTab] = useState(
    searchParams.get("tab") || tabs[0].slug
  );
  const activeTabContent = tabs.find((tab) => tab.slug === activeTab);
  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center gap-3">
        <div className="flex gap-3">
          {tabs.map((tab) => (
            <Button
              className={`cursor-pointer rounded-3xl bg-gray-300 text-md p-6 text-gray-600 hover:bg-gray-300 ${
                activeTab === tab.slug
                  ? "font-bold text-white bg-gray-800 hover:bg-gray-800"
                  : ""
              }`}
              key={tab.slug}
              onClick={() => {
                setActiveTab(tab.slug);
                handleTabChange(tab.slug);
              }}
              size="lg"
            >
              {" "}
              {tab.trigger}{" "}
            </Button>
          ))}
        </div>
      </div>
      {activeTabContent && (
        <div className="mt-6">{activeTabContent.content}</div>
      )}
    </div>
  );
};

export default HostingClient;
