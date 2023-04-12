import React, { useEffect, useState } from "react";
import AppDialog from "@crema/components/AppDialog";
import { Box, Button, Grid } from "@mui/material";
import AppGridContainer from "@crema/components/AppGridContainer";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material';
import Fab from '@mui/material/Fab';
const imgEmail = "/assets/icon/gmail.svg";
const imgSMS = "/assets/icon/message.svg";
const imgZalo = "/assets/icon/zalo.svg";


const CreateMaketing = (props) => {
  const { isAddContact, handleAddContactClose } = props;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <AppDialog
      fullHeight
      open={isAddContact}
      maxWidth="md"
      onClose={() => handleAddContactClose()}
      title={
        <Box
          sx={{
            pb: 5,
            px: 5,
            mx: -5,
            mb: 5,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box component="h2"><IntlMessages id="common.maketingCreate" /></Box>
          <Box component="h5"><IntlMessages id="common.maketingMessage" /></Box>
        </Box>
      }
      sxStyle={{
        ".MuiDialogContent-root": {
          height: "200px",
        },
      }}
    >
      <AppGridContainer>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Fab
              sx={{
                position: "relative",
                minWidth: 200,
                minHeight: 150,
                borderRadius: 5,
              }}
              variant="extended"
              color="white"
              aria-label="add"
              onClick={() => {
                navigate("/marketing/email/create");
              }}
            >
              <Box>
                <img style={{ width: "70px", }} src={imgEmail} alt="logo" />
                <Box component="h1">Email</Box>
              </Box>
            </Fab>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
            }}
          >

            <Fab
              sx={{
                position: "relative",
                minWidth: 200,
                minHeight: 150,
                borderRadius: 5,
              }}
              variant="extended"
              color="white"
              aria-label="add"
              onClick={() => {
                navigate("/marketing/sms/create");
              }}
            >
              <Box >
                <img style={{ width: "70px", }} src={imgSMS} alt="logo" />
                <Box component="h1">SMS</Box>
              </Box>
            </Fab>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              textAlign: "center",
            }}
          >
            <Fab
              sx={{
                position: "relative",
                minWidth: 200,
                minHeight: 150,
                borderRadius: 5,
              }}
              variant="extended"
              color="white"
              aria-label="add"
              onClick={() => {
                navigate("/marketing/zalo/create");
              }}
            >
              <Box>
                <img style={{ width: "70px", }} src={imgZalo} alt="logo" />
                <Box component="h1">{" "} Zalo</Box>
              </Box>
            </Fab>
          </Box>
        </Grid>
      </AppGridContainer>
      {/* <Formik>
        <AddMaketing handleAddContactClose={handleAddContactClose} />
      </Formik> */}
    </AppDialog>
  );
};

export default CreateMaketing;
