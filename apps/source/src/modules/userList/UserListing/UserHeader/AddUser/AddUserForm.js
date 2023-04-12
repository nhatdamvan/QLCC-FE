import AppGridContainer from "@crema/components/AppGridContainer";
import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  Select,
  TextField,
} from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";

const AddUserForm = (props) => {
  const { values, setFieldValue, roles, selectedRoles, setSelectedRoles } = props;

  return (
    <Form noValidate autoComplete="off">
      <Box
        sx={{
          padding: 5,
          ml: -6,
          mr: -6,
        }}
      >
        <Box
          component="h6"
          sx={{
            mb: { xs: 4, xl: 6 },
            fontSize: 14,
            fontWeight: Fonts.SEMI_BOLD,
          }}
        >
          <IntlMessages id="contactApp.createUser" />
        </Box>

        <AppTextField
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
          variant="outlined"
          label={<IntlMessages id="common.username" />}
          name="Username"
        />

        <AppTextField
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
          variant="outlined"
          label={<IntlMessages id="common.password" />}
          name="Password"
        />

        <AppGridContainer spacing={5}>
          <Grid item xs={12} md={6}>
            <AppTextField
              sx={{
                width: "100%",
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              label={<IntlMessages id="common.emailAddress" />}
              name="Email"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <AppTextField
              sx={{
                width: "100%",
                mb: { xs: 4, xl: 6 },
              }}
              variant="outlined"
              label={<IntlMessages id="common.phoneNumber" />}
              name="Phonenumber"
            />
          </Grid>
        </AppGridContainer>

        <Autocomplete
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
          multiple
          id="roles-outlined"
          options={roles}
          getOptionLabel={(option) => option.Name}
          value={selectedRoles}
          onChange={(event, value) => setSelectedRoles(value)}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={<IntlMessages id="common.role" />}
              fullWidth
            />
          )}
        />

        <AppTextField
          sx={{
            width: "100%",
            mb: { xs: 4, xl: 6 },
          }}
          variant="outlined"
          label={<IntlMessages id="common.address" />}
          name="Address"
        />
      </Box>

      <Box
        sx={{
          pb: 4,
          mx: -1,
          textAlign: "right",
        }}
      >
        <Button
          sx={{
            position: "relative",
            minWidth: 100,
          }}
          color="primary"
          variant="outlined"
          type="submit"
        >
          <IntlMessages id="common.save" />
        </Button>
      </Box>
    </Form>
  );
};

export default AddUserForm;

AddUserForm.defaultProps = {
  selectedRoles: [],
};

AddUserForm.propTypes = {
  values: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  setFieldValue: PropTypes.func,
  selectedRoles: PropTypes.array,
  setSelectedRoles: PropTypes.func
};
