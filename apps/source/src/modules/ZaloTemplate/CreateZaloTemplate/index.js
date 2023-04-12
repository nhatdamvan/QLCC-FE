import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppLoader from "@crema/components/AppLoader";
import { Formik } from "formik";
import ZaloTemplateForm from "./ZaloTemplateForm";

const validationSchema = yup.object({});

const CreateZaloTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [codeZaloTemplate, setCodeZaloTemplate] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeTemplateZalo();
    }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`zaloTemplate/${id}`);
      setDetail(dataResult.data.data);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const getCodeTemplateZalo = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "ZALOT",
      })
      .then((request) => {
        setCodeZaloTemplate(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const handleCreate = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      Files: data.Files || undefined,
      Image: data.Image || undefined,
    };

    jwtAxios
      .post("zaloTemplate", newData)
      .then(() => {
        navigate("/ZaloTemplate/List");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  const handleEdit = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      Files: data?.Files?.id ? data?.Files?.id : data?.Files,
      Image: data?.Image || undefined,
    };

    jwtAxios
      .put("/zaloTemplate", newData)
      .then(() => {
        navigate("/ZaloTemplate/List");
        infoViewActionsContext.showMessage("Edit Template Zalo successfull!");
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
              Code: detail.Code ? detail.Code : codeZaloTemplate,
              Name: detail.Name ? detail.Name : "",
              Files: detail.Files ? detail.Files : undefined,
              Content: detail.Content ? detail.Content : "",
              Image: detail.Image ? detail.Image : undefined,
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              if (id === "Create") {
                handleCreate(data);
              } else {
                handleEdit(data);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <ZaloTemplateForm
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

export default CreateZaloTemplate;
