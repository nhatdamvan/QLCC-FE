import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import UserGroupContextProvider from "../../userGroup/context/UserGroupContextProvider";
import UserForm from "./UserForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import RolesContextProvider from "../../roles/context/RolesContextProvider";

const validationSchema = yup.object({
  Username: yup.string().required("Required"),
  Name: yup.string().required("Required"),
  Email: yup.string().email("Invalid email format").required("Required"),
  Phonenumber: yup.string().required("Required"),
});

const CreateUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [selectedUserGroup, setSelectedUserGroup] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id !== "Create") {
      getData();
    }
  }, []);

  const getData = async () => {
    try {
      setLoading(true);
      const dataResult = await jwtAxios.get(`user/${id}`);
      setData(dataResult.data.data);
      setSelectedRoles(dataResult.data.data.Roles);
      setSelectedUserGroup(
        dataResult.data.data.UserGroups ? [dataResult.data.data.UserGroups] : []
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateUser = (data) => {
    setLoadingSubbmit(true);
    jwtAxios
      .post("user", {
        ...data,
        Roles: selectedRoles.map((item) => item.id),
        UserGroups: selectedUserGroup[0]?.id || undefined,
        AvatarFile: data.AvatarFile || undefined,
      })
      .then(() => {
        navigate("/user-manager");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        console.log(error, "eror");
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  const handleEditUser = (data) => {
    setLoadingSubbmit(true);

    jwtAxios
      .put("user", {
        ...data,
        id: id,
        Roles: selectedRoles.map((item) => item.id),
        UserGroups: selectedUserGroup[0]?.id || undefined,
        AvatarFile: data.AvatarFile || undefined,
      })
      .then(() => {
        navigate("/user-manager");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  return (
    <UserGroupContextProvider>
      <RolesContextProvider>
        <Box
          sx={{
            cursor: "pointer",
          }}
          component="span"
          mr={{ xs: 2, sm: 4 }}
          mb={4}
          onClick={() => navigate(-1)}
        >
          <AppTooltip title={<IntlMessages id="common.back" />}>
            <ArrowBackIcon
              sx={{
                color: "text.secondary",
              }}
            />
          </AppTooltip>
        </Box>
        <Card>
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
                Address: data.Address ? data.Address : "",
                AvatarPreview: data.AvatarFile
                  ? `https://crmic2-dev.vercel.app/file/${data.AvatarFile}`
                  : "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data) => {
                if (id === "Create") {
                  handleCreateUser(data);
                } else {
                  handleEditUser(data);
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <UserForm
                  values={values}
                  setFieldValue={setFieldValue}
                  selectedUserGroup={selectedUserGroup}
                  setSelectedUserGroup={setSelectedUserGroup}
                  loadingSubmit={loadingSubmit}
                  selectedRoles={selectedRoles}
                  setSelectedRoles={setSelectedRoles}
                />
              )}
            </Formik>
          )}
        </Card>
      </RolesContextProvider>
    </UserGroupContextProvider>
  );
};

export default CreateUser;
