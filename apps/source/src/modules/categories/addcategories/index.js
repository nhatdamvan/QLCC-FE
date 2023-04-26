import { useEffect, useMemo, useState } from "react";
import { Formik } from "formik";
import { Box, Card } from "@mui/material";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import IntlMessages from "@crema/helpers/IntlMessages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryForm from "./AddCategory";
import * as yup from "yup";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({});

const CreateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    }
  }, []);

  const getDataDetail = () => {
    getData(`category/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreateCategory = (data) => {
    postData("category", infoViewActionsContext, data)
      .then(() => {
        navigate("/Category/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    putData("category", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/Category/List");
  };

  const loading = useMemo(
    () => !(id === "Create" ? true : detail),
    [detail, id]
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
              Code: detail?.Code ? detail?.Code : "",
              Name: detail?.Name ? detail?.Name : "",
              GroupName: detail?.GroupName ? detail?.GroupName : "",
              GroupCode: detail?.GroupCode ? detail?.GroupCode : "",
              Sort: detail?.Sort ? detail?.Sort : "",
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              if (id === "Create") {
                handleCreateCategory(data);
              } else {
                handleEdit(data);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <CategoryForm values={values} setFieldValue={setFieldValue} />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};

export default CreateCategory;
