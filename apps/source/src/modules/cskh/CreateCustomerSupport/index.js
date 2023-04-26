import AppLoader from "@crema/components/AppLoader";
import AppTooltip from "@crema/components/AppTooltip";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Card } from "@mui/material";
import { Formik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateSupportForm from "./CreateSupportForm";
import { getData, postData, putData } from "@crema/hooks/APIHooks";
import AppInfoView from "@crema/components/AppInfoView";

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
  const [data, setData] = useState(null);
  const [channelRequest, setChannelRequest] = useState([]);
  const [statusTicket, setStatusTicket] = useState([]);

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
    getData(`ticketRequest/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getStatusTicket = async () => {
    getData("getByGroupCode/StatusTicketRequestCode", infoViewActionsContext)
      .then(({ datas }) => {
        setStatusTicket(datas);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCode = async () => {
    postData(`generationCode`, infoViewActionsContext, {
      code: "TICK",
    })
      .then(({ data }) => {
        setCodeCskh(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getChannelRequest = async () => {
    getData("getByGroupCode/ChannelRequestCode", infoViewActionsContext)
      .then(({ datas }) => {
        setChannelRequest(
          datas.map((item) => {
            return {
              Code: item.Code,
              Name: item.Name,
              id: item.id,
            };
          })
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handlesCreate = (data) => {
    const newTicket = {
      StatusTicketCode: "wait",
      ...data,
    };
    postData("ticketRequest", infoViewActionsContext, newTicket)
      .then(() => {
        navigate("/cskh");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEdit = (data) => {
    putData("ticketRequest", infoViewActionsContext, {
      ...data,
      id: id,
    })
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleBack = (event) => {
    event.preventDefault();
    navigate("/cskh");
  };

  const loading = useMemo(
    () =>
      !(channelRequest.length && statusTicket.length) &&
      !(id === "Create" ? codeCskh : data),
    [channelRequest, statusTicket, codeCskh, data, id]
  );

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
        }}
        component="span"
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
              id: data?.id ? data?.id : "",
              Code: data?.Code ? data?.Code : codeCskh,
              RequestTitle: data?.RequestTitle ? data?.RequestTitle : "",
              Name: data?.Name ? data?.Name : "",
              Email: data?.Email ? data?.Email : "",
              Address: data?.Address ? data?.Address : "",
              Note: data?.Note ? data?.Note : "",
              Phonenumber: data?.Phonenumber ? data?.Phonenumber : "",
              ChannelRequestCode: data?.ChannelRequestCode
                ? data?.ChannelRequestCode
                : channelRequest[0]?.Code,
              StatusTicketCode: data?.StatusTicketCode
                ? data?.StatusTicketCode
                : statusTicket[0]?.Code,
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
                channelRequest={channelRequest}
                statusTicket={statusTicket}
              />
            )}
          </Formik>
        )}
      </Card>
      <AppInfoView />
    </>
  );
};

export default CreateCustomerSupport;
