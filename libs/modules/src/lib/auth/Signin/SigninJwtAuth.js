import React, { useState } from "react";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { Checkbox, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useAuthMethod } from "@crema/hooks/AuthHooks";
import * as yup from "yup";
import Grid from "@mui/material/Grid";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import Box from "@mui/material/Box";
import { Fonts } from "@crema/constants/AppEnums";
import AppAnimate from "@crema/components/AppAnimate";
import AppTextField from "@crema/components/AppTextField";
import { ReactComponent as Logo } from "../../../assets/user/login.svg";
import { ReactComponent as Logo1 } from "../../../assets/icon/IC2Logo1.svg";
import { LoadingButton } from "@mui/lab";
import AppInfoView from "@crema/components/AppInfoView";

const validationSchema = yup.object({
  email: yup
    .string()
    // .email(<IntlMessages id="validation.emailFormat" />)
    .required(<IntlMessages id="validation.emailRequired" />),
  password: yup
    .string()
    .required(<IntlMessages id="validation.passwordRequired" />),
});

const SigninJwtAuth = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signInUser } = useAuthMethod();

  const [loadingLogin, setLoadlingLogin] = useState(false);

  const onGoToForgetPassword = () => {
    navigate("/forget-password", { tab: "jwtAuth" });
  };

  const { messages } = useIntl();
  return (
    <AppAnimate animation="transition.slideUpIn" delay={200}>
      <Box
        sx={{
          pb: 6,
          py: { xl: 8 },
          display: "flex",
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 1024,
            width: "100%",
            padding: 8,
            paddingLeft: { xs: 8, md: 2 },
            overflow: "hidden",
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Grid container spacing={5}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                width: "100%",
                height: "100%",
                textAlign: "center",
                "& svg": {
                  width: "70%",
                  height: "100%",
                  display: "inline-block",
                  paddingRight: { xs: 0, lg: 10 },
                },
              }}
            >
              <Logo1 fill={theme.palette.primary.main} />
              <Logo fill={theme.palette.primary.main} />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                textAlign: "center",
              }}
            >
              <Box
                sx={{
                  mb: { xs: 3, xl: 4 },
                  fontWeight: Fonts.BOLD,
                  fontSize: 20,
                }}
              >
                <IntlMessages id="common.login" />
              </Box>

              <Formik
                validateOnChange={true}
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(data) => {
                  setLoadlingLogin(true);
                  signInUser({
                    email: data.email,
                    password: data.password,
                  });
                  setLoadlingLogin(false);
                }}
              >
                {() => (
                  <Form
                    sx={{
                      textAlign: "left",
                      marginBottom: { xs: 4, lg: 6, xl: 12 },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <Box
                        component="h6"
                        sx={{
                          fontSize: 14,
                          fontWeight: Fonts.SEMI_BOLD,
                          textAlign: "left",
                        }}
                      >
                        <IntlMessages id="common.username" />
                      </Box>
                      <AppTextField
                        placeholder={messages["common.username"]}
                        name="email"
                        autoComplete="new-password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box sx={{ mb: { xs: 5, xl: 8 } }}>
                      <Box
                        component="h6"
                        sx={{
                          fontSize: 14,
                          fontWeight: Fonts.SEMI_BOLD,
                          textAlign: "left",
                        }}
                      >
                        <IntlMessages id="common.password" />
                      </Box>
                      <AppTextField
                        type="password"
                        placeholder={messages["common.password"]}
                        autoComplete="new-password"
                        name="password"
                        variant="outlined"
                        sx={{
                          width: "100%",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        mb: { xs: 3, xl: 4 },
                        display: "flex",
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { sm: "center" },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Box
                          sx={{
                            ml: -3,
                          }}
                        >
                          <Checkbox />
                        </Box>
                        <Box
                          component="span"
                          sx={{
                            fontSize: 14,
                          }}
                        >
                          <IntlMessages id="common.rememberMe" />
                        </Box>
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          cursor: "pointer",
                          ml: { xs: 0, sm: "auto" },
                          mt: { xs: 2, sm: 0 },
                          color: "primary.main",
                          fontWeight: Fonts.BOLD,
                          fontSize: 14,
                        }}
                      >
                        <IntlMessages id="common.forgetPassword" />
                      </Box>
                    </Box>
                    {loadingLogin ? (
                      <LoadingButton
                        sx={{
                          position: "relative",
                          height: 44,
                          width: "100%",
                        }}
                        variant="contained"
                        loading={true}
                      >
                        <IntlMessages id="common.saveChanges" />
                      </LoadingButton>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        sx={{
                          width: "100%",
                          height: 44,
                        }}
                      >
                        <IntlMessages id="common.login" />
                      </Button>
                    )}
                  </Form>
                )}
              </Formik>
              <Box
                sx={{
                  mt: { xs: 3, xl: 4 },
                  mb: 3,
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: { sm: "center" },
                  alignItems: { sm: "center" },
                }}
              ></Box>
            </Grid>
          </Grid>
        </Card>
        <AppInfoView />
      </Box>
    </AppAnimate>
  );
};

export default SigninJwtAuth;
