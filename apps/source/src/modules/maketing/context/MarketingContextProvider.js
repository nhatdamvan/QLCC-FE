import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const MarketingContext = createContext();
const MarketingActionsContext = createContext();

export const useMarketingContext = () => useContext(MarketingContext);
export const useMarketingActionsContext = () =>
  useContext(MarketingActionsContext);

const MarketingContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [marketings, setMarketings] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ UpdatedDate: -1 });

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
      setLoading(true);
      const dataResult = await jwtAxios.post("campaingnsList", {
        ValueFilter: debouncedSearch,
        Sort: sort,
        PageIndex: page,
        PageSize: 10,
      });
      setTotal(dataResult.data.totalCount);
      setMarketings(dataResult.data.datas);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchMarketing = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

  return (
    <MarketingContext.Provider
      value={{ loading, marketings, total, page, orderBy, order }}
    >
      <MarketingActionsContext.Provider
        value={{
          onSearchMarketing,
          handleRequestSort,
          getData,
          setSort,
          setPage,
        }}
      >
        {children}
      </MarketingActionsContext.Provider>
    </MarketingContext.Provider>
  );
};

export default MarketingContextProvider;

MarketingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
