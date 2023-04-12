import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import PermissionsContextProvider from "./context/PermissionsContextProvider";
import PermissonListing from "./PermissionsList";

const Permissions = () => {
  const { messages } = useIntl();

  return (
    <PermissionsContextProvider>
      <AppsContainer title={messages['permissions.title']}>
        <PermissonListing />
      </AppsContainer>
    </PermissionsContextProvider>
  );
};

export default Permissions;
