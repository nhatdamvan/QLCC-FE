import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const RolesContext = createContext();
const RolesAcctionContext = createContext();

export const useRolesContext = () => useContext(RolesContext);
export const useRolesActionContext = () => useContext(RolesAcctionContext);

const RolesContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
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
    const dataResult = await jwtAxios.post("roles", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setRoles(dataResult.data.datas);

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
    <RolesContext.Provider
      value={{
        loading,
        roles,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <RolesAcctionContext.Provider
        value={{
          onSearchEmail,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </RolesAcctionContext.Provider>
    </RolesContext.Provider>
  );
};

export default RolesContextProvider;

RolesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
