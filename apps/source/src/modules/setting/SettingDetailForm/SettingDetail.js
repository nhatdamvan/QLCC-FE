import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import { Form } from "formik";
import { BsFacebook } from "react-icons/bs";
import { FaSms } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { AiFillMail } from "react-icons/ai";
import { MdAutorenew } from "react-icons/md";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTextField from "@crema/components/AppTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Grid,
  IconButton,
  Button,
  InputAdornment,
  Tab,
} from "@mui/material";

const SettingDetailForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Form autoComplete="off">
      <Box
        sx={{
          height: "960px",
          minWidth: "260px",
          width: "100%",
          typography: "body1",
          padding: "16px",
          marginLeft: "10px",
        }}
      >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab icon={<AiFillMail />} label="EMAIL" value="1" />
              <Tab icon={<FaSms />} label="SMS" value="2" />
              <Tab icon={<SiZalo />} label="ZALO" value="3" />
              <Tab icon={<MdAutorenew />} label="CRONJOB" value="4" />
              <Tab icon={<BsFacebook />} label="FACEBOOK" value="5" />
            </TabList>
          </Box>
          <Box sx={{ px: "10px", py: "10px" }}>
            <TabPanel value="1">
              <Grid container p="30px" spacing={5}>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.EMAIL_FROM_NAME" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_FROM_NAME"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_FROM" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_FROM"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_FROM_PASS" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      type={showPassword ? "text" : "password"}
                      name="EMAIL_FROM_PASS"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={onShowPassword}
                              onMouseDown={onDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_HOST" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_HOST"
                      autoFocus
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.EMAIL_PORT" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_PORT"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_HOST_IMAP" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_HOST_IMAP"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_PORT_IMAP" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_PORT_IMAP"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.EMAIL_PREVIEW" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="EMAIL_PREVIEW"
                      autoFocus
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container p="30px" spacing={5}>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.SMS_HOST" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_HOST"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_CLIENT_ID" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_CLIENT_ID"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_SECRET" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_SECRET"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_BRANDNAME" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_BRANDNAME"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_API_TOKEN" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_API_TOKEN"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_API_PUSH_SMS_INTERNAL" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_API_PUSH_SMS_INTERNAL"
                      autoFocus
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.SMS_API_PUSH_SMS_INTERNALTIONAL" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_API_PUSH_SMS_INTERNALTIONAL"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_API_CREATE_CAMPAIGN" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_API_CREATE_CAMPAIGN"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_API_PUSH_SMS_CAMPAIGN" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_API_PUSH_SMS_CAMPAIGN"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_SCOPE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_SCOPE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_SERVER_REQUEST" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_SERVER_REQUEST"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.SMS_PREVIEW" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="SMS_PREVIEW"
                      autoFocus
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="3">
              <Grid container p="30px" spacing={5}>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.ZALO_HOST_OAUTH" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_HOST_OAUTH"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_HOST_API" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_HOST_API"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_APP_ID" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_APP_ID"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_APP_SECRET" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_APP_SECRET"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_APP_REFRESH_TOKEN" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_APP_REFRESH_TOKEN"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_SEND_SMS" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_SEND_SMS"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_UPLOAD_IMAGE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_UPLOAD_IMAGE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_ARTICLE_CREATE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_ARTICLE_CREATE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_GET_CONVERSATION" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_GET_CONVERSATION"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_UPLOAD_FILE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_UPLOAD_FILE"
                      autoFocus
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={6}>
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
                      <IntlMessages id="setting.ZALO_API_ARTICLE_UPDATE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_ARTICLE_UPDATE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_ARTICLE_REMOVE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_ARTICLE_REMOVE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_ARTICLE_GET_ID" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_ARTICLE_GET_ID"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_ARTICLE_GET_ID" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_ARTICLE_GET_ID"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_API_GET_FOLLOWERS" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_API_GET_FOLLOWERS"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.ZALO_PREVIEW" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="ZALO_PREVIEW"
                      autoFocus
                    />
                  </Box>
                  <Box sx={{ px: 5, mx: -5, py: 2 }}>
                    <Box
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: Fonts.SEMI_BOLD }}
                    >
                      <IntlMessages id="setting.ZALO_API_GET_TOKEN" />
                    </Box>
                    <AppTextField
                      sx={{ width: "100%" }}
                      variant="outlined"
                      name="ZALO_API_GET_TOKEN"
                      autoFocus
                    />
                  </Box>
                  <Box sx={{ px: 5, mx: -5, py: 2 }}>
                    <Box
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: Fonts.SEMI_BOLD }}
                    >
                      <IntlMessages id="setting.ZALO_API_GET_INFO_OA" />
                    </Box>
                    <AppTextField
                      sx={{ width: "100%" }}
                      variant="outlined"
                      name="ZALO_API_GET_INFO_OA"
                      autoFocus
                    />
                  </Box>
                  <Box sx={{ px: 5, mx: -5, py: 2 }}>
                    <Box
                      component="h6"
                      sx={{ fontSize: 14, fontWeight: Fonts.SEMI_BOLD }}
                    >
                      <IntlMessages id="setting.ZALO_API_GET_FOLLOWERS_PROFILE" />
                    </Box>
                    <AppTextField
                      sx={{ width: "100%" }}
                      variant="outlined"
                      name="ZALO_API_GET_FOLLOWERS_PROFILE"
                      autoFocus
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="4">
              <Grid container p="30px" spacing={5}>
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
                      <IntlMessages id="setting.CRONJOBS_HOST" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="CRONJOBS_HOST"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.CRONJOBS_API_DELETE" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="CRONJOBS_API_DELETE"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.CRONJOBS_API_SENDEMAIL" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="CRONJOBS_API_SENDEMAIL"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.CRONJOBS_API_SENDSMS" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="CRONJOBS_API_SENDSMS"
                      autoFocus
                    />
                  </Box>
                  <Box
                    sx={{
                      px: 5,
                      mx: -5,
                      py: 2,
                    }}
                  >
                    <Box
                      component="h6"
                      sx={{
                        fontSize: 14,
                        fontWeight: Fonts.SEMI_BOLD,
                      }}
                    >
                      <IntlMessages id="setting.CRONJOBS_API_SENDZALO" />
                    </Box>
                    <AppTextField
                      sx={{
                        width: "100%",
                      }}
                      variant="outlined"
                      name="CRONJOBS_API_SENDZALO"
                      autoFocus
                    />
                  </Box>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="5">COMMING SOON</TabPanel>
          </Box>
        </TabContext>
      </Box>
      {/* </AppsContainer> */}
      <Grid item xs={6} md={6}>
        <Box
          sx={{
            pb: 5,
            px: 15,
            mx: -1,
            textAlign: "right",
          }}
        >
          <Button
            sx={{
              position: "relative",
              minWidth: 100,
            }}
            color="primary"
            variant="outlined"
            type="submit"
            startIcon={<SaveIcon />}
          >
            <IntlMessages id="common.save" />
          </Button>
        </Box>
      </Grid>
    </Form>
  );
};

export default SettingDetailForm;
