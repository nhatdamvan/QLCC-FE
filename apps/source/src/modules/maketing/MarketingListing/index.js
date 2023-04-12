import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import MarketingHeader from "./MarketingHeader";
import MarketingView from "./MarketingView";

const MarketingListing = () => {
  return (
    <>
      <AppsHeader>
        <MarketingHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          py: 2.5,
          width: "100%",
        }}
      >
        <MarketingView />
      </AppsContent>
    </>
  );
};

export default MarketingListing;
