import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import UserContextProvider from "./context/UserContextProvider";
import UserListing from "./UserListing";

const User = () => {
  const { messages } = useIntl();

  return (
    <UserContextProvider>
      <AppsContainer title={messages['user.title']}>
        <UserListing />
      </AppsContainer>
    </UserContextProvider>
  );
};

export default User;
