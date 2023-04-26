import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
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
import { getData, postData, putData } from "@crema/hooks/APIHooks";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    }
  }, []);

  const getDataDetail = async () => {
    getData(`user/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
        setSelectedRoles(data.Roles);
        setSelectedUserGroup(data.UserGroups ? [data.UserGroups] : []);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreateUser = (data) => {
    postData("user", infoViewActionsContext, {
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
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEditUser = (data) => {
    putData("user", infoViewActionsContext, {
      ...data,
      id: id,
      Roles: selectedRoles.map((item) => item.id),
      UserGroups: selectedUserGroup[0]?.id || undefined,
      AvatarFile: data.AvatarFile || undefined,
    })
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
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
          {!(id === "Create" ? true : data) ? (
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
                Address: data?.Address ? data?.Address : "",
                AvatarPreview: data?.AvatarFile
                  ? `https://crmic2-dev.vercel.app/file/${data?.AvatarFile}`
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
