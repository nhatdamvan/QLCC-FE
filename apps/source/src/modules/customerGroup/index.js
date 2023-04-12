import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import CustomerGroupContextProvider from "./Context/CustomerGroupContexProvider";
import CustomerGroupListing from "./CustomerGroupList";

const CustomerGroup = () => {
  const { messages } = useIntl();

  return (
    <CustomerGroupContextProvider>
      <AppsContainer title={messages['customerGroup.title']}>
        <CustomerGroupListing />
      </AppsContainer>
    </CustomerGroupContextProvider>
  );
};

export default CustomerGroup;
