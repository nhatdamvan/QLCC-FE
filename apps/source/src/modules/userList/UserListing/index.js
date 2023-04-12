import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import UserHeader from "./UserHeader";
import UserView from "./UserView";

const UserListing = () => {
  return (
    <>
      <AppsHeader>
        <UserHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <UserView />
      </AppsContent>
    </>
  );
};

export default UserListing;
