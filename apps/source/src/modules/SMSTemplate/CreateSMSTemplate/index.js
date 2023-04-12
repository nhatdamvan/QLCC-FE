import { useNavigate, useParams } from "react-router-dom";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import * as yup from "yup";
import jwtAxios from "@crema/services/auth/JWT";
import { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTooltip from "@crema/components/AppTooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppLoader from "@crema/components/AppLoader";
import { Formik } from "formik";
import SmsTemplateForm from "./SmsTemplateForm";

const validationSchema = yup.object({});

const CreateSMSTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [codeSmsTemplate, setCodeSmsTemplate] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeTemplateEmail();
    }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`smsTemplate/${id}`);
      setDetail(dataResult.data.data);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const getCodeTemplateEmail = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "SMST",
      })
      .then((request) => {
        setCodeSmsTemplate(request.data.data);
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

    jwtAxios
      .post("smsTemplate", data)
      .then(() => {
        navigate("/SmsTemplate/List");
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

    jwtAxios
      .put("/smsTemplate", data)
      .then((response) => {
        navigate("/SmsTemplate/List");
        infoViewActionsContext.showMessage("Edit Template Email successfull!");
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
              Code: detail.Code ? detail.Code : codeSmsTemplate,
              Name: detail.Name ? detail.Name : "",
              Content: detail.Content ? detail.Content : "",
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
              <SmsTemplateForm
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

export default CreateSMSTemplate;
