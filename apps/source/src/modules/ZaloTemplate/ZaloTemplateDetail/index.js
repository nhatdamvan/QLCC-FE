import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/helpers/IntlMessages";
import { BiUser } from "react-icons/bi";
import AppAnimate from "@crema/components/AppAnimate";
import { Fonts } from "@crema/constants/AppEnums";
import { AccountTabsWrapper } from "@crema/modules/MyProfile";
import jwtAxios from "@crema/services/auth/JWT";
import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfoForm";
const ZaloTemplateDetail = () => {
  const { id } = useParams();

  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const dataResult = await jwtAxios.get(`zaloTemplate/${id}`);
      setData(dataResult.data.data);
      setIsLoading(false);
    };
    getData();
  }, []);

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
          <IntlMessages id="common.templateDetail" />
        </Box>
      </AppAnimate>
      <AccountTabsWrapper key="2">
        {isLoading ? (
          <></>
        ) : (
          <>
            <AppAnimate animation="transition.slideRightIn" delay={300}>
              <Box className="account-tabs-content">
                {value === 0 && <PersonalInfo zaloTeamplate={data} />}
              </Box>
            </AppAnimate>
          </>
        )}
      </AccountTabsWrapper>
    </>
  );
};

export default ZaloTemplateDetail;
