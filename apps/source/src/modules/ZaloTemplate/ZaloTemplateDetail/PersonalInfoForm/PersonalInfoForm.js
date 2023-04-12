import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useDropzone } from "react-dropzone";
import { Form } from "formik";
import PropTypes from "prop-types";
import AppTextField from "@crema/components/AppTextField";
import { styled } from "@mui/material/styles";
import { Fonts } from "@crema/constants/AppEnums";
import ReactQuill from "react-quill";
import { useIntl } from "react-intl";
import UploadModern from "libs/modules/src/lib/thirdParty/reactDropzone/components/UploadModern";
import AppList from "@crema/components/AppList";
import FileRow from "libs/modules/src/lib/thirdParty/reactDropzone/components/FileRow";
import jwtAxios from "@crema/services/auth/JWT";

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

const PersonalInfoForm = ({ values, setFieldValue }) => {
  const { messages } = useIntl();

  const dropzone = useDropzone();
  const [uploadedFiles, setUploadedFiles] = useState(
    values.Files.map((item) => {
      return {
        id: item.id,
        path: item.filename,
        size: item.length,
      };
    })
  );

  useEffect(() => {
    if (dropzone.acceptedFiles.length) {
      handleUploadFile(dropzone.acceptedFiles);
    }
  }, [dropzone.acceptedFiles]);

  const onDeleteUploadFile = (file) => {
    const newFiles = uploadedFiles
    newFiles.splice(uploadedFiles.indexOf(file), 1);
    setUploadedFiles([...newFiles]);
  };

  const handleUploadFile = (files) => {
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
        setFieldValue("Files", [...uploadedFiles.map(item => item.id), ...response.data.data]);
      })
      .catch((error) => {
        console.log(error, "error");
      });
  };

  return (
    <Form noValidate autoComplete="off">
      <Typography
        component="h3"
        sx={{
          fontSize: 30,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="common.personalInform" />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 5, lg: 6 },
        }}
      >
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {values.Name}
          </Typography>
        </Box>
      </Box>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={4}>
          <AppTextField
            name="Name"
            fullWidth
            label={<IntlMessages id="common.template.name" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            fullWidth
            name="Code"
            label={<IntlMessages id="common.template.code" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            name="Title"
            fullWidth
            label={<IntlMessages id="common.template.title" />}
          />
        </Grid>
        <Grid item xs={50} md={12}>
          <Box
            sx={{
              mb: 3,
            }}
          >
            <ReactQuillWrapper
              theme="snow"
              name="Content"
              placeholder={messages["common.template.content"]}
              value={values.Content}
              onChange={(value) => setFieldValue("Content", value)}
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box sx={{ position: "relative" }}>
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
                    onDeleteUploadFile={onDeleteUploadFile}
                  />
                )}
              />
            </aside>
          </Box>
        </Grid>

        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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
            >
              <IntlMessages id="common.saveChanges" />
            </Button>
          </Box>
        </Grid>
      </AppGridContainer>
    </Form>
  );
};

export default PersonalInfoForm;
PersonalInfoForm.propTypes = {
  setFieldValue: PropTypes.func,
  values: PropTypes.object,
};
