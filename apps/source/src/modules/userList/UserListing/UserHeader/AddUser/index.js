import AppDialog from "@crema/components/AppDialog";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import AddUserForm from "./AddUserForm";
import jwtAxios from "@crema/services/auth/JWT";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { useEffect, useState } from "react";
import { useUserActionContext } from "../../../context/UserContextProvider";

const validationSchema = yup.object({
  // name: yup.string().required(<IntlMessages id='validation.nameRequired' />),
  // email: yup
  //   .string()
  //   .email(<IntlMessages id='validation.emailFormat' />)
  //   .required(<IntlMessages id='validation.emailRequired' />),
  // contact: yup
  //   .string()
  //   .required(<IntlMessages id='validation.phoneNumberRequired' />),
});

const CreateUser = (props) => {
  const { isAddUser, handleAddUserClose } = props;

  const { getData } = useUserActionContext()

  const infoViewActionsContext = useInfoViewActionsContext();

  const [roles, setRoles] = useState([])
  const [loadingGetRoles, setLoadingGetRoles] = useState(true)
  const [selectedRoles, setSelectedRoles] = useState([])

  useEffect(() => {
    getRoles()
  }, [])

  const getRoles = async () => {
    try {
      setLoadingGetRoles(true)
      const dataResult = await jwtAxios.post("roles", {
        ValueFilter: "",
        Sort: { Name: 1 },
        PageIndex: 1,
        PageSize: 99,
      });
      setRoles(dataResult.data.datas);
      setLoadingGetRoles(false)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppDialog fullHeight open={isAddUser} onClose={() => handleAddUserClose()}>
      <Formik
        validateOnChange={true}
        initialValues={{
          Username: "",
          Password: "",
          Email: "",
          Phonenumber: "",
          Address: "",
          Roles: [],
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          setSubmitting(true);
          const newUser = {
            ...data,
            Roles: selectedRoles.map(item => item.id),
          };

          jwtAxios
            .post("user", newUser)
            .then(() => {
              infoViewActionsContext.showMessage("Success");
              getData()
            })
            .catch((error) => {
              infoViewActionsContext.fetchError(error.message);
            });
          handleAddUserClose();
          resetForm();
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => (
          <AddUserForm
            values={values}
            setFieldValue={setFieldValue}
            roles={roles}
            handleAddUserClose={handleAddUserClose}
            selectedRoles={selectedRoles}
            setSelectedRoles={setSelectedRoles}
          />
        )}
      </Formik>
    </AppDialog>
  );
};

export default CreateUser;

CreateUser.propTypes = {
  isAddUser: PropTypes.bool.isRequired,
  handleAddUserClose: PropTypes.func.isRequired,
};
