import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Button, FormControlLabel, Grid } from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";

const CategoryForm = ({ loadingSubmit, values }) => {
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const handleChange = (event) => {
    setIsEdit(!event.target.checked);
  };
  return (
    <Form autoComplete="off" style={{ padding: "20px 48px" }}>
      {values?.id ? (
        <Box display="flex" justifyContent="flex-end">
          <FormControlLabel
            control={
              <Android12Switch checked={!isEdit} onChange={handleChange} />
            }
            label={<IntlMessages id="common.edit" />}
          />
        </Box>
      ) : (
        <></>
      )}
      <Grid container p="30px" spacing={5}>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              px: 5,
              mx: -5,
            }}
          >
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="category.Code" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Code"
              autoFocus
              disabled={isEdit}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box
            sx={{
              px: 5,
              mx: -5,
            }}
          >
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="category.Name" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Name"
              autoFocus
              disabled={isEdit}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              px: 5,
              mx: -5,
            }}
          >
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="category.GroupCode" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="GroupCode"
              autoFocus
              disabled={isEdit}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box
            sx={{
              px: 5,
              mx: -5,
            }}
          >
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="category.GroupName" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="GroupName"
              autoFocus
              disabled={isEdit}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              px: 5,
              mx: -5,
            }}
          >
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="category.Sort" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Sort"
              autoFocus
              disabled={isEdit}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              pt: 4,
              mx: -1,
              textAlign: "right",
            }}
          >
            {loadingSubmit ? (
              <LoadingButton
                sx={{
                  position: "relative",
                  minWidth: 100,
                }}
                variant="contained"
                loading={true}
              >
                <IntlMessages id="common.saveChanges" />
              </LoadingButton>
            ) : (
              <Button
                sx={{
                  position: "relative",
                  minWidth: 100,
                }}
                color="primary"
                variant="outlined"
                type="submit"
                startIcon={<SaveIcon />}
                disabled={isEdit}
              >
                <IntlMessages id="common.save" />
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CategoryForm;

CategoryForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  loadingSubmit: PropTypes.bool.isRequired,
};
