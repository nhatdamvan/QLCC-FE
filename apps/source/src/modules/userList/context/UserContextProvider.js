import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const UserContext = createContext();
const UserActionsContext = createContext();

export const useUserContext = () => useContext(UserContext);
export const useUserActionContext = () => useContext(UserActionsContext);

const UserContextProvider = ({ children }) => {
  const [
    { loading: loading, apiData: users, order, orderBy, totalCount, page },
    { onSearch: onSearchUser, handleRequestSort, setPage, getData },
  ] = useGetData("users");

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
