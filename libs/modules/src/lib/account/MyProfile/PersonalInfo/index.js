import { useEffect, useState } from "react";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import AppLoader from "@crema/components/AppLoader";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { getData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({
  Username: yup.string().required("Required"),
  Name: yup.string().required("Required"),
  Email: yup.string().email("Invalid email format").required("Required"),
  Phonenumber: yup.string().required("Required"),
});

const getUrlImage = (id) => process.env.NX_API_FILE + id;

const PersonalInfo = () => {
  const { user } = useAuthUser();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [data, setData] = useState(null);

  useEffect(() => {
    if (user?.id) {
      getDataDetail(user?.id);
    }
  }, []);

  const getDataDetail = (id) => {
    getData(`user/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEditUser = (data) => {
    putData("user", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      {!data ? (
        <AppLoader />
      ) : (
        <Formik
          validateOnBlur={true}
          initialValues={{
            id: data?.id ? data?.id : "",
            Username: data?.Username ? data?.Username : "",
            Name: data?.Name ? data?.Name : "",
            Email: data?.Email ? data?.Email : "",
            Phonenumber: data?.Phonenumber ? data?.Phonenumber : "",
            AvatarPreview: data?.AvatarFile
              ? getUrlImage(data?.AvatarFile)
              : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            handleEditUser(data);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <PersonalInfoForm values={values} setFieldValue={setFieldValue} />
            );
          }}
        </Formik>
      )}
      <AppInfoView />
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
