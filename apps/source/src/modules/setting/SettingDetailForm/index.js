import { Formik } from "formik";
import * as yup from "yup";
import SettingDetailForm from "./SettingDetail";
import PropTypes from "prop-types";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { postData } from "@crema/hooks/APIHooks";

const validationSchema = yup.object({});

const SettingDetail = ({ settingConfig }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleSettingConfig = (data) => {
    const newData = {
      ...data,
    };
    postData("saveConfig", infoViewActionsContext, newData, true)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Formik
      validateOnBlur={true}
      initialValues={settingConfig}
      validationSchema={validationSchema}
      onSubmit={(data) => {
        handleSettingConfig(data);
      }}
    >
      {() => <SettingDetailForm />}
    </Formik>
  );
};

export default SettingDetail;

SettingDetail.propTypes = {
  settingConfig: PropTypes.object,
};
