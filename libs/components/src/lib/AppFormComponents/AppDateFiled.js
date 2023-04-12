import React from 'react';
import { Field } from 'formik';
import { DateTimePicker } from '@mui/x-date-pickers';

import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const AppDateFiled = (props) => {
  return (
    <Field
      component={DateTimePicker}
      variant="outlined"
      inputVariant="outlined"
      format="YYYY-MM-DD"
      mask="____-__-__"
      {...props}
      renderInput={(params) => (
        <TextField className={props.className} {...params} />
      )}
    />
  );
};

export default AppDateFiled;

AppDateFiled.propTypes = {
  className: PropTypes.string,
};
