import React, { useEffect, useState } from "react";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import { Formik } from "formik";
import * as yup from "yup";
import PersonalInfoForm from "./PersonalInfoForm";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import jwtAxios from "@crema/services/auth/JWT";
import AppLoader from "@crema/components/AppLoader";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";

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

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  useEffect(() => {
    if (user?.id) {
      getData(user?.id);
    }
  }, []);

  const getData = async (id) => {
    try {
      setLoading(true);
      const dataResult = await jwtAxios.get(`user/${id}`);
      setData(dataResult.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (data) => {
    setLoadingSubbmit(true);
    jwtAxios
      .put("user", data)
      .then((response) => {
        infoViewActionsContext.showMessage(response?.data?.Message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: 550,
      }}
    >
      {loading ? (
        <AppLoader />
      ) : (
        <Formik
          validateOnBlur={true}
          initialValues={{
            id: data.id ? data.id : "",
            Username: data.Username ? data.Username : "",
            Name: data.Name ? data.Name : "",
            Email: data.Email ? data.Email : "",
            Phonenumber: data.Phonenumber ? data.Phonenumber : "",
            Roles: data.Roles ? data.Roles.map((item) => item.id) : undefined,
            UserGroups: data.Roles ? data.UserGroups.id : undefined,
            AvatarPreview: data.AvatarFile ? getUrlImage(data.AvatarFile) : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            handleEditUser(data);
          }}
        >
          {({ values, setFieldValue }) => {
            return (
              <PersonalInfoForm
                values={values}
                setFieldValue={setFieldValue}
                loadingSubmit={loadingSubmit}
              />
            );
          }}
        </Formik>
      )}
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.string,
};
