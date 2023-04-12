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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateSupportForm from "./CreateSupportForm";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  RequestTitle: yup
    .string()
    .required("Trường bắt buộc")
    .max(256, "Số ký tự không được vượt quá 256"),
  Name: yup
    .string()
    .required("Trường bắt buộc")
    .max(256, "Số ký tự không được vượt quá 256"),
  Email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Trường bắt buộc")
    .max(256, "Số ký tự không được vượt quá 256"),
  Phonenumber: yup
    .string()
    .required("Trường bắt buộc")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .max(10, "Số ký tự không được vượt quá 10"),
});

const CreateCustomerSupport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [codeCskh, setCodeCskh] = useState("");
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);
  const [channelRequest, setChannelRequest] = useState([]);
  const [loadingChannelRequest, setLoadingChannelRequest] = useState(true);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const [statusTicket, setStatusTicket] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(false);

  useEffect(() => {
    getChannelRequest();
    getStatusTicket();
  }, []);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCode();
    }
  }, []);

  const getDataDetail = async () => {
    try {
      setLoading(true);
      const dataResult = await jwtAxios.get(`ticketRequest/${id}`);
      setData(dataResult.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusTicket = async () => {
    try {
      setLoadingStatus(true);
      const dataResult = await jwtAxios.get(
        `getByGroupCode/StatusTicketRequestCode`
      );
      setStatusTicket(dataResult.data.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingStatus(false);
    }
  };

  const getCode = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "TICK",
      })
      .then((request) => {
        setCodeCskh(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const getChannelRequest = async () => {
    try {
      setLoadingChannelRequest(true);
      const dataResult = await jwtAxios.get(
        `getByGroupCode/ChannelRequestCode`
      );
      setChannelRequest(
        dataResult.data.datas.map((item) => {
          return {
            Code: item.Code,
            Name: item.Name,
            id: item.id,
          };
        })
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingChannelRequest(false);
    }
  };

  const handlesCreate = (data) => {
    setLoadingSubbmit(true);
    const newTicket = {
      StatusTicketCode: "wait",
      ...data,
    };

    jwtAxios
      .post("ticketRequest", newTicket)
      .then(() => {
        navigate("/cskh");
        infoViewActionsContext.showMessage("Ticket created successfully!");
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
      .put("ticketRequest", {
        ...data,
        id: id,
      })
      .then(() => {
        navigate("/cskh");
        infoViewActionsContext.showMessage("Success!");
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
        {loadingGetCode || loadingStatus || loadingChannelRequest || loading ? (
          <AppLoader />
        ) : (
          <Formik
            validateOnBlur={true}
            initialValues={{
              id: data.id ? data.id : "",
              Code: data.Code ? data.Code : codeCskh,
              RequestTitle: data.RequestTitle ? data.RequestTitle : "",
              Name: data.Name ? data.Name : "",
              Email: data.Email ? data.Email : "",
              Address: data.Address ? data.Address : "",
              Note: data.Note ? data.Note : "",
              Phonenumber: data.Phonenumber ? data.Phonenumber : "",
              ChannelRequestCode: data.ChannelRequestCode
                ? data.ChannelRequestCode
                : channelRequest[0].Code,
              StatusTicketCode: data.StatusTicketCode
                ? data.StatusTicketCode
                : statusTicket[0].Code,
            }}
            validationSchema={validationSchema}
            onSubmit={(data) => {
              if (id !== "Create") {
                handleEdit(data);
              } else {
                handlesCreate(data);
              }
            }}
          >
            {({ values, setFieldValue }) => (
              <CreateSupportForm
                values={values}
                setFieldValue={setFieldValue}
                loadingSubmit={loadingSubmit}
                channelRequest={channelRequest}
                statusTicket={statusTicket}
              />
            )}
          </Formik>
        )}
      </Card>
    </>
  );
};

export default CreateCustomerSupport;
