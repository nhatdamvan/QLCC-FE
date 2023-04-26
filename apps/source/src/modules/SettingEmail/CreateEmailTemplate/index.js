import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import EmailTemplateForm from "./EmailTemplateForm";
import * as yup from "yup";
import AppLoader from "@crema/components/AppLoader";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({});

const CreateEmailTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);
  const [codeEmailTemplate, setCodeEmailTemplate] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeTemplateEmail();
    }
  }, []);

  const getDataDetail = async () => {
    getData(`emailTemplate/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeTemplateEmail = async () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "EMT",
    })
      .then(({ data }) => {
        setCodeEmailTemplate(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreate = (data) => {
    postData("emailTemplate", infoViewActionsContext, {
      ...data,
      Files: data.Files.map((item) => item.id),
    })
      .then(() => {
        navigate("/EmailTemplate/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    const newData = {
      ...data,
      Files: data.Files.map((item) => item.id),
    };

    putData("emailTemplate", infoViewActionsContext, newData)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/EmailTemplate/List");
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeEmailTemplate : detail),
    [codeEmailTemplate, detail, id]
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
              Code: detail?.Code ? detail?.Code : codeEmailTemplate,
              Name: detail?.Name ? detail?.Name : "",
              Title: detail?.Title ? detail?.Title : "",
              Content: detail?.Content ? detail?.Content : "",
              Files: detail?.Files ? detail?.Files : [],
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
              <EmailTemplateForm
                values={values}
                setFieldValue={setFieldValue}
              />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};

export default CreateEmailTemplate;
