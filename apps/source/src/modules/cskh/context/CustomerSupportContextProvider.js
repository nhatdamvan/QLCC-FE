import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";

const CustomerSupportContext = createContext();
const CustomerSupportActionsContext = createContext();

export const useCustomerSupportContext = () =>
  useContext(CustomerSupportContext);
export const useCustomerSupportActionsContext = () =>
  useContext(CustomerSupportActionsContext);

const CustomerSupportContextProvider = ({ children }) => {
  const [loadingPending, setLoadingPending] = useState(false);
  const [pendings, setPendings] = useState([]);
  const [totalPendings, setTotalPendings] = useState(0);
  const [pagePending, setPagePending] = useState(1);
  const [orderByPending, setOrderByPending] = useState("");
  const [orderPending, setOrderPending] = useState("asc");
  const [sortPending, setSortPending] = useState({ UpdatedDate: -1 });

  const [loadingProgress, setLoadingProgress] = useState(false);
  const [progress, setProgress] = useState([]);
  const [totalProgress, setTotalProgress] = useState(0);
  const [pageProgress, setPageProgress] = useState(1);
  const [orderByProgress, setOrderByProgress] = useState("");
  const [orderProgress, setOrderProgress] = useState("asc");
  const [sortProgress, setSortProgress] = useState({ UpdatedDate: -1 });

  const [loadingCompleted, setLoadingCompleted] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [pageCompleted, setPageCompleted] = useState(1);
  const [orderByCompleted, setOrderByCompleted] = useState("");
  const [orderCompleted, setOrderCompleted] = useState("asc");
  const [sortCompleted, setSortCompleted] = useState({ UpdatedDate: -1 });

  useEffect(() => {
    getPendings();
  }, [pagePending, sortPending]);

  useEffect(() => {
    getProgress();
  }, [pageProgress, sortProgress]);

  useEffect(() => {
    getCompleted();
  }, [pageCompleted, sortCompleted]);

  useEffect(() => {
    if (orderByPending) {
      setSortPending({
        [orderByPending]: orderPending === "desc" ? -1 : 1,
      });
    }
  }, [orderByPending, orderPending]);

  useEffect(() => {
    if (orderByProgress) {
      setSortProgress({
        [orderByProgress]: orderProgress === "desc" ? -1 : 1,
      });
    }
  }, [orderByProgress, orderProgress]);

  useEffect(() => {
    if (orderByCompleted) {
      setSortCompleted({
        [orderByCompleted]: orderCompleted === "desc" ? -1 : 1,
      });
    }
  }, [orderByCompleted, orderCompleted]);

  const getPendings = async () => {
    try {
      setLoadingPending(true);
      const dataResult = await jwtAxios.post("ticketRequests", {
        ValueFilter: "wait",
        Sort: sortPending,
        PageIndex: pagePending,
        PageSize: 5,
      });
      setTotalPendings(dataResult.data.totalCount);
      setPendings(dataResult.data.datas);
      setLoadingPending(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProgress = async () => {
    try {
      setLoadingProgress(true);
      const dataResult = await jwtAxios.post("ticketRequests", {
        ValueFilter: "inprogress",
        Sort: sortProgress,
        PageIndex: pageProgress,
        PageSize: 5,
      });
      setTotalProgress(dataResult.data.totalCount);
      setProgress(dataResult.data.datas);
      setLoadingProgress(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCompleted = async () => {
    try {
      setLoadingCompleted(true);
      const dataResult = await jwtAxios.post("ticketRequests", {
        ValueFilter: "done",
        Sort: sortCompleted,
        PageIndex: pageCompleted,
        PageSize: 5,
      });
      setTotalCompleted(dataResult.data.totalCount);
      setCompleted(dataResult.data.datas);
      setLoadingCompleted(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = () => {
    getPendings();
    getProgress();
    getCompleted();
  };

  const handleSortPending = (event, property) => {
    const isAsc = orderByPending === property && orderPending === "asc";
    setOrderPending(isAsc ? "desc" : "asc");
    setOrderByPending(property);
    setPagePending(1);
  };

  const handleSortProgress = (event, property) => {
    const isAsc = orderByProgress === property && orderProgress === "asc";
    setOrderProgress(isAsc ? "desc" : "asc");
    setOrderByProgress(property);
    setPage(1);
  };

  const handleSortCompleted = (event, property) => {
    const isAsc = orderByCompleted === property && orderCompleted === "asc";
    setOrderCompleted(isAsc ? "desc" : "asc");
    setOrderByCompleted(property);
    setPage(1);
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
