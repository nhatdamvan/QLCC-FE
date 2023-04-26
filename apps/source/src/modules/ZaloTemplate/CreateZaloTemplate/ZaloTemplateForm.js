import "react-quill/dist/quill.snow.css";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import { styled } from "@mui/material/styles";
import { useIntl } from "react-intl";
import { Form } from "formik";
import { Box, FormControlLabel, Grid, LinearProgress } from "@mui/material";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Fonts } from "@crema/constants";
import AppTextField from "@crema/components/AppTextField";
import { LoadingButton } from "@mui/lab";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import UploadModern from "libs/modules/src/lib/thirdParty/reactDropzone/components/UploadModern";
import AppGrid from "@crema/components/AppGrid";
import PreviewThumb from "libs/modules/src/lib/thirdParty/reactDropzone/components/PreviewThumb";
import SaveIcon from "@mui/icons-material/Save";
import { Android12Switch } from "libs/modules/src/lib/muiComponents/inputs/Switches/Customization";
import { postData } from "@crema/hooks/APIHooks";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";

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

const ZaloTemplateForm = ({ values, setFieldValue }) => {
  const { messages } = useIntl();
  const { loading } = useInfoViewContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [uploadedFiles, setUploadedFiles] = useState(
    values.Files
      ? [
          {
            id: values.Files.id,
            path: values.Files.filename,
            size: values.Files.length,
            preview: `https://crmic2-dev.vercel.app/file/${values.Files.id}`,
          },
        ]
      : []
  );
  const [isEdit, setIsEdit] = useState(values?.id ? true : false);

  const dropzone = useDropzone({
    noClick: isEdit,
    multiple: false,
    accept: {
      "image/png": [".png", ".jpeg", ".jpg"],
    },
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

  const onDeleteUploadFile = (file) => {
    dropzone.acceptedFiles.splice(dropzone.acceptedFiles.indexOf(file), 1);
    setUploadedFiles([...dropzone.acceptedFiles]);
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
        setFieldValue("Files", data[0]);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    postData(`uploadFileImageZalo`, infoViewActionsContext, formData, false, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ data }) => {
        setFieldValue("Image", data[0]);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
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
              <IntlMessages id="zalo.name" />
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
              <IntlMessages id="zalo.note" />
            </Box>
            <ReactQuillWrapper
              theme="snow"
              placeholder={messages["common.writeContent"]}
              value={values.Content}
              onChange={(value) => setFieldValue("Content", value)}
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
              <IntlMessages id="common.file" />
            </Box>
            {loading ? (
              <LinearProgress color="inherit" />
            ) : (
              <>
                <UploadModern
                  uploadText="Drag n drop a file here, or click to select files"
                  dropzone={dropzone}
                  readOnly={isEdit}
                />
              </>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          {loading || !uploadedFiles[0]?.path ? (
            <></>
          ) : (
            <AppGrid
              sx={{
                maxWidth: 500,
                pt: 6,
              }}
              data={uploadedFiles}
              column={4}
              itemPadding={5}
              renderRow={(file, index) => (
                <PreviewThumb
                  file={file}
                  onDeleteUploadFile={isEdit ? () => {} : onDeleteUploadFile}
                  key={index + file.path}
                />
              )}
            />
          )}
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
    </Form>
  );
};

export default ZaloTemplateForm;

ZaloTemplateForm.propTypes = {
  values: PropTypes.object.isRequired,
  setFieldValue: PropTypes.func,
};
