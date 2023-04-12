import { Formik } from 'formik';
import * as yup from 'yup';
import PersonalInfoForm from './PersonalInfoForm';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useInfoViewActionsContext } from '@crema/context/InfoViewContextProvider';
import jwtAxios from '@crema/services/auth/JWT';

const validationSchema = yup.object({
  // email: yup.string().email('Invalid email format').required('Required'),
});
const PersonalInfo = ({ zaloTeamplate }) => {
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleSubmit = (data) => {
    jwtAxios
      .put("/zaloTemplate", data)
      .then((response) => {
        infoViewActionsContext.showMessage("Edit Template Zalo successfull!");
      })
      .catch((error) => {
        console.log(error, "error");
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Formik
        validateOnBlur={true}
        initialValues={zaloTeamplate}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(data)
          setSubmitting(false);
        }}
      >
        {({ values, setFieldValue }) => <PersonalInfoForm values={values} setFieldValue={setFieldValue} />}
      </Formik>
    </Box>
  );
};

export default PersonalInfo;

PersonalInfo.propTypes = {
  customer: PropTypes.object,
};
