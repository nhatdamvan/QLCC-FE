import React from 'react';
import { Grid } from '@mui/material';
import AppGridContainer from '@crema/components/AppGridContainer';
import AppAnimate from '@crema/components/AppAnimate';
import { useGetDataApi } from '@crema/hooks/APIHooks';
import {
  Deals,
  MonthlyEarning,
  QuickStats,
  TicketSupport,
} from '@crema/modules/dashboards/CRM';
import AppLoader from '@crema/components/AppLoader';

const CRM = () => {
  const [{ apiData: crmData, loading }] = useGetDataApi('/dashboard/crm');

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <AppAnimate animation='transition.slideUpIn' delay={200}>
          <AppGridContainer>
            <Grid  marginLeft={30} item xs={12} md={10}>
              <QuickStats quickStatsData={crmData.quickStatsData} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Deals dealsTableData={crmData.dealsTableData} />
            </Grid>
            <Grid item xs={12} md={4}>
              <MonthlyEarning earningGraphData={crmData.earningGraphData} />
            </Grid>
            <Grid item xs={12} md={7}>
              <TicketSupport ticketSupportData={crmData.ticketSupportData} />
            </Grid>
          </AppGridContainer>
        </AppAnimate>
      )}
    </>
  );
};

export default CRM;
