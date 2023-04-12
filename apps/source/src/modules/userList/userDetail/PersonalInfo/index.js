import React from "react";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import jwtAxios from "@crema/services/auth/JWT";

const validationSchema = yup.object({
  Email: yup.string().email("Invalid email format").required("Required"),
});
const PersonalInfo = ({ user }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleSubmit = (data) => {
    jwtAxios
      .put("/user", data)
      .then((response) => {
        infoViewActionsContext.showMessage("Edit customer info successfull!");
      })
      .catch((error) => {
        console.log(error, "error");
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={{
          ...user,
          avatarShow: user.AvatarFile
            ? `https://crmic2-dev.vercel.app/file/${user.AvatarFile}`
            : "https://crmic2-dev.vercel.app/file/640994fd3dcffe32d3ef6986",
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(data);
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <PersonalInfoForm
            values={values}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
          />
        )}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  customer: PropTypes.object,
};
