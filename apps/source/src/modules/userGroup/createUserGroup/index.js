import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import UserGroupForm from "./AddUserGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getData, postData, putData } from "@crema/hooks/APIHooks";

const validationSchema = yup.object({});

const CreateUserGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);
  const [codeUserGroup, setUserGroup] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeCustomerGroup();
    }
  }, []);

  const getDataDetail = () => {
    getData(`userGroup/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeCustomerGroup = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "GNV",
    })
      .then(({ data }) => {
        setUserGroup(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreate = (data) => {
    postData("userGroup", infoViewActionsContext, data)
      .then(() => {
        navigate("/userGroup");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    putData("userGroup", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeUserGroup : detail),
    [codeUserGroup, detail, id]
  );

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/userGroup");
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
              Code: detail?.Code ? detail?.Code : codeUserGroup,
              Name: detail?.Name ? detail?.Name : "",
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
              <UserGroupForm values={values} setFieldValue={setFieldValue} />
            )}
          </Formik>
        )}
      </Card>
    </>
  );
};

export default CreateUserGroup;
