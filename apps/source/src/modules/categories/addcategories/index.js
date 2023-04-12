import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Box, Card } from "@mui/material";
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import { useNavigate, useParams } from "react-router-dom";
import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CategoryForm from "./AddCategory";
import * as yup from "yup";
const validationSchema = yup.object({});
const CreateCategory = () => {
  const { id } = useParams();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [detail, setDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const navigate = useNavigate();
  const [loadingSubmit, setLoadingSubbmit] = useState(false);
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else { }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`category/${id}`);
      setDetail(dataResult.data.data);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };
  const handleCreateCategory = (data) => {
    setLoadingSubbmit(true);
    jwtAxios
      .post("category", data)
      .then(() => {
        // reCallAPI();
        navigate("/Category/List");
        infoViewActionsContext.showMessage("Create Category Success!");
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
      .put("category", data)
      .then(() => {
        navigate("/Category/List");
        infoViewActionsContext.showMessage("Edit Category Success!");
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
              Code: detail.Code ? detail.Code : "",
              Name: detail.Name ? detail.Name : "",
              GroupName: detail.GroupName ? detail.GroupName : "",
              GroupCode: detail.GroupCode ? detail.GroupCode : "",
              Sort: detail.Sort ? detail.Sort : "",
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
              <CategoryForm
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

export default CreateCategory;


