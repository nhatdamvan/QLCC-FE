import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import CustomerHeader from "./CustomerHeader";
import CustomerView from "./CustomerView";

const CustomerListing = () => {
  return (
    <>
      <AppsHeader>
        <CustomerHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <CustomerView />
      </AppsContent>
    </>
  );
};

export default CustomerListing;
