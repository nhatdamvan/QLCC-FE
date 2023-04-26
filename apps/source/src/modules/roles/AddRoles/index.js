import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RolesForm from "./AddRolesForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PermissionsContextProvider from "../../permissions/context/PermissionsContextProvider";
import * as yup from "yup";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({});

const CreateRoles = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [codeRole, setCodeRole] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeRole();
    }
  }, []);

  const getDataDetail = async () => {
    getData(`role/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
        setSelectedPermissions(data.Permissions ? data.Permissions : []);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeRole = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "ROLE",
    })
      .then(({ data }) => {
        setCodeRole(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreateRoles = (data) => {
    const newData = {
      ...data,
      Permissions: selectedPermissions.map((item) => item.id),
    };

    postData("role", infoViewActionsContext, newData)
      .then(() => {
        navigate("/Roles/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEditRoles = (data) => {
    const newData = {
      ...data,
      Permissions: selectedPermissions.map((item) => item.id),
    };

    putData("role", infoViewActionsContext, newData)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeRole : data),
    [codeRole, data, id]
  );

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/Roles/List");
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
        onClick={handleBack}
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
          {loading ? (
            <AppLoader />
          ) : (
            <Formik
              validateOnBlur={true}
              initialValues={{
                id: data?.id ? data?.id : "",
                Code: data?.Code ? data?.Code : codeRole,
                Name: data?.Name ? data?.Name : "",
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
                  selectedPermissions={selectedPermissions}
                  setSelectedPermissions={setSelectedPermissions}
                />
              )}
            </Formik>
          )}
        </Card>
        <AppInfoView />
      </PermissionsContextProvider>
    </>
  );
};

export default CreateRoles;
