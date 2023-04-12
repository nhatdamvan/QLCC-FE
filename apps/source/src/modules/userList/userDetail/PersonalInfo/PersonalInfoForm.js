import React from "react";
import { alpha, Box, Button, Typography } from "@mui/material";
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

const PersonalInfoForm = ({ values, setFieldValue, isSubmitting }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFieldValue("avatarShow", URL.createObjectURL(acceptedFiles[0]));

      handleUploadFile(acceptedFiles[0]);
    },
  });

  const handleUploadFile = (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    jwtAxios
      .post("/uploadFile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setFieldValue("AvatarFile", response.data.data[0]);
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
        <AvatarViewWrapper {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <label htmlFor="icon-button-file">
            <Avatar
              sx={{
                width: { xs: 50, lg: 64 },
                height: { xs: 50, lg: 64 },
                cursor: "pointer",
              }}
              src={values?.avatarShow || ""}
            />
            <Box className="edit-icon">
              <EditIcon />
            </Box>
          </label>
        </AvatarViewWrapper>
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
            {values.Username}
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
        <Grid item xs={12} md={4}>
          <AppTextField
            name="Username"
            fullWidth
            label={<IntlMessages id="common.username" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            fullWidth
            name="RolesName"
            label={<IntlMessages id="common.role" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            name="Email"
            fullWidth
            label={<IntlMessages id="common.email" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            name="Phonenumber"
            fullWidth
            label={<IntlMessages id="common.phone" />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AppTextField
            fullWidth
            name="Address"
            label={<IntlMessages id="common.address" />}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {isSubmitting ? (
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
                variant="contained"
                type="submit"
              >
                <IntlMessages id="common.saveChanges" />
              </Button>
            )}
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
  isSubmitting: PropTypes.bool,
};
