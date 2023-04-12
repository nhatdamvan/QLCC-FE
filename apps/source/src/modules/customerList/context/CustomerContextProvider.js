import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const CustomerContext = createContext();
const CustomerActionsContext = createContext();

export const useCustomerContext = () => useContext(CustomerContext);
export const useCustomerActionContext = () =>
  useContext(CustomerActionsContext);

const CustomerContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ Name: 1 });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    getData();
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
    if (orderBy) {
      setSort({
        [orderBy]: order === "desc" ? -1 : 1,
      });
    }
  }, [orderBy, order]);

  const getData = async () => {
    try {
      setIsLoading(true);
      const dataResult = await jwtAxios.post("customers", {
        ValueFilter: debouncedSearch,
        Sort: sort,
        PageIndex: page,
        PageSize: 10,
      });
      setTotalCount(dataResult.data.totalCount);
      setCustomers(dataResult.data.datas);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchCustomer = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  return (
    <CustomerContext.Provider
      value={{
        isLoading,
        customers,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <CustomerActionsContext.Provider
        value={{
          onSearchCustomer,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </CustomerActionsContext.Provider>
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;

CustomerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
