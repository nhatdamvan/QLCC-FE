import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import EmailHeader from "./EmailHeader";
import EmailView from "./EmailView";

const EmailTemplateListing = () => {
  return (
    <>
      <AppsHeader>
        <EmailHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <EmailView />
      </AppsContent>
    </>
  );
};

export default EmailTemplateListing;
