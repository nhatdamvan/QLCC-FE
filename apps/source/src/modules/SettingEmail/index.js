import AppsContainer from "@crema/components/AppsContainer";
import { useIntl } from "react-intl";
import EmailTemplatesContexProvider from "./context/EmailTemplateContextProvider";
import EmailTemplateListing from "./EmailTemplateList";

const EmailTemplates = () => {
  const { messages } = useIntl();

  return (
    <EmailTemplatesContexProvider>
      <AppsContainer title={messages['email.title']}>
        <EmailTemplateListing />
      </AppsContainer>
    </EmailTemplatesContexProvider>
  );
};

export default EmailTemplates;