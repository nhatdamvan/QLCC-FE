import React from 'react';
import { useAuthUser } from '@crema/hooks/AuthHooks';
import { Formik } from 'formik';
import * as yup from 'yup';
import SettingDetailForm from './SettingDetail';
import PropTypes from 'prop-types';
import jwtAxios from "@crema/services/auth/JWT";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
});
const SettingDetail = ({ settingConfig }) => {
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();
  const handleSettingConfig = (data) => {

    const newData = {
      ...data,
    };
  jwtAxios
      .post("saveConfig", newData)
      .then(() => {
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
      });
  };
  return (
    <Formik
        validateOnBlur={true}
        initialValues={settingConfig}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          //TODO Api Call here to save user info         
          handleSettingConfig(data);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => <SettingDetailForm values={values} setFieldValue={setFieldValue} />}
      </Formik>
  );
};

export default SettingDetail;

SettingDetail.propTypes = {
  settingConfig: PropTypes.object,
};
