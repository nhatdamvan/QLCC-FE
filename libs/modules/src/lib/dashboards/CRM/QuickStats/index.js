// import React from 'react';
import Grid from '@mui/material/Grid/index';
import StatsCard from './StatsCard';
import IntlMessages from '@crema/helpers/IntlMessages';

import PropTypes from 'prop-types';

const QuickStats = ({ quickStatsData }) => {
  return (
    <>
      <Grid container spacing={{ md:1 }}>
        <Grid item xs={6} sm={4}>
          <StatsCard
            icon={'/assets/images/dashboard/total-clients.svg'}
            data={quickStatsData.clientsData}
            heading={<IntlMessages id="dashboard.totalClients" />}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatsCard
            icon={'/assets/images/dashboard/invoices.svg'}
            data={quickStatsData.invoiceData}
            heading={<IntlMessages id="dashboard.paidInvoices" />}
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <StatsCard
            icon={'/assets/images/dashboard/total-projects.svg'}
            data={quickStatsData.totalProjectsData}
            heading={<IntlMessages id="dashboard.totalProjects" />}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default QuickStats;

QuickStats.defaultProps = {
  quickStatsData: null,
};

QuickStats.propTypes = {
  quickStatsData: PropTypes.object,
};
