import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";

const CreateSupportForm = ({
  values,
  setFieldValue,
  channelRequest,
  statusTicket,
}) => {
  const { messages } = useIntl();
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
      <Grid container spacing={5}>
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
              disabled
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
              <IntlMessages id="customerSuport.RequestTitle" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="RequestTitle"
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
              <IntlMessages id="customerSuport.nameCustomer" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Name"
              disabled={isEdit}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
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
              <IntlMessages id="customerSuport.ChannelRequestCode" />
            </Box>
            <Select
              name="Sex"
              onChange={(event) =>
                setFieldValue("ChannelRequestCode", event.target.value)
              }
              sx={{
                width: "100%",
              }}
              defaultValue={values.ChannelRequestCode}
              disabled={isEdit}
            >
              {channelRequest.map((item) => (
                <MenuItem key={item.Code} value={item.Code}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
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
              <IntlMessages id="customerSuport.status" />
            </Box>
            <Select
              name="Sex"
              onChange={(event) =>
                setFieldValue("StatusTicketCode", event.target.value)
              }
              sx={{
                width: "100%",
              }}
              defaultValue={values.StatusTicketCode}
              disabled={isEdit}
            >
              {statusTicket.map((item) => (
                <MenuItem key={item.Code} value={item.Code}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
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
              <IntlMessages id="customerSuport.email" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Email"
              disabled={isEdit}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
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
              <IntlMessages id="customerSuport.phone" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Phonenumber"
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
              <IntlMessages id="customerSuport.address" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Address"
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
              <IntlMessages id="customerSuport.notes" />
            </Box>
            <AppTextField
              name="Note"
              multiline
              sx={{
                width: "100%",
              }}
              rows="4"
              variant="outlined"
              placeholder={messages["customerSuport.notes"]}
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
            <LoadingButton
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
              disabled={isEdit}
              startIcon={<SaveIcon />}
            >
              <IntlMessages id="common.save" />
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
};

export default CreateSupportForm;

CreateSupportForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  channelRequest: PropTypes.any.isRequired,
  statusTicket: PropTypes.any.isRequired,
};
