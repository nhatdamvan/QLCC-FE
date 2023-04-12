import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import UserGroupHeader from "./UserGroupHeader";
import UserGroupView from "./UserGroupView";

const UserGroupListing = () => {
  return (
    <>
      <AppsHeader>
        <UserGroupHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <UserGroupView />
      </AppsContent>
    </>
  );
};

export default UserGroupListing;
