import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { TypeCampaingnsCode } from "@crema/constants";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import jwtAxios from "@crema/services/auth/JWT";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerGroupContextProvider from "../../customerGroup/Context/CustomerGroupContexProvider";
import CustomerContextProvider from "../../customerList/context/CustomerContextProvider";
import CreateMarketingEmailForm from "./CreateMarketingEmailForm";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import moment from "moment";

const validationSchema = yup.object({
  // Email: yup.string().email("Invalid email format").required("Required"),
});

const CreateWithEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [loading, setLoading] = useState(false);
  const [typeSourceData, setTypeSourceData] = useState([]);
  const [loadingTemplate, setLoadingTemplate] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState([]);
  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState([]);

  const [detailMarketing, setDetailMarketing] = useState({});
  const [loadingDetail, setLoadingDetail] = useState(false);

  const [codeMarketing, setCodeMarketing] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubbmit, setLoadingSummit] = useState(false);

  useEffect(() => {
    getTypeSourceData();
    getTemplates();
  }, []);

  useEffect(() => {
    if (id !== "create") {
      getData();
    } else {
      getCodeCustomer();
    }
  }, []);

  const getCodeCustomer = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "CAM",
      })
      .then((request) => {
        setCodeMarketing(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const getTypeSourceData = async () => {
    try {
      setLoading(true);
      const dataResult = await jwtAxios.get(
        `getByGroupCode/TypeSourceDataCode`
      );
      setTypeSourceData(dataResult.data.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTemplates = async () => {
    try {
      setLoadingTemplate(true);
      const dataResult = await jwtAxios.post("emailTemplates", {
        ValueFilter: "",
        Sort: { Name: 1 },
        PageIndex: 1,
        PageSize: 99,
      });
      setTemplates(dataResult.data.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTemplate(false);
    }
  };

  const getData = async () => {
    try {
      setLoadingDetail(true);
      const dataResult = await jwtAxios.get(`campaingnsDetail/${id}`);
      setDetailMarketing(dataResult.data.data);
      setSelectedCustomer(dataResult.data.data.Customers);
      setSelectedCustomerGroup(dataResult.data.data.CustomerGroups);
      setLoadingDetail(false);
    } catch (error) {
      console.log(error);
    }
  };

  const createMarketing = (newMarketing) => {
    setLoadingSummit(true);
    jwtAxios
      .post("campaingnsAdd", newMarketing)
      .then(() => {
        infoViewActionsContext.showMessage("Success");
        navigate("/marketing");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSummit(false);
      });
  };

  const editMarketing = (newMarketing) => {
    setLoadingSummit(true);
    jwtAxios
      .put("campaingnsEdit", newMarketing)
      .then(() => {
        infoViewActionsContext.showMessage("Success");
        navigate("/marketing");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSummit(false);
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
      <CustomerContextProvider>
        <CustomerGroupContextProvider>
          <Card>
            {loadingGetCode || loadingDetail || loading || loadingTemplate ? (
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
                    isSubmitting={loadingSubbmit}
                    typeSourceData={typeSourceData}
                    loading={loading}
                    loadingTemplate={loadingTemplate}
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
        </CustomerGroupContextProvider>
      </CustomerContextProvider>
    </>
  );
};

export default CreateWithEmail;
