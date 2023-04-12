import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import CategoryContexProvider from "./context/CategoriesContextProvider";
import CategoryListing from "./categoryList";

const EmailTemplates = () => {
  const { messages } = useIntl();

  return (
    <CategoryContexProvider>
      <AppsContainer title={messages['category.title']}>
        <CategoryListing />
      </AppsContainer>
    </CategoryContexProvider>
  );
};

export default EmailTemplates;