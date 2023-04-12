import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const PermissionsContext = createContext();
const PermissionsAcctionContext = createContext();

export const usePermissionsContext = () => useContext(PermissionsContext);
export const usePermissionsActionContext = () =>
  useContext(PermissionsAcctionContext);

const PermissionsContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [permissions, setPermissions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ Name: 1 });

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
    const dataResult = await jwtAxios.post("permissions", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setPermissions(dataResult.data.datas);

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
    <PermissionsContext.Provider
      value={{
        loading,
        permissions,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <PermissionsAcctionContext.Provider
        value={{
          onSearchEmail,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </PermissionsAcctionContext.Provider>
    </PermissionsContext.Provider>
  );
};

export default PermissionsContextProvider;

PermissionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
