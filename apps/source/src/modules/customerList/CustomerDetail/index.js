import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/helpers/IntlMessages";
import { BiUser } from "react-icons/bi";
import AppAnimate from "@crema/components/AppAnimate";
import { Fonts } from "@crema/constants/AppEnums";
import { AccountTabsWrapper } from "@crema/modules/MyProfile";
import { useNavigate } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { AiOutlineLock } from "react-icons/ai";
import AppInfoView from "@crema/components/AppInfoView";
import AppTooltip from "@crema/components/AppTooltip";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CreateCustomer from "../CreateCustomer";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const tabs = [
  { id: 1, icon: <BiUser />, name: <IntlMessages id="common.personalInfo" /> },
  {
    id: 2,
    icon: <AiOutlineLock />,
    name: <IntlMessages id="common.contactInfo" />,
  },
  {
    id: 3,
    icon: <IoMdInformationCircleOutline />,
    name: <IntlMessages id="common.billInfo" />,
  },
];

const CustomerDetail = () => {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(0);

  const onTabsChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppAnimate animation="transition.slideDownIn" delay={300}>
        <Box
          component="h2"
          variant="h2"
          sx={{
            fontSize: 16,
            color: "text.primary",
            fontWeight: Fonts.SEMI_BOLD,
            mb: {
              xs: 2,
              lg: 4,
            },
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
            }}
            component="span"
            mr={{ xs: 2, sm: 4 }}
            display="flex"
            onClick={() => navigate(-1)}
          >
            <AppTooltip title={<IntlMessages id="common.back" />}>
              <ArrowBackIcon
                sx={{
                  color: "text.secondary",
                  mr: 2,
                }}
              />
            </AppTooltip>
          </Box>
        </Box>
      </AppAnimate>
      <AccountTabsWrapper key="2">
        <>
          <AppAnimate animation="transition.slideLeftIn" delay={300}>
            <Tabs
              className="account-tabs"
              value={value}
              onChange={onTabsChange}
              aria-label="basic tabs example"
              orientation="vertical"
            >
              {tabs.map((tab, index) => (
                <Tab
                  className="account-tab"
                  label={tab.name}
                  icon={tab.icon}
                  key={index}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </AppAnimate>
          <AppAnimate animation="transition.slideRightIn" delay={300}>
            <Box className="account-tabs-content">
              {value === 0 && <CreateCustomer />}
              {/* {value === 1 && <ChangePassword />}
                {value === 2 && <Information />}
                {value === 3 && <Social social={accountData.member} />}
                {value === 4 && <Notification />} */}
            </Box>
          </AppAnimate>
        </>
      </AccountTabsWrapper>
      <AppInfoView />
    </>
  );
};

export default CustomerDetail;
