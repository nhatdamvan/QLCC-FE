import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const CustomerGroupContext = createContext();
const CustomerGroupAcctionContext = createContext();

export const useCustomerGroupContext = () => useContext(CustomerGroupContext);
export const useCustomerGroupActionContext = () =>
  useContext(CustomerGroupAcctionContext);

const CustomerGroupContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [customerGroup, setCustomerGroup] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ UpdatedDate: -1 });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
    if (orderBy) {
      setSort({
        [orderBy]: order === "desc" ? -1 : 1,
      });
    }
  }, [orderBy, order]);

  const getData = async () => {
    setLoading(true);
    const dataResult = await jwtAxios.post("customerGroups", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setCustomerGroup(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchEmail = (e) => {
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
    <CustomerGroupContext.Provider
      value={{
        loading,
        customerGroup,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <CustomerGroupAcctionContext.Provider
        value={{
          onSearchEmail,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </CustomerGroupAcctionContext.Provider>
    </CustomerGroupContext.Provider>
  );
};

export default CustomerGroupContextProvider;

CustomerGroupContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
