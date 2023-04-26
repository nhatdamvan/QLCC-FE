import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerGroupForm from "./AddCustomerFrom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
const validationSchema = yup.object({});

const CreateCustomerGroup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [detail, setDetail] = useState(null);
  const [codeCustomerGroup, setCustomerGroup] = useState("");

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeCustomerGroup();
    }
  }, []);

  const getDataDetail = () => {
    getData(`customerGroup/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetail(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeCustomerGroup = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "GKH",
    })
      .then(({ data }) => {
        setCustomerGroup(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreate = (data) => {
    postData("customerGroup", infoViewActionsContext, newData)
      .then(() => {
        navigate("/CustomerGroup/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    putData("customerGroup", infoViewActionsContext, data)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const loading = useMemo(
    () => !(id === "Create" ? codeCustomerGroup : detail),
    [codeCustomerGroup, detail, id]
  );

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/CustomerGroup/List");
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
              Code: detail?.Code ? detail?.Code : codeCustomerGroup,
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
            {({ values }) => <CustomerGroupForm values={values} />}
          </Formik>
        )}
      </Card>
    </>
  );
};
export default CreateCustomerGroup;
