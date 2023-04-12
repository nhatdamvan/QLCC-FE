import AppsContent from "@crema/components/AppsContent";
import AppsHeader from "@crema/components/AppsHeader";
import SmsHeader from "./SmsHeader";
import SmsView from "./SmsView";

const SmsTemplateListing = () => {
  return (
    <>
      <AppsHeader>
        <SmsHeader />
      </AppsHeader>

      <AppsContent
        sx={{
          paddingTop: 2.5,
          paddingBottom: 2.5,
        }}
      >
        <SmsView />
      </AppsContent>
    </>
  );
};

export default SmsTemplateListing;
