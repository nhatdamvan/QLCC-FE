import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Card, Tab } from "@mui/material";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
import Common from "./Common";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppTooltip from "@crema/components/AppTooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { getData } from "@crema/hooks/APIHooks";

const CustomerSupportDetail = () => {
  const infoViewActionsContext = useInfoViewActionsContext();
  const navigate = useNavigate();
  const { messages } = useIntl();
  const { id } = useParams();

  const [value, setValue] = useState("1");
  const [data, setData] = useState({});

  useEffect(() => {
    getDataDetail();
  }, []);

  const getDataDetail = () => {
    getData(`ticketRequest/${id}`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          cursor: "pointer",
        }}
        component="span"
        mb={4}
        onClick={() => navigate(-1)}
      >
        <AppTooltip title={<IntlMessages id="common.back" />}>
          <ArrowBackIcon
            sx={{
              color: "text.secondary",
            }}
          />
        </AppTooltip>
      </Box>
      <Card title={messages["common.detail"]}>
        <Box sx={{ width: "100%", typography: "body1", padding: "12px" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Chi tiết" value="1" />
                <Tab label="Lịch sử tương tác" value="2" />
                <Tab label="Lịch sử cập nhật" value="3" />
                <Tab label="Hợp đồng" value="4" />
              </TabList>
            </Box>
            <Box sx={{ px: "10px", py: "14px" }}>
              <TabPanel value="1">
                <Common data={data} />
              </TabPanel>
              <TabPanel value="2">Item Two</TabPanel>
              <TabPanel value="3">Item Three</TabPanel>
              <TabPanel value="4">Item Three</TabPanel>
            </Box>
          </TabContext>
        </Box>
      </Card>
    </>
  );
};

export default CustomerSupportDetail;
