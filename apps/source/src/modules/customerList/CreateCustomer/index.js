import AppLoader from "@crema/components/AppLoader";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import jwtAxios from "@crema/services/auth/JWT";
import { Formik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import CustomerForm from "./CustomerForm";
import CustomerGroupContextProvider from "../../customerGroup/Context/CustomerGroupContexProvider";

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
  const [loadingGetCode, setLoadingGetCode] = useState(false);
  const [loadingSubmit, setLoadingSubbmit] = useState(false);

  const [listSex, setListSex] = useState([]);
  const [loadingSex, setLoadingSex] = useState(true);

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getListSex();
  }, []);

  useEffect(() => {
    if (id !== "Create") {
      getData();
    } else {
      getCodeCustomer();
    }
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const dataResult = await jwtAxios.get(`customer/${id}`);
      setData(dataResult.data.data);
      setSelectedCustomerGroup(
        dataResult.data.data.CustomerGroups
          ? [dataResult.data.data.CustomerGroups]
          : []
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCodeCustomer = async () => {
    setLoadingGetCode(true);
    jwtAxios
      .post(`generationCode`, {
        code: "KH",
      })
      .then((request) => {
        setCodeCustomer(request.data.data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingGetCode(false);
      });
  };

  const handleCreateCustomer = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      CustomerGroups: selectedCustomerGroup[0]?.id || undefined,
      AvatarFile: data.AvatarFile || undefined,
    };

    jwtAxios
      .post("customer", newData)
      .then(() => {
        navigate("/Customer/List");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  const handleEditCustormer = (data) => {
    setLoadingSubbmit(true);
    const newData = {
      ...data,
      CustomerGroups: selectedCustomerGroup[0]?.id || undefined,
      AvatarFile: data.AvatarFile || undefined,
    };

    jwtAxios
      .put("customer", newData)
      .then(() => {
        navigate("/Customer/List");
        infoViewActionsContext.showMessage("Success!");
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      })
      .finally(() => {
        setLoadingSubbmit(false);
      });
  };

  const getListSex = async () => {
    try {
      setLoadingSex(true);
      const dataResult = await jwtAxios.get(`getByGroupCode/Sex`);
      setListSex(dataResult.data.datas);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSex(false);
    }
  };

  return (
    <CustomerGroupContextProvider>
      {loadingGetCode || loadingSex || loading ? (
        <AppLoader />
      ) : (
        <Formik
          validateOnBlur={true}
          initialValues={{
            id: data.id ? data.id : "",
            Code: data.Code ? data.Code : codeCustomer,
            // To do
            AvatarFile: data.AvatarFile
              ? data.AvatarFile
              : "640994fd3dcffe32d3ef6986",
            Email: data.Email ? data.Email : "",
            PhonenumberFirst: data.PhonenumberFirst
              ? data.PhonenumberFirst
              : "",
            Name: data.Name ? data.Name : "",
            BirthDay: data.BirthDay ? data.BirthDay : moment(),
            Sex: data.Sex ? data.Sex : listSex[0].Code,
            CCCD: data.CCCD ? data.CCCD : "",
            Zalo: data.Zalo ? data.Zalo : "",
            Facebook: data.Facebook ? data.Facebook : "",
            Address: data.Address ? data.Address : "",
            CustomerGroups: "",
            AvatarPreview: data.AvatarFile
              ? `https://crmic2-dev.vercel.app/file/${data.AvatarFile}`
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
              loadingSubmit={loadingSubmit}
              listSex={listSex}
            />
          )}
        </Formik>
      )}
    </CustomerGroupContextProvider>
  );
};

export default CreateCustomer;
