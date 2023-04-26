import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const CustomerSupportContext = createContext();
const CustomerSupportActionsContext = createContext();

export const useCustomerSupportContext = () =>
  useContext(CustomerSupportContext);
export const useCustomerSupportActionsContext = () =>
  useContext(CustomerSupportActionsContext);

const CustomerSupportContextProvider = ({ children }) => {
  const [
    {
      loading: loadingPending,
      apiData: pendings,
      order: orderPending,
      orderBy: orderByPending,
      totalCount: totalPendings,
      page: pagePending,
    },
    {
      getData: getPendings,
      handleRequestSort: handleSortPending,
      setPage: setPagePending,
    },
  ] = useGetData("ticketRequests", "wait");

  const [
    {
      loading: loadingProgress,
      apiData: progress,
      order: orderProgress,
      orderBy: orderByProgress,
      totalCount: totalProgress,
      page: pageProgress,
    },
    {
      getData: getProgress,
      handleRequestSort: handleSortProgress,
      setPage: setPageProgress,
    },
  ] = useGetData("ticketRequests", "inprogress");

  const [
    {
      loading: loadingCompleted,
      apiData: completed,
      order: orderCompleted,
      orderBy: orderByCompleted,
      totalCount: totalCompleted,
      page: pageCompleted,
    },
    {
      getData: getCompleted,
      handleRequestSort: handleSortCompleted,
      setPage: setPageCompleted,
    },
  ] = useGetData("ticketRequests", "done");

  const getData = () => {
    getPendings();
    getProgress();
    getCompleted();
  };

  return (
    <CustomerSupportContext.Provider
      value={{
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
      }}
    >
      <CustomerSupportActionsContext.Provider
        value={{
          setPagePending,
          setPageProgress,
          setPageCompleted,
          handleSortPending,
          handleSortProgress,
          handleSortCompleted,
          getData,
        }}
      >
        {children}
      </CustomerSupportActionsContext.Provider>
    </CustomerSupportContext.Provider>
  );
};

export default CustomerSupportContextProvider;

CustomerSupportContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
