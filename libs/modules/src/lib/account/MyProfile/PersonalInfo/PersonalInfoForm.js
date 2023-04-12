import React, { useState } from "react";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import AppGridContainer from "@crema/components/AppGridContainer";
import Grid from "@mui/material/Grid";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useDropzone } from "react-dropzone";
import { Form } from "formik";
import PropTypes from "prop-types";
import AppTextField from "@crema/components/AppTextField";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { Fonts } from "@crema/constants/AppEnums";
import SaveIcon from "@mui/icons-material/Save";
import { LoadingButton } from "@mui/lab";
import jwtAxios from "@crema/services/auth/JWT";

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

const PersonalInfoForm = ({ values, setFieldValue, loadingSubmit }) => {
  const [loadingUploadFile, setLoadingUploadingFile] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      handleUploadFile(acceptedFiles);
      setFieldValue("AvatarPreview", URL.createObjectURL(acceptedFiles[0]));
    },
  });

  const handleUploadFile = async (file) => {
    setLoadingUploadingFile(true);
    const formData = new FormData();
    formData.append("file", file[0]);

    try {
      const response = await jwtAxios.post("/uploadFile/AvatarFile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFieldValue("AvatarFile", response.data.data[0]);
    } catch (error) {
      console.log(error, "error");
    } finally {
      setLoadingUploadingFile(false);
    }
  };

  return (
    <Form autoComplete="off">
      <Typography
        component="h3"
        sx={{
          fontSize: 16,
          fontWeight: Fonts.BOLD,
          mb: { xs: 3, lg: 4 },
        }}
      >
        <IntlMessages id="common.personalInfo" />
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: { xs: 5, lg: 6 },
        }}
      >
        {loadingUploadFile ? (
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
                }}
                src={values.AvatarPreview}
              />
              <Box className="edit-icon">
                <EditIcon />
              </Box>
            </label>
          </AvatarViewWrapper>
        )}
        <Box
          sx={{
            ml: 4,
          }}
        >
          <Typography
            sx={{
              fontWeight: Fonts.MEDIUM,
            }}
          >
            {values.Name}
          </Typography>
          <Typography
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {values.Email}
          </Typography>
        </Box>
      </Box>
      <AppGridContainer spacing={4}>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="Name"
            fullWidth
            label={<IntlMessages id="common.fullName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            fullWidth
            name="Username"
            label={<IntlMessages id="common.userName" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="Email"
            fullWidth
            label={<IntlMessages id="common.email" />}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <AppTextField
            name="Phonenumber"
            fullWidth
            label={<IntlMessages id="common.phone" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
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
            >
              <IntlMessages id="common.save" />
            </LoadingButton>
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
  loadingSubmit: PropTypes.bool.isRequired,
};
