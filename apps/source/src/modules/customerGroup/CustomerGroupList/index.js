import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import CustomerGroupHeader from "./CustomerGroupHeader";
import CustomerGroupView from "./CustomerGroupView";

const CustomerGroupListing = () => {
  return (
    <>
      <AppsHeader>
        <CustomerGroupHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <CustomerGroupView />
      </AppsContent>
    </>
  );
};

export default CustomerGroupListing;
