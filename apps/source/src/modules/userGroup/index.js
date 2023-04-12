import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import UserGroupContexProvider from "./context/UserGroupContextProvider";
import UserGroupListing from "./userGroupList";

const UserGroup = () => {
  const { messages } = useIntl();

  return (
    <UserGroupContexProvider>
      <AppsContainer title={messages['userGroup.title']}>
        <UserGroupListing />
      </AppsContainer>
    </UserGroupContexProvider>
  );
};

export default UserGroup;