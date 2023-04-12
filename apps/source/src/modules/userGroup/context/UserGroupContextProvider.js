import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const UserGroupContext = createContext();
const UserGroupActionsContext = createContext();

export const useUserGroupContext = () => useContext(UserGroupContext);
export const useUserGroupActionContext = () =>
  useContext(UserGroupActionsContext);

const UserGroupContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [usersGroup, setUsersGroup] = useState([]);
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
    const dataResult = await jwtAxios.post("userGroups", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setUsersGroup(dataResult.data.datas);

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
    <UserGroupContext.Provider
      value={{
        loading,
        usersGroup,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <UserGroupActionsContext.Provider
        value={{
          onSearchUser,
          setSort,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </UserGroupActionsContext.Provider>
    </UserGroupContext.Provider>
  );
};

export default UserGroupContextProvider;

UserGroupContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
