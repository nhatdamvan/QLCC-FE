import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PermissionForm from "./AddPermissionsForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as yup from "yup";
import AppInfoView from "@crema/components/AppInfoView";
import { getData, postData, putData } from "@crema/hooks/APIHooks";

const validationSchema = yup.object({});

const CreatePermission = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [codePermission, setCodePermission] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodePermission();
    }
  }, []);

  const getDataDetail = () => {
    getData(`permission/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodePermission = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "PER",
    })
      .then(({ data }) => {
        setCodePermission(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreatePermission = (data) => {
    postData("permission", infoViewActionsContext, data)
      .then(() => {
        navigate("/Permissions/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEditPermission = (data) => {
    putData("permission", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const loading = useMemo(
    () => !(id === "Create" ? codePermission : detail),
    [codePermission, detail, id]
  );

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/Permissions/List");
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
      <Card>
        {loading ? (
          <AppLoader />
        ) : (
          <Formik
            validateOnBlur={true}
            initialValues={{
              id: detail?.id ? detail?.id : "",
              Code: detail?.Code ? detail?.Code : codePermission,
              Name: detail?.Name ? detail?.Name : "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              if (id === "Create") {
                handleCreatePermission(data);
              } else {
                handleEditPermission(data);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <PermissionForm values={values} setFieldValue={setFieldValue} />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};
export default CreatePermission;
