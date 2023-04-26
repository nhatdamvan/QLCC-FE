import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const UserGroupContext = createContext();
const UserGroupActionsContext = createContext();

export const useUserGroupContext = () => useContext(UserGroupContext);
export const useUserGroupActionContext = () =>
  useContext(UserGroupActionsContext);

const UserGroupContextProvider = ({ children }) => {
  const [
    { loading: loading, apiData: usersGroup, order, orderBy, totalCount, page },
    { onSearch: onSearchUser, handleRequestSort, setPage, getData },
  ] = useGetData("userGroups");

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
