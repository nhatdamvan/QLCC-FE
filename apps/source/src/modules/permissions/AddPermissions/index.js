import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PermissionForm from "./AddPermissionsForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import * as yup from "yup";
const validationSchema = yup.object({});
const CreatePermission = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [codePermission, setCodePermission] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodePermission();
    }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`permission/${id}`);
      setDetail(dataResult.data.data);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const getCodePermission = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "PER",
      })
      .then((request) => {
        setCodePermission(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const handleCreatePermission = (data) => {
    setLoadingSubbmit(true);
    jwtAxios
      .post("permission", data)
      .then(() => {
        // reCallAPI();
        navigate("/Permissions/List");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };
  const handleEditPermission = (data) => {
    setLoadingSubbmit(true);
    jwtAxios
      .put("permission", data)
      .then(() => {
        navigate("/Permissions/List");
        infoViewActionsContext.showMessage("Edit Permission Success!");
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
      <Card>
        {loadingGetCode || loadingDetail ? (
          <AppLoader />
        ) : (
          <Formik
            validateOnBlur={true}
            initialValues={{
              id: detail.id ? detail.id : "",
              Code: detail.Code ? detail.Code : codePermission,
              Name: detail.Name ? detail.Name : "",
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
              <PermissionForm
                values={values}
                setFieldValue={setFieldValue}
                loadingSubmit={loadingSubmit}
              />
            )}
          </Formik>
        )}
      </Card>
    </>
  );
};
export default CreatePermission;
