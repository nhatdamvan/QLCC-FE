import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import RolesContextProvider from "./context/RolesContextProvider";
import RolesListing from "./RolesList";

const Roles = () => {
  const { messages } = useIntl();

  return (
    <RolesContextProvider>
      <AppsContainer title={messages['roles.title']}>
        <RolesListing />
      </AppsContainer>
    </RolesContextProvider>
  );
};

export default Roles;
