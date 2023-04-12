import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppAnimate from "@crema/components/AppAnimate";
import { AccountTabsWrapper } from "@crema/modules/MyProfile";
import jwtAxios from "@crema/services/auth/JWT";
import { useParams } from "react-router-dom";
import SettingDetailForm from "./SettingDetailForm";
import AppInfoView from "@crema/components/AppInfoView";
const SettingDetailInfo = () => {
  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const dataResult = await jwtAxios.get(`getDetail`);
      setData(dataResult.data.data);
      setIsLoading(false);
    };
    getData();
  }, []);
  return (
    <>
      <AccountTabsWrapper >
        {isLoading ? (
          <></>
        ) : (
          <>
            <AppAnimate animation="transition.slideRightIn" delay={300}>
              <Box className="account-tabs-content">
                {value === 0 && <SettingDetailForm settingConfig={data} />}
              </Box>
            </AppAnimate>
          </>
        )}
      </AccountTabsWrapper>
      <AppInfoView />
    </>
  );
};

export default SettingDetailInfo;
