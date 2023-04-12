import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, FormControlLabel, Grid, LinearProgress } from "@mui/material";
import { Form } from "formik";
import PropTypes from "prop-types";
import { useIntl } from "react-intl";
import { styled } from "@mui/material/styles";
import ReactQuill from "react-quill";
import UploadModern from "libs/modules/src/lib/thirdParty/reactDropzone/components/UploadModern";
import AppList from "@crema/components/AppList";
import FileRow from "libs/modules/src/lib/thirdParty/reactDropzone/components/FileRow";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import jwtAxios from "@crema/services/auth/JWT";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

import "react-quill/dist/quill.snow.css";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";

const ReactQuillWrapper = styled(ReactQuill)(() => {
  return {
    "& .ql-toolbar": {
      borderRadius: "8px 8px 0 0",
    },
    "& .ql-container": {
      borderRadius: "0 0 8px 8px",
      minHeight: 150,
      maxHeight: 200,
    },
  };
});

const EmailTemplateForm = ({ values, setFieldValue, loadingSubmit }) => {
  const { messages } = useIntl();
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);
  const dropzone = useDropzone({ noClick: isEdit });

  const [uploadedFiles, setUploadedFiles] = useState(
    values.Files.map((item) => {
      return {
        id: item.id,
        path: item.filename,
        size: item.length,
      };
    })
  );
  const [loadingUploadFile, setLoadingUploadingFile] = useState(false);

  useEffect(() => {
    if (dropzone.acceptedFiles.length) {
      handleUploadFile(dropzone.acceptedFiles);
    }
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    const newFiles = uploadedFiles;
    newFiles.splice(uploadedFiles.indexOf(file), 1);
    setUploadedFiles([...newFiles]);
    setFieldValue("Files", [...newFiles]);
  };

  const handleUploadFile = (files) => {
    setLoadingUploadingFile(true);
    const formData = new FormData();
    files.forEach((item) => {
      formData.append("file", item);
    });

    jwtAxios
      .post("/uploadFile/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setUploadedFiles([...uploadedFiles, ...files]);
        setFieldValue("Files", [
          ...uploadedFiles,
          ...response.data.data.map((item) => ({ id: item })),
        ]);
      })
      .catch((error) => {
        console.log(error, "error");
      })
      .finally(() => {
        setLoadingUploadingFile(false);
      });
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
              <IntlMessages id="common.idEmail" />
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
              <IntlMessages id="email.name" />
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
              <IntlMessages id="email.titleTemplate" />
            </Box>
            <AppTextField
              sx={{
                width: "100%",
              }}
              variant="outlined"
              name="Title"
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
              <IntlMessages id="email.note" />
            </Box>
            <ReactQuillWrapper
              theme="snow"
              name="Content"
              placeholder={messages["common.writeContent"]}
              value={values.Content}
              onChange={(value) => setFieldValue("Content", value)}
              readOnly={isEdit}
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
              <IntlMessages id="common.file" />
            </Box>
            {loadingUploadFile ? (
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
                          isEdit ? () => { } : onDeleteUploadFile
                        }
                      />
                    )}
                  />
                </aside>
              </>
            )}
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
              loading={loadingSubmit}
              startIcon={<SaveIcon />}
              disabled={isEdit}
            >
              <IntlMessages id="common.save" />
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Form>
  );
};

export default EmailTemplateForm;

EmailTemplateForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
  loadingSubmit: PropTypes.bool.isRequired,
};
