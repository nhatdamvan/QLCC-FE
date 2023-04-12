import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import RolesHeader from "./RolesHeader";
import RolesView from "./RolesView";

const RolesListing = () => {
  return (
    <>
      <AppsHeader>
        <RolesHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <RolesView />
      </AppsContent>
    </>
  );
};

export default RolesListing;
