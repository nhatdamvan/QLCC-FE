import MarketingContextProvider from "./context/MarketingContextProvider";
import AppsContainer from "@crema/components/AppsContainer";
import MarketingListing from "./MarketingListing";
import { useIntl } from "react-intl";

const Marketing = () => {
  const { messages } = useIntl();

  return (
    <MarketingContextProvider>
      <AppsContainer title={messages["maketing.title"]}>
        <MarketingListing />
      </AppsContainer>
    </MarketingContextProvider>
  );
};

export default Marketing;
