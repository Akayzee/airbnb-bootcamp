"use client";
import { Tabs } from "@/lib/constants";
import Link from "next/link";
import React, { useState } from "react";

type Props = {};

const FutureGetAways = (props: Props) => {
  const [activeTab, setActiveTab] = useState(Tabs[0].name);
  const activeTabContent = Tabs.find((tab) => tab.name === activeTab);

  return (
    <div>
      <div className="font-bold text-lg text-gray-900">
        Inspiration for future getaways
      </div>
      <div>
        <div className="flex gap-6 mt-4">
          {Tabs.map((tab) => (
            <div
              className={`cursor-pointer text-sm pt-3 pb-3 text-gray-600 hover:text-gray-900 ${
                activeTab === tab.name
                  ? "font-bold text-gray-900 border-b-2 border-black"
                  : ""
              }`}
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
            >
              {" "}
              {tab.name}{" "}
            </div>
          ))}
        </div>
        {activeTabContent && (
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {activeTabContent.links.map((link) => (
              <Link key={link.label} className="mb-4" href={link.path}>
                <p className="font-semibold text-sm text-gray-900">
                  {link.label}
                </p>
                <p className="text-xs text-gray-600">{link.description}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FutureGetAways;
