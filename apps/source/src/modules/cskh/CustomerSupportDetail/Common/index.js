import AppTextField from "@crema/components/AppTextField";
import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Button, Grid } from "@mui/material";
import { Form, Formik } from "formik";
import PropTypes from "prop-types";
import PhoneIcon from "@mui/icons-material/Phone";

const Common = ({ data, loading }) => {
  return (
    <>
      {loading ? (
        ""
      ) : (
        <Grid container spacing={3}>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Tiêu đề:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>
                {data.RequestTitle}
              </Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Trạng thái:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>
                {data.StatusTicketCode}
              </Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Mức độ ưu tiên:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>
                {data.Priority ? "Ưu tiên" : "Không"}
              </Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Kênh tiếp nhận:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>
                {data.ChannelRequestCode}
              </Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Người xử lý:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.AsignUserId}</Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Người liên hệ:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.Name}</Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Ngày tạo:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.CreatedDate}</Box>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Số điện thoại liên hệ:
              </Box>
            </Grid>
            <Grid display="flex" alignItems="center" item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.Phonenumber}</Box>
              <Button
                size="small"
                color="error"
                variant="contained"
                sx={{ ml: 3 }}
              >
                <PhoneIcon />
              </Button>
            </Grid>
          </>
          <>
            <Grid display="flex" alignItems="center" item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Email:
              </Box>
            </Grid>
            <Grid display="flex" alignItems="center" item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.Email}</Box>
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{ ml: 3 }}
              >
                Liên hệ
              </Button>
            </Grid>
          </>
          <>
            <Grid item xs={4}>
              <Box
                sx={{
                  color: "text.secondary",
                  pr: 2,
                  height: "31px",
                }}
              >
                Địa chỉ:
              </Box>
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ fontWeight: Fonts.SEMI_BOLD }}>{data.Address}</Box>
            </Grid>
          </>
        </Grid>
      )}

      <Formik>
        {({ values, setFieldValue }) => (
          <Form noValidate autoComplete="off">
            <Box
              sx={{
                px: 5,
                mx: -5,
              }}
            >
              <Box
                component="h6"
                sx={{
                  mt: 4,
                  mb: { xs: 0.5, xl: 1 },
                  fontSize: 14,
                  fontWeight: Fonts.SEMI_BOLD,
                }}
              >
                Nội dung
              </Box>

              <div>
                <AppTextField
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                  name="Content"
                />
              </div>
            </Box>

            <Box
              sx={{
                px: 5,
                mx: -5,
              }}
            >
              <Box
                component="h6"
                sx={{
                  mt: 4,
                  mb: { xs: 0.5, xl: 1 },
                  fontSize: 14,
                  fontWeight: Fonts.SEMI_BOLD,
                }}
              >
                Phương án xử lý
              </Box>

              <div>
                <AppTextField
                  sx={{
                    width: "100%",
                  }}
                  variant="outlined"
                  name="plan"
                />
              </div>
            </Box>

            <Box
              sx={{
                pt: 4,
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
              >
                <IntlMessages id="common.save" />
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default Common;

Common.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};
