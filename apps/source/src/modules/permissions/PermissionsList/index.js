import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import PermissionsHeader from "./PermissionsHeader";
import PermissionsView from "./PermissionsView";

const PermissionsListing = () => {
  return (
    <>
      <AppsHeader>
        <PermissionsHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <PermissionsView />
      </AppsContent>
    </>
  );
};

export default PermissionsListing;
