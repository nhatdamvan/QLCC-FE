import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  TextField,
  alpha,
} from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  useUserGroupActionContext,
  useUserGroupContext,
} from "../../userGroup/context/UserGroupContextProvider";
import SaveIcon from "@mui/icons-material/Save";
import AppSelectItemDialog from "@crema/components/AppSelectItemDialog";
import { useIntl } from "react-intl";
import {
  useRolesActionContext,
  useRolesContext,
} from "../../roles/context/RolesContextProvider";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";
import { useDropzone } from "react-dropzone";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";
import { postData } from "@crema/hooks/APIHooks";

const AvatarViewWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    cursor: "pointer",
    "& .edit-icon": {
      position: "absolute",
      bottom: 0,
      right: 0,
      zIndex: 1,
      border: `solid 2px ${theme.palette.background.paper}`,
      backgroundColor: alpha(theme.palette.primary.main, 0.7),
      color: theme.palette.primary.contrastText,
      borderRadius: "50%",
      width: 26,
      height: 26,
      display: "none",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.4s ease",
      cursor: "pointer",
      "& .MuiSvgIcon-root": {
        fontSize: 16,
      },
    },
    "&.dropzone": {
      outline: 0,
      "&:hover .edit-icon, &:focus .edit-icon": {
        display: "flex",
      },
    },
  };
});

const UserForm = ({
  values,
  setFieldValue,
  selectedUserGroup,
  setSelectedUserGroup,
  selectedRoles,
  setSelectedRoles,
}) => {
  const { messages } = useIntl();
  const { loading } = useInfoViewContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const {
    loading: loadingUsersGroup,
    usersGroup,
    totalCount,
    page,
  } = useUserGroupContext();
  const {
    onSearchUser,
    setPage,
    getData: getCustomerGroups,
  } = useUserGroupActionContext();

  const {
    loading: loadingRole,
    roles,
    totalCount: totalCountRole,
    page: pageRole,
  } = useRolesContext();
  const {
    onSearchEmail: onSearchRole,
    setPage: setPageRole,
    getData: getRoles,
  } = useRolesActionContext();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenRoleDialog, setIsOpenRoleDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const { getRootProps, getInputProps } = useDropzone({
    noClick: isEdit,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      handleUploadFile(acceptedFiles);
      setFieldValue("AvatarPreview", URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleOpenRoleDialog = () => {
    setIsOpenRoleDialog(true);
  };

  const handleCloseRoleDialog = () => {
    setIsOpenRoleDialog(false);
  };

  const handleChange = (event) => {
    setIsEdit(!event.target.checked);
  };

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);

    postData("uploadFile/AvatarFile", infoViewActionsContext, formData, false, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setFieldValue("AvatarFile", data[0]);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Form autoComplete="off" style={{ padding: "20px 48px" }}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            {loading ? (
              <CircularProgress size={76} />
            ) : (
              <AvatarViewWrapper {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <label htmlFor="icon-button-file">
                  <Avatar
                    sx={{
                      width: { xs: 50, lg: 64 },
                      height: { xs: 50, lg: 64 },
                      cursor: "pointer",
                      mt: 3,
                    }}
                    src={values.AvatarPreview}
                  />
                  {!isEdit && (
                    <Box className="edit-icon">
                      <EditIcon />
                    </Box>
                  )}
                </label>
              </AvatarViewWrapper>
            )}

            {values?.id ? (
              <FormControlLabel
                control={
                  <Android12Switch checked={!isEdit} onChange={handleChange} />
                }
                label={<IntlMessages id="common.edit" />}
              />
            ) : (
              <></>
            )}
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
              <IntlMessages id="user.account" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Username"
              autoFocus
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
              <IntlMessages id="user.email" />
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
              <IntlMessages id="user.name" />
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
              <IntlMessages id="user.phone" />
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
              <IntlMessages id="user.address" />
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
              <IntlMessages id="user.role" />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                multiple
                id="customer-outlined"
                readOnly
                options={
                  loadingRole
                    ? []
                    : roles?.map((item) => {
                        item.Code, item.Name, item.id;
                      })
                }
                getOptionLabel={(option) => option?.Name}
                value={selectedRoles}
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
                onClick={handleOpenRoleDialog}
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
              <IntlMessages id="user.userGroup" />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                multiple
                id="customer-outlined"
                readOnly
                options={
                  loadingUsersGroup
                    ? []
                    : usersGroup?.map((item) => {
                        item.Code, item.Name, item.id;
                      })
                }
                getOptionLabel={(option) => option?.Name}
                value={selectedUserGroup}
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
                onClick={handleOpenDialog}
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
            <LoadingButton
              sx={{
                position: "relative",
                minWidth: 100,
              }}
              color="primary"
              variant="contained"
              type="submit"
              startIcon={<SaveIcon />}
              disabled={isEdit}
            >
              <IntlMessages id="common.save" />
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>

      <AppSelectItemDialog
        title={messages["sidebar.ecommerce.customers"]}
        urlCreate={"/UserGroup/Create"}
        multipleSelect={false}
        isOpen={isOpenDialog}
        handleDialogClose={handleCloseDialog}
        setSelectedItem={setSelectedUserGroup}
        selectedEdit={selectedUserGroup}
        itemList={usersGroup}
        loading={loadingUsersGroup}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        onSearch={onSearchUser}
        getData={getCustomerGroups}
      />

      <AppSelectItemDialog
        title={messages["common.role"]}
        urlCreate={"/Roles/Create"}
        multipleSelect={true}
        isOpen={isOpenRoleDialog}
        handleDialogClose={handleCloseRoleDialog}
        setSelectedItem={setSelectedRoles}
        selectedEdit={selectedRoles}
        itemList={roles}
        loading={loadingRole}
        totalCount={totalCountRole}
        page={pageRole}
        setPage={setPageRole}
        onSearch={onSearchRole}
        getData={getRoles}
      />
    </Form>
  );
};

export default UserForm;

UserForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  selectedUserGroup: PropTypes.array,
  setSelectedUserGroup: PropTypes.func,
  selectedRoles: PropTypes.array,
  setSelectedRoles: PropTypes.func,
};
