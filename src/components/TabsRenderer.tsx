"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TabsRenderer = ({
  tabs,
}: {
  tabs: {
    trigger: string;
    slug: string;
    content: React.JSX.Element;
  }[];
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || tabs[0].slug;
  const handleTabChange = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    router.push(`?${params.toString()}`);
  };

  return (
    <Tabs className="" value={activeTab} onValueChange={handleTabChange}>
      <div></div>
      <TabsList className="">
        {tabs.map(({ trigger, slug }) => (
          <TabsTrigger key={slug} value={slug}>
            {trigger}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ trigger, content, slug }) => (
        <TabsContent key={slug} value={slug}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsRenderer;
