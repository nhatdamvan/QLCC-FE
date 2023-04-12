import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppAnimate from "@crema/components/AppAnimate";
import { Fonts } from "@crema/constants/AppEnums";
import { AccountTabsWrapper } from "@crema/modules/MyProfile";
import jwtAxios from "@crema/services/auth/JWT";
import { useParams } from "react-router-dom";
import PersonalInfo from "./PersonalInfo";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const UserDetail = () => {
  const { id } = useParams();

  const [value, setValue] = React.useState(0);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const dataResult = await jwtAxios.get(`user/${id}`);
        setData(dataResult.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
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
          <IntlMessages id="common.customerDetail" />
        </Box>
      </AppAnimate>
      <AccountTabsWrapper key="2">
        {isLoading ? (
          <></>
        ) : (
          <>
            <AppAnimate animation="transition.slideRightIn" delay={300}>
              <Box className="account-tabs-content">
                {value === 0 && <PersonalInfo user={data} />}
                {/* {value === 1 && <ChangePassword />}
                {value === 2 && <Information />}
                {value === 3 && <Social social={accountData.member} />}
                {value === 4 && <Notification />} */}
              </Box>
            </AppAnimate>
          </>
        )}
      </AccountTabsWrapper>
    </>
  );
};

export default UserDetail;
