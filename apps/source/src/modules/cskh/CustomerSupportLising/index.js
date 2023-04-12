import AppGridContainer from "@crema/components/AppGridContainer";
import { Card, Grid } from "@mui/material";
import {
  useCustomerSupportActionsContext,
  useCustomerSupportContext,
} from "../context/CustomerSupportContextProvider";
import CustomerSupportHeader from "./CustomerSupportHeader";
import CustomerSupportView from "./CustomerSupportView";

const CustomerSupportListing = () => {
  const {
    pendings,
    loadingPending,
    totalPendings,
    pagePending,
    progress,
    loadingProgress,
    totalProgress,
    pageProgress,
    completed,
    loadingCompleted,
    totalCompleted,
    pageCompleted,
    orderByPending,
    orderPending,
    orderByProgress,
    orderProgress,
    orderByCompleted,
    orderCompleted,
  } = useCustomerSupportContext();

  const {
    setPagePending,
    setPageProgress,
    setPageCompleted,
    handleSortPending,
    handleSortProgress,
    handleSortCompleted,
  } = useCustomerSupportActionsContext();

  return (
    <AppGridContainer>
      <Grid item xs={12}>
        <Card>
          <CustomerSupportHeader
            title="common.pending"
            total={totalPendings}
            page={pagePending}
            setPage={setPagePending}
          />
          <CustomerSupportView
            list={pendings}
            loading={loadingPending}
            order={orderPending}
            orderBy={orderByPending}
            handleRequestSort={handleSortPending}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CustomerSupportHeader
            title="dashboard.inProgress"
            total={totalProgress}
            page={pageProgress}
            setPage={setPageProgress}
          />
          <CustomerSupportView
            list={progress}
            loading={loadingProgress}
            order={orderProgress}
            orderBy={orderByProgress}
            handleRequestSort={handleSortProgress}
          />
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CustomerSupportHeader
            title="common.approved"
            total={totalCompleted}
            page={pageCompleted}
            setPage={setPageCompleted}
          />
          <CustomerSupportView
            list={completed}
            loading={loadingCompleted}
            order={orderCompleted}
            orderBy={orderByCompleted}
            handleRequestSort={handleSortCompleted}
          />
        </Card>
      </Grid>
    </AppGridContainer>
  );
};

export default CustomerSupportListing;
