import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import CustomerContextProvider from "./context/CustomerContextProvider";
import CustomerListing from "./CustomerListing";

const Customer = () => {
  const { messages } = useIntl();

  return (
    <CustomerContextProvider>
      <AppsContainer title={messages['customer.title']}>
        <CustomerListing />
      </AppsContainer>
    </CustomerContextProvider>
  );
};

export default Customer;
