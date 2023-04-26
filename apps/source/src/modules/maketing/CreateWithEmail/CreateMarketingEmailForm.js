import AppGridContainer from "@crema/components/AppGridContainer";
import AppInfoView from "@crema/components/AppInfoView";
import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Form } from "formik";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
  useCustomerGroupActionContext,
  useCustomerGroupContext,
} from "../../customerGroup/Context/CustomerGroupContexProvider";
import {
  useCustomerActionContext,
  useCustomerContext,
} from "../../customerList/context/CustomerContextProvider";
import AppSelectItemDialog from "@crema/components/AppSelectItemDialog";
import { useIntl } from "react-intl";
import { getData, postData } from "@crema/hooks/APIHooks";
import UploadModern from "libs/modules/src/lib/thirdParty/reactDropzone/components/UploadModern";
import { useDropzone } from "react-dropzone";
import AppList from "@crema/components/AppList";
import FileRow from "libs/modules/src/lib/thirdParty/reactDropzone/components/FileRow";
import jwtAxios from "@crema/services/auth/JWT";

const CreateMarketingEmailForm = ({
  values,
  setFieldValue,
  typeSourceData,
  templates,
  setSelectedCustomer,
  selectedCustomer,
  selectedCustomerGroup,
  setSelectedCustomerGroup,
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

  const {
    customers,
    isLoading: loadingCustomer,
    totalCount: totalCountCustomer,
    page: pageCustomer,
  } = useCustomerContext();
  const {
    onSearchCustomer,
    setPage: setPageCustomer,
    getData: getCustomers,
  } = useCustomerActionContext();
  const { loading } = useInfoViewContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [isOpenDialogGroup, setIsOpenGroupDialog] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState(
    values.FileExcelImport
      ? [
          {
            id: values.FileExcelImport.id,
            path: values.FileExcelImport.filename,
            size: values.FileExcelImport.length,
          },
        ]
      : []
  );
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const dropzone = useDropzone({
    noClick: isEdit,
    multiple: false,
    accept: { "text/csv": [".csv", ".xlsx", ".xls"] },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (dropzone.acceptedFiles.length) {
      handleUploadFile(dropzone.acceptedFiles);
    }
  }, [dropzone.acceptedFiles]);

  const handleOpenDialog = () => {
    setIsOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setIsOpenDialog(false);
  };

  const handleOpenGroupDialog = () => {
    setIsOpenGroupDialog(true);
  };

  const handleCloseGroupDialog = () => {
    setIsOpenGroupDialog(false);
  };

  const handlePreview = () => {
    postData("sendPreview", infoViewActionsContext, {
      TemplateId: values.TempalteEmailId,
      TypeCampaingnsCode: values.TypeCampaingnsCode,
    })
      .then(({ message }) => {
        infoViewActionsContext.showMessage(message);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleChange = (event) => {
    setIsEdit(!event.target.checked);
  };

  const handleUploadFile = async (file) => {
    setUploadedFiles(dropzone.acceptedFiles);
    const formData = new FormData();
    formData.append("file", file[0]);

    postData(`uploadFile/zaloFile`, infoViewActionsContext, formData, false, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setFieldValue("FileExcelImport", data[0]);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
  };

  const handleDownload = () => {
    jwtAxios
      .get(`downloadFileTemplateCustomer`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template_import_customer.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <Form noValidate autoComplete="off" style={{ padding: "20px 48px" }}>
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
      <AppGridContainer spacing={4}>
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
              <IntlMessages id="marketing.codeCampaign" />
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
              <IntlMessages id="marketing.nameCampaign" />
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
            component="h6"
            sx={{
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            <IntlMessages id="marketing.startDate" />
          </Box>
          <DateTimePicker
            autoOk
            format="YYYY/MM/DD"
            variant="inline"
            inputVariant="outlined"
            name="StartDate"
            value={values.StartDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
            onChange={(value) => setFieldValue("StartDate", value)}
            disabled={isEdit}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            component="h6"
            sx={{
              fontSize: 14,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          >
            <IntlMessages id="marketing.endDate" />
          </Box>
          <DateTimePicker
            autoOk
            format="YYYY/MM/DD"
            variant="inline"
            inputVariant="outlined"
            name="EndDate"
            value={values.EndDate}
            renderInput={(params) => <TextField fullWidth {...params} />}
            onChange={(value) => setFieldValue("EndDate", value)}
            disabled={isEdit}
          />
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
              <IntlMessages id="marketing.template" />
            </Box>

            <Select
              name="Sex"
              onChange={(event) =>
                setFieldValue("TempalteEmailId", event.target.value)
              }
              sx={{
                width: "100%",
              }}
              defaultValue={values.TempalteEmailId}
              disabled={isEdit}
            >
              {templates.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <FormControl fullWidth>
            <Box
              component="h6"
              sx={{
                fontSize: 14,
                fontWeight: Fonts.SEMI_BOLD,
              }}
            >
              <IntlMessages id="marketing.object" />
            </Box>
            <Select
              name="Sex"
              onChange={(event) =>
                setFieldValue("TypeSourceDataCode", event.target.value)
              }
              sx={{
                width: "100%",
              }}
              defaultValue={values.TypeSourceDataCode}
              disabled={isEdit}
            >
              {typeSourceData.map((item) => (
                <MenuItem key={item.Code} value={item.Code}>
                  {item.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {values.TypeSourceDataCode === "crmsource" ? (
          <>
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
                  <IntlMessages id="sidebar.ecommerce.customers" />
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
                      loadingCustomer
                        ? []
                        : customers?.map((item) => {
                            item.Code, item.Name, item.id;
                          })
                    }
                    getOptionLabel={(option) => option.Name}
                    value={selectedCustomer}
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
                    getOptionLabel={(option) => option.Name}
                    value={selectedCustomerGroup}
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
          </>
        ) : (
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
                <IntlMessages id="common.file" />
              </Box>
              {loading ? (
                <LinearProgress color="inherit" />
              ) : (
                <>
                  <UploadModern
                    uploadText="Drag n drop some files here, or click to select files"
                    dropzone={dropzone}
                  />
                  <aside>
                    <AppList
                      data={uploadedFiles}
                      renderRow={(file, index) => (
                        <FileRow
                          key={index + file.path}
                          file={file}
                          onDeleteUploadFile={
                            isEdit ? () => {} : onDeleteUploadFile
                          }
                        />
                      )}
                    />
                  </aside>
                </>
              )}
            </Box>
          </Grid>
        )}

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              pt: 4,
              mx: -1,
              textAlign: "left",
            }}
          >
            {values.TypeSourceDataCode === "crmsource" ? (
              <></>
            ) : (
              <LoadingButton
                sx={{
                  position: "relative",
                  minWidth: 100,
                  m: 4,
                }}
                color="primary"
                variant="contained"
                disabled={isEdit}
                onClick={handleDownload}
              >
                <IntlMessages id="common.downloadTemplate" />
              </LoadingButton>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
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
                m: 4,
              }}
              variant="contained"
              color="secondary"
              onClick={handlePreview}
              disabled={isEdit}
              startIcon={<SaveIcon />}
            >
              <IntlMessages id="common.preview" />
            </LoadingButton>

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
      </AppGridContainer>

      <AppSelectItemDialog
        title={messages["sidebar.ecommerce.customers"]}
        urlCreate={"/Customer/Create"}
        multipleSelect={true}
        isOpen={isOpenDialog}
        handleDialogClose={handleCloseDialog}
        setSelectedItem={setSelectedCustomer}
        selectedEdit={selectedCustomer}
        itemList={customers}
        loading={loadingCustomer}
        totalCount={totalCountCustomer}
        page={pageCustomer}
        setPage={setPageCustomer}
        onSearch={onSearchCustomer}
        getData={getCustomers}
      />

      <AppSelectItemDialog
        title={messages["sidebar.pages.userList.customergroup"]}
        urlCreate={"/CustomerGroup/Create"}
        multipleSelect={true}
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

      <AppInfoView />
    </Form>
  );
};

export default CreateMarketingEmailForm;

CreateMarketingEmailForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
  typeSourceData: PropTypes.array,
  loading: PropTypes.bool,
  templates: PropTypes.array,
  selectedCustomer: PropTypes.array,
  setSelectedCustomer: PropTypes.func,
  selectedCustomerGroup: PropTypes.array,
  setSelectedCustomerGroup: PropTypes.func,
};
