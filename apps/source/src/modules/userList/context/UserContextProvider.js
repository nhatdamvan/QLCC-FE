import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const UserContext = createContext();
const UserActionsContext = createContext();

export const useUserContext = () => useContext(UserContext);
export const useUserActionContext = () => useContext(UserActionsContext);

const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ Username: 1 });

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
    const dataResult = await jwtAxios.post("users", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setUsers(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchUser = (e) => {
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
    <UserContext.Provider
      value={{
        loading,
        users,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <UserActionsContext.Provider
        value={{
          onSearchUser,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </UserActionsContext.Provider>
    </UserContext.Provider>
  );
};

export default UserContextProvider;

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
