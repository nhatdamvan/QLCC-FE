import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppLoader from "@crema/components/AppLoader";
import { Formik } from "formik";
import ZaloTemplateForm from "./ZaloTemplateForm";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({});

const CreateZaloTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);
  const [codeZaloTemplate, setCodeZaloTemplate] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeTemplateZalo();
    }
  }, []);

  const getDataDetail = () => {
    getData(`zaloTemplate/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeTemplateZalo = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "ZALOT",
    })
      .then(({ data }) => {
        setCodeZaloTemplate(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreate = (data) => {
    const newData = {
      ...data,
      Files: data.Files || undefined,
      Image: data.Image || undefined,
    };
    postData("zaloTemplate", infoViewActionsContext, newData)
      .then(() => {
        navigate("/ZaloTemplate/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    const newData = {
      ...data,
      Files: data?.Files?.id ? data?.Files?.id : data?.Files,
      Image: data?.Image || undefined,
    };
    putData("zaloTemplate", infoViewActionsContext, newData)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/ZaloTemplate/List");
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeZaloTemplate : detail),
    [codeZaloTemplate, detail, id]
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
              Code: detail?.Code ? detail?.Code : codeZaloTemplate,
              Name: detail?.Name ? detail?.Name : "",
              Files: detail?.Files ? detail?.Files : undefined,
              Content: detail?.Content ? detail?.Content : "",
              Image: detail?.Image ? detail?.Image : undefined,
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
              <ZaloTemplateForm values={values} setFieldValue={setFieldValue} />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};

export default CreateZaloTemplate;
