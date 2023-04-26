import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { TypeCampaingnsCode } from "@crema/constants";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerGroupContextProvider from "../../customerGroup/Context/CustomerGroupContexProvider";
import CustomerContextProvider from "../../customerList/context/CustomerContextProvider";
import CreateMarketingEmailForm from "./CreateMarketingEmailForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({
  Name: yup.string().required("Trường bắt buộc"),
});

const CreateWithEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [typeSourceData, setTypeSourceData] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [detailMarketing, setDetailMarketing] = useState(null);
  const [codeMarketing, setCodeMarketing] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState([]);

  useEffect(() => {
    getTypeSourceData();
    getTemplates();
  }, []);

  useEffect(() => {
    if (id !== "create") {
      getDataDetail();
    } else {
      getCode();
    }
  }, []);

  const getCode = () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "CAM",
    })
      .then(({ data }) => {
        setCodeMarketing(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getTypeSourceData = () => {
    getData("getByGroupCode/TypeSourceDataCode", infoViewActionsContext)
      .then(({ datas }) => {
        setTypeSourceData(datas);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getTemplates = () => {
    postData(`emailTemplates`, infoViewActionsContext, {
      ValueFilter: "",
      Sort: { Name: 1 },
      PageIndex: 1,
      PageSize: 99,
    })
      .then(({ datas }) => {
        setTemplates(datas);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getDataDetail = () => {
    getData(`campaingnsDetail/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setDetailMarketing(data);
        setSelectedCustomer(data.Customers);
        setSelectedCustomerGroup(data.CustomerGroups);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const createMarketing = (newMarketing) => {
    postData("campaingnsAdd", infoViewActionsContext, newMarketing)
      .then(() => {
        navigate("/marketing");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const editMarketing = (newMarketing) => {
    putData("campaingnsEdit", infoViewActionsContext, newMarketing)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/marketing");
  };

  const loading = useMemo(
    () =>
      !(typeSourceData.length && templates.length) &&
      !(id === "Create" ? codeMarketing : detailMarketing),
    [typeSourceData, templates, codeMarketing, detailMarketing, id]
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
      <CustomerContextProvider>
        <CustomerGroupContextProvider>
          <Card>
            {loading ? (
              <AppLoader />
            ) : (
              <Formik
                validateOnBlur={true}
                initialValues={{
                  id: detailMarketing?.id ? detailMarketing?.id : "",
                  Code: detailMarketing?.Code
                    ? detailMarketing?.Code
                    : codeMarketing,
                  TypeCampaingnsCode: TypeCampaingnsCode.Email,
                  TypeSourceDataCode: detailMarketing?.TypeSourceDataCode
                    ? detailMarketing?.TypeSourceDataCode
                    : typeSourceData[0]?.Code,
                  TempalteEmailId: detailMarketing?.TempalteEmailId
                    ? detailMarketing?.TempalteEmailId
                    : templates[0]?.id,
                  CustomerGroups: [],
                  Customers: [],
                  Name: detailMarketing?.Name ? detailMarketing?.Name : "",
                  StartDate: detailMarketing?.StartDate
                    ? detailMarketing?.StartDate
                    : moment(),
                  EndDate: detailMarketing?.EndDate
                    ? detailMarketing?.EndDate
                    : moment(),
                  FileExcelImport: detailMarketing?.FileExcelImport
                    ? detailMarketing?.FileExcelImport
                    : [],
                }}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                  const newMarketing = {
                    ...data,
                    Customers: selectedCustomer.map((item) => item.id),
                    CustomerGroups: selectedCustomerGroup.map(
                      (item) => item.id
                    ),
                  };

                  if (id === "create") {
                    createMarketing(newMarketing);
                  } else {
                    editMarketing(newMarketing);
                  }
                }}
              >
                {({ values, setFieldValue }) => (
                  <CreateMarketingEmailForm
                    values={values}
                    setFieldValue={setFieldValue}
                    typeSourceData={typeSourceData}
                    templates={templates}
                    selectedCustomer={selectedCustomer}
                    setSelectedCustomer={setSelectedCustomer}
                    selectedCustomerGroup={selectedCustomerGroup}
                    setSelectedCustomerGroup={setSelectedCustomerGroup}
                  />
                )}
              </Formik>
            )}
          </Card>
          <AppInfoView />
        </CustomerGroupContextProvider>
      </CustomerContextProvider>
    </>
  );
};

export default CreateWithEmail;
