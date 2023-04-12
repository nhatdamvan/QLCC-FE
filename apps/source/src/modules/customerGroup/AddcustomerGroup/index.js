import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerGroupForm from "./AddCustomerFrom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const validationSchema = yup.object({});
const CreateCustomerGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [detail, setDetail] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [codeCustomerGroup, setCustomerGroup] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeCustomerGroup();
    }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`customerGroup/${id}`);
      setDetail(dataResult.data.data);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    } finally {
      setLoadingDetail(false);
    }
  };

  const getCodeCustomerGroup = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "GKH",
      })
      .then((request) => {
        setCustomerGroup(request.data.data);
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
      .post("customerGroup", data)
      .then(() => {
        // reCallAPI();
        navigate("/CustomerGroup/List");
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
      .put("customerGroup", data)
      .then(() => {
        navigate("/CustomerGroup/List");
        infoViewActionsContext.showMessage("Edit Customer Group Success!");
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
              Code: detail.Code ? detail.Code : codeCustomerGroup,
              Name: detail.Name ? detail.Name : "",
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
              <CustomerGroupForm
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
export default CreateCustomerGroup;
