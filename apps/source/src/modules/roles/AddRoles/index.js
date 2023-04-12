import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RolesForm from "./AddRolesForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PermissionsContextProvider from "../../permissions/context/PermissionsContextProvider";

import * as yup from "yup";
const validationSchema = yup.object({});
const CreateRoles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [codeRole, setCodeRole] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    if (id !== "Create") {
      getData();
    } else {
      getCodeRole();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const dataResult = await jwtAxios.get(`role/${id}`);
      setData(dataResult.data.data);
      setSelectedPermissions(
        dataResult.data.data.Permissions ? dataResult.data.data.Permissions : []
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCodeRole = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "ROLE",
      })
      .then((request) => {
        setCodeRole(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const handleCreateRoles = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      Permissions: selectedPermissions.map((item) => item.id),
    };
    jwtAxios
      .post("role", newData)
      .then(() => {
        // reCallAPI();
        navigate("/Roles/List");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  const handleEditRoles = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      Permissions: selectedPermissions.map((item) => item.id),
    };
    jwtAxios
      .put("role", newData)
      .then(() => {
        // reCallAPI();
        navigate("/Roles/List");
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
    <>
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
      <PermissionsContextProvider>
        <Card>
          {loadingGetCode || loading ? (
            <AppLoader />
          ) : (
            <Formik
              validateOnBlur={true}
              initialValues={{
                id: data.id ? data.id : "",
                Code: data.Code ? data.Code : codeRole,
                Name: data.Name ? data.Name : "",
              }}
              validationSchema={validationSchema}
              onSubmit={(data) => {
                if (id === "Create") {
                  handleCreateRoles(data);
                } else {
                  handleEditRoles(data);
                }
              }}
            >
              {({ values, setFieldValue }) => (
                <RolesForm
                  values={values}
                  setFieldValue={setFieldValue}
                  loadingSubmit={loadingSubmit}
                  selectedPermissions={selectedPermissions}
                  setSelectedPermissions={setSelectedPermissions}
                />
              )}
            </Formik>
          )}
        </Card>
      </PermissionsContextProvider>
    </>
  );
};

export default CreateRoles;
