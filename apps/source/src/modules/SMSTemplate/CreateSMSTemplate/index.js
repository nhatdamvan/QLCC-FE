import { useNavigate, useParams } from "react-router-dom";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import * as yup from "yup";
import { useEffect, useMemo, useState } from "react";
import { Box, Card } from "@mui/material";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTooltip from "@crema/components/AppTooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppLoader from "@crema/components/AppLoader";
import { Formik } from "formik";
import SmsTemplateForm from "./SmsTemplateForm";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({});

const CreateSMSTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);
  const [codeSmsTemplate, setCodeSmsTemplate] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeTemplateEmail();
    }
  }, []);

  const getDataDetail = () => {
    getData(`smsTemplate/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeTemplateEmail = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "SMST",
    })
      .then(({ data }) => {
        setCodeSmsTemplate(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreate = (data) => {
    postData("smsTemplate", infoViewActionsContext, data)
      .then(() => {
        navigate("/SmsTemplate/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    putData("smsTemplate", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/SmsTemplate/List");
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeSmsTemplate : detail),
    [codeSmsTemplate, detail, id]
  );

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
              Code: detail?.Code ? detail?.Code : codeSmsTemplate,
              Name: detail?.Name ? detail?.Name : "",
              Content: detail?.Content ? detail?.Content : "",
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
              <SmsTemplateForm values={values} setFieldValue={setFieldValue} />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};

export default CreateSMSTemplate;
