import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const ZaloContext = createContext();
const ZaloTemplateContext = createContext();

export const useZaloContext = () => useContext(ZaloContext);
export const useZaloActionContext = () => useContext(ZaloTemplateContext);

const ZaloTemplateContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [zaloTemplates, setZaloTemplates] = useState({});
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
    const dataResult = await jwtAxios.post("zaloTemplates", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setZaloTemplates(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchZalo = (e) => {
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
    <ZaloContext.Provider
      value={{
        loading,
        zaloTemplates,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <ZaloTemplateContext.Provider
        value={{
          onSearchZalo,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </ZaloTemplateContext.Provider>
    </ZaloContext.Provider>
  );
};

export default ZaloTemplateContextProvider;

ZaloTemplateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
