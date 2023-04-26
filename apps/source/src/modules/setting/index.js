import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AppAnimate from "@crema/components/AppAnimate";
import { AccountTabsWrapper } from "@crema/modules/MyProfile";
import SettingDetailForm from "./SettingDetailForm";
import AppInfoView from "@crema/components/AppInfoView";
import { getData } from "@crema/hooks/APIHooks";
import {
  useInfoViewActionsContext,
  useInfoViewContext,
} from "@crema/context/InfoViewContextProvider";

const SettingDetailInfo = () => {
  const { loading } = useInfoViewContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [data, setData] = useState({});

  useEffect(() => {
    getDataDetail();
  }, []);

  const getDataDetail = () => {
    getData(`getDetail`, infoViewActionsContext)
      .then(({ data }) => {
        setData(data);
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <>
      <AccountTabsWrapper>
        {loading ? (
          <></>
        ) : (
          <>
            <AppAnimate animation="transition.slideRightIn" delay={300}>
              <Box className="account-tabs-content">
                <SettingDetailForm settingConfig={data} />
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
