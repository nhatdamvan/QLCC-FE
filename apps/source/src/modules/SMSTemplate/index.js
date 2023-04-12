import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import SmsTemplatesContexProvider from "./context/SmsTemplateContextProvider";
import SmsTemplateListing from "./SMSTemplateList";

const SmsTemplates = () => {
  const { messages } = useIntl();

  return (
    <SmsTemplatesContexProvider>
      <AppsContainer title={messages['sms.title']}>
        <SmsTemplateListing />
      </AppsContainer>
    </SmsTemplatesContexProvider>
  );
};

export default SmsTemplates;