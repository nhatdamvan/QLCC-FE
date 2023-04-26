import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  TextField,
} from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import { useIntl } from "react-intl";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";
import {
  usePermissionsActionContext,
  usePermissionsContext,
} from "../../permissions/context/PermissionsContextProvider";
import AppSelectItemDialog from "@crema/components/AppSelectItemDialog";

const RolesForm = ({ values, selectedPermissions, setSelectedPermissions }) => {
  const { messages } = useIntl();
  const {
    loading: loadingPermissions,
    permissions,
    totalCount: totalCountPermissons,
    page: pagePermissons,
  } = usePermissionsContext();
  const {
    onSearchEmail: onSearchPermissons,
    setPage: setPage,
    getData: getPermisstions,
  } = usePermissionsActionContext();

  const [isOpenPermissonsDialog, setIsOpenPermissionsDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const handleOpenPermissonsDialog = () => {
    setIsOpenPermissionsDialog(true);
  };

  const handleClosePermissonsDialog = () => {
    setIsOpenPermissionsDialog(false);
  };

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
              <IntlMessages id="roles.code" />
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
              <IntlMessages id="roles.name" />
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
              <IntlMessages id="permissions.list" />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                multiple
                id="roles-outlined"
                readOnly
                options={
                  loadingPermissions
                    ? []
                    : permissions?.map((item) => {
                        item.Code, item.Name, item.id;
                      })
                }
                getOptionLabel={(option) => option?.Name}
                value={selectedPermissions}
                filterSelectedOptions
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth />
                )}
              />
              <Button
                color="primary"
                variant="contained"
                sx={{
                  height: "53px",
                  ml: 2,
                }}
                onClick={handleOpenPermissonsDialog}
                disabled={isEdit}
              >
                <SearchIcon />
              </Button>
            </Box>
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
            <Button
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
              autoFocus
              disabled={isEdit}
            >
              <IntlMessages id="common.save" />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <AppSelectItemDialog
        title={messages["common.permission"]}
        urlCreate={"/Permissions/Create"}
        multipleSelect={true}
        isOpen={isOpenPermissonsDialog}
        handleDialogClose={handleClosePermissonsDialog}
        setSelectedItem={setSelectedPermissions}
        selectedEdit={selectedPermissions}
        itemList={permissions}
        loading={loadingPermissions}
        totalCount={totalCountPermissons}
        page={pagePermissons}
        setPage={setPage}
        onSearch={onSearchPermissons}
        getData={getPermisstions}
      />
    </Form>
  );
};

export default RolesForm;

RolesForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  selectedPermissions: PropTypes.array,
  setSelectedPermissions: PropTypes.func,
};
