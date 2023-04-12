import AppsContainer from "@crema/components/AppsContainer";
import AppsContent from "@crema/components/AppsContent";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

const CustomerSupportDetail = () => {
    const { messages } = useIntl();
    const { id } = useParams();

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <AppsContainer title={messages["common.detail"]}>
            <Box sx={{ minWidth: "260px", width: "100%", typography: "body1", padding: "16px", marginLeft: '10px' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="FACEBOOK" value="1" />
                            <Tab label="SMS" value="2" />
                            <Tab label="ZALO" value="3" />
                            <Tab label="EMAIL" value="4" />
                            <Tab label="FILE" value="5" />
                        </TabList>
                    </Box>
                    <Box sx={{ px: "10px", py: "14px" }}>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                        <TabPanel value="4">Item Four</TabPanel>
                        <TabPanel value="5">Item Five</TabPanel>
                    </Box>
                </TabContext>
            </Box>
        </AppsContainer>
    );
};

export default CustomerSupportDetail;