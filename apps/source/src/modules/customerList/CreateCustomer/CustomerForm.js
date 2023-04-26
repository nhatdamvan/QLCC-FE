import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  alpha,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Form } from "formik";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import {
  useCustomerGroupActionContext,
  useCustomerGroupContext,
} from "../../customerGroup/Context/CustomerGroupContexProvider";
import SaveIcon from "@mui/icons-material/Save";
import AppSelectItemDialog from "@crema/components/AppSelectItemDialog";
import { useIntl } from "react-intl";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";
import { styled } from "@mui/material/styles";
import { useDropzone } from "react-dropzone";
import EditIcon from "@mui/icons-material/Edit";
import { postData } from "@crema/hooks/APIHooks";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";

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

const CustomerForm = ({
  values,
  setFieldValue,
  selectedCustomerGroup,
  setSelectedCustomerGroup,
  listSex,
}) => {
  const { messages } = useIntl();
  const {
    customerGroup,
    loading: loadingGroup,
    totalCount,
    page: pageCustomerGroup,
  } = useCustomerGroupContext();
  const {
    onSearchEmail,
    setPage: setPageCustomerGroup,
    getData: getCustomerGroups,
  } = useCustomerGroupActionContext();
  const { loading } = useInfoViewContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [isOpenDialogGroup, setIsOpenGroupDialog] = useState(false);
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const { getRootProps, getInputProps } = useDropzone({
    noClick: isEdit,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      handleUploadFile(acceptedFiles);
      setFieldValue("AvatarPreview", URL.createObjectURL(acceptedFiles[0]));
    },
  });
  const handleOpenGroupDialog = () => {
    setIsOpenGroupDialog(true);
  };

  const handleCloseGroupDialog = () => {
    setIsOpenGroupDialog(false);
  };

  const handleChange = (event) => {
    setIsEdit(!event.target.checked);
  };

  const handleUploadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file[0]);

    postData(`uploadFile/AvatarFile`, infoViewActionsContext, formData, false, {
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
    <Form autoComplete="off" style={{ padding: "0 20px" }}>
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
              <IntlMessages id="customer.id" />
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
              <IntlMessages id="customer.name" />
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
              <IntlMessages id="customer.email" />
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
              <IntlMessages id="customer.phone" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="PhonenumberFirst"
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
              <IntlMessages id="customer.birthday" />
            </Box>
            <DatePicker
              autoOk
              format="DD/MM/YYYY"
              disableFuture
              variant="inline"
              inputVariant="outlined"
              name="BirthDay"
              value={values.BirthDay}
              renderInput={(params) => <TextField fullWidth {...params} />}
              onChange={(value) => setFieldValue("BirthDay", value)}
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
              <IntlMessages id="customer.sex" />
            </Box>
            <Select
              name="Sex"
              onChange={(event) => setFieldValue("Sex", event.target.value)}
              sx={{
                width: "100%",
              }}
              defaultValue={values.Sex}
              disabled={isEdit}
            >
              {listSex.map((item) => (
                <MenuItem key={item.id} value={item.Code}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
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
              <IntlMessages id="common.cccd" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="CCCD"
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
              <IntlMessages id="common.address" />
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
              <IntlMessages id="customer.facebookId" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Facebook"
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
              <IntlMessages id="customer.zaloId" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Zalo"
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
              <IntlMessages id="sidebar.pages.userList.customergroup" />
            </Box>
            <Box sx={{ display: "flex" }}>
              <Autocomplete
                sx={{
                  width: "100%",
                }}
                multiple
                id="customer-group-outlined"
                readOnly
                options={
                  loadingGroup
                    ? []
                    : customerGroup?.map((item) => {
                        item.Code, item.Name, item.id;
                      })
                }
                getOptionLabel={(option) => option?.Name}
                value={selectedCustomerGroup}
                // onChange={(event, value) => setSelectedCustomerGroup(value)}
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
                onClick={handleOpenGroupDialog}
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
              disabled={isEdit}
              startIcon={<SaveIcon />}
            >
              <IntlMessages id="common.save" />
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>

      <AppSelectItemDialog
        title={messages["sidebar.pages.userList.customergroup"]}
        urlCreate={"/CustomerGroup/Create"}
        multipleSelect={false}
        isOpen={isOpenDialogGroup}
        handleDialogClose={handleCloseGroupDialog}
        setSelectedItem={setSelectedCustomerGroup}
        selectedEdit={selectedCustomerGroup}
        itemList={customerGroup}
        loading={loadingGroup}
        totalCount={totalCount}
        page={pageCustomerGroup}
        setPage={setPageCustomerGroup}
        onSearch={onSearchEmail}
        getData={getCustomerGroups}
      />
    </Form>
  );
};

export default CustomerForm;

CustomerForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  selectedCustomerGroup: PropTypes.array,
  setSelectedCustomerGroup: PropTypes.func,
  listSex: PropTypes.any.isRequired,
};
