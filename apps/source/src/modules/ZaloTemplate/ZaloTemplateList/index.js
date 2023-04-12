import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import ZaloHeader from "./ZaloHeader";
import ZaloView from "./ZaloView";

const ZaloTemplateListing = () => {
  return (
    <>
      <AppsHeader>
        <ZaloHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <ZaloView />
      </AppsContent>
    </>
  );
};

export default ZaloTemplateListing;
