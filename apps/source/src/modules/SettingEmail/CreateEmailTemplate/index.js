import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik } from "formik";
import EmailTemplateForm from "./EmailTemplateForm";
import * as yup from "yup";
import AppLoader from "@crema/components/AppLoader";

const validationSchema = yup.object({
  // Name: yup.string().required("Required"),
  // Email: yup.string().email("Invalid email format").required("Required"),
  // PhonenumberFirst: yup.string().required("Required"),
});

const CreateEmailTemplate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [codeEmailTemplate, setCodeEmailTemplate] = useState("");
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
      const dataResult = await jwtAxios.get(`emailTemplate/${id}`);
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
        code: "EMT",
      })
      .then((request) => {
        setCodeEmailTemplate(request.data.data);
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
      .post("emailTemplate", data)
      .then(() => {
        // reCallAPI();
        navigate("/EmailTemplate/List");
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
      Files: data.Files.map((item) => item.id),
    };

    jwtAxios
      .put("/emailTemplate", newData)
      .then((response) => {
        navigate("/EmailTemplate/List");
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
              Code: detail.Code ? detail.Code : codeEmailTemplate,
              Name: detail.Name ? detail.Name : "",
              Title: detail.Title ? detail.Title : "",
              Content: detail.Content ? detail.Content : "",
              Files: detail.Files ? detail.Files : [],
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
                loadingSubmit={loadingSubmit}
              />
            )}
          </Formik>
        )}
      </Card>
    </>
  );
};

export default CreateEmailTemplate;
