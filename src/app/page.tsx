import Container from "@/components/Container";
import ListingsGroup from "@/components/listings/ListingsGroup";
import { HomePageListingsGroupInfo } from "@/lib/constants";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div>
      {HomePageListingsGroupInfo.map((group) => (
        <ListingsGroup
          key={group.location}
          location={group.location}
          header={group.header}
          listings={group.listings}
        />
      ))}
    </div>
  );
};

export default HomePage;
