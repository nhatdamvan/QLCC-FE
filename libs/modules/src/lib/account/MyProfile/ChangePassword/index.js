import { Box, Typography } from "@mui/material";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Fonts } from "@crema/constants/AppEnums";
import ChangePasswordForm from "./ChangePasswordForm";
import { Formik } from "formik";
import * as yup from "yup";
import { postData } from "@crema/hooks/APIHooks";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";

const validationSchema = yup.object({
  oldPassword: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  newPassword: yup
    .string()
    .required("New password required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  retypeNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match"),
});

const ChangePassword = () => {
  const infoViewActionsContext = useInfoViewActionsContext();

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 5 },
        }}
      >
        <IntlMessages id="common.changePassword" />
      </Typography>
      <Formik
        validateOnChange={false}
        validateOnBlur={true}
        initialValues={{
          oldPassword: "",
          newPassword: null,
          retypeNewPassword: "us",
        }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          postData("changePassword", infoViewActionsContext, {
            PasswordOld: data.oldPassword,
            PasswordNew: data.newPassword,
            PasswordNewConfirm: data.retypeNewPassword,
          })
            .then(() => {
              infoViewActionsContext.showMessage(message);
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });
        }}
      >
        {() => <ChangePasswordForm />}
      </Formik>
    </Box>
  );
};

export default ChangePassword;
