import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import ZaloTemplatesContexProvider from "./context/ZaloTemplateContextProvider";
import ZaloTemplateListing from "./ZaloTemplateList";

const ZaloTemplates = () => {
  const { messages } = useIntl();

  return (
    <ZaloTemplatesContexProvider>
      <AppsContainer title={messages['zalo.title']}>
        <ZaloTemplateListing />
      </AppsContainer>
    </ZaloTemplatesContexProvider>
  );
};

export default ZaloTemplates;