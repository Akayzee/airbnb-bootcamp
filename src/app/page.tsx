import ListingsGroup from "@/components/listings/ListingsGroup";
import { HomePageListingsGroupInfo } from "@/lib/constants";

export default function Home() {
  return (
    <div>
      {HomePageListingsGroupInfo.map((listingGroup) => (
        <ListingsGroup
          key={listingGroup.header}
          location={listingGroup.location}
          header={listingGroup.header}
          listings={listingGroup.listings}
        />
      ))}
    </div>
  );
}
