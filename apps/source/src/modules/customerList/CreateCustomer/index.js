import AppLoader from "@crema/components/AppLoader";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { Formik } from "formik";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerForm from "./CustomerForm";
import CustomerGroupContextProvider from "../../customerGroup/Context/CustomerGroupContexProvider";
import { getData, postData, putData } from "@crema/hooks/APIHooks";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  Name: yup
    .string()
    .required("Trường bắt buộc")
    .max(256, "Số ký tự không được vượt quá 256"),
  Email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Trường bắt buộc")
    .max(256, "Số ký tự không được vượt quá 256"),
  PhonenumberFirst: yup
    .string()
    .required("Trường bắt buộc")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .max(10, "Số ký tự không được vượt quá 10"),
  CCCD: yup
    .string()
    .matches(phoneRegExp, "CCCD không hợp lệ")
    .max(10, "Số ký tự không được vượt quá 10"),
});

const CreateCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [selectedCustomerGroup, setSelectedCustomerGroup] = useState([]);
  const [codeCustomer, setCodeCustomer] = useState("");
  const [listSex, setListSex] = useState([]);
  const [data, setData] = useState(null);

  useEffect(() => {
    getListSex();
  }, []);

  useEffect(() => {
    if (id !== "Create") {
      getDataDetail();
    } else {
      getCodeCustomer();
    }
  }, []);

  const getDataDetail = async () => {
    getData(`customer/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
        setSelectedCustomerGroup(
          data.CustomerGroups ? [data.CustomerGroups] : []
        );
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getCodeCustomer = () => {
    postData("generationCode", infoViewActionsContext, {
      code: "KH",
    })
      .then(({ data }) => {
        setCodeCustomer(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleCreateCustomer = (data) => {
    const newData = {
      ...data,
      CustomerGroups: selectedCustomerGroup[0]?.id || undefined,
      AvatarFile: data.AvatarFile || undefined,
    };

    postData("customer", infoViewActionsContext, newData)
      .then(() => {
        navigate("/Customer/List");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleEditCustormer = (data) => {
    const newData = {
      ...data,
      CustomerGroups: selectedCustomerGroup[0]?.id || undefined,
      AvatarFile: data.AvatarFile || undefined,
    };

    putData("customer", infoViewActionsContext, newData)
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const getListSex = () => {
    getData("getByGroupCode/Sex", infoViewActionsContext)
      .then(({ datas }) => {
        setListSex(datas);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const loading = useMemo(
    () => !(listSex.length && (id === "Create" ? codeCustomer : data)),
    [listSex, codeCustomer, data, id]
  );

  return (
    <CustomerGroupContextProvider>
      {loading ? (
        <AppLoader />
      ) : (
        <Formik
          validateOnBlur={true}
          initialValues={{
            id: data?.id ? data?.id : "",
            Code: data?.Code ? data?.Code : codeCustomer,
            // To do
            AvatarFile: data?.AvatarFile
              ? data?.AvatarFile
              : "640994fd3dcffe32d3ef6986",
            Email: data?.Email ? data?.Email : "",
            PhonenumberFirst: data?.PhonenumberFirst
              ? data?.PhonenumberFirst
              : "",
            Name: data?.Name ? data?.Name : "",
            BirthDay: data?.BirthDay ? data?.BirthDay : moment(),
            Sex: data?.Sex ? data?.Sex : listSex[0].Code,
            CCCD: data?.CCCD ? data?.CCCD : "",
            Zalo: data?.Zalo ? data?.Zalo : "",
            Facebook: data?.Facebook ? data?.Facebook : "",
            Address: data?.Address ? data?.Address : "",
            CustomerGroups: "",
            AvatarPreview: data?.AvatarFile
              ? `https://crmic2-dev.vercel.app/file/${data?.AvatarFile}`
              : "",
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => {
            if (id === "Create") {
              handleCreateCustomer(data);
            } else {
              handleEditCustormer(data);
            }
          }}
        >
          {({ values, setFieldValue }) => (
            <CustomerForm
              values={values}
              setFieldValue={setFieldValue}
              selectedCustomerGroup={selectedCustomerGroup}
              setSelectedCustomerGroup={setSelectedCustomerGroup}
              listSex={listSex}
            />
          )}
        </Formik>
      )}
    </CustomerGroupContextProvider>
  );
};

export default CreateCustomer;
