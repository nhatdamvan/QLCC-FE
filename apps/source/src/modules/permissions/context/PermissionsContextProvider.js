import { createContext, useContext } from "react";
import PropTypes from "prop-types";

import { useGetData } from "@crema/hooks/APIHooks";

const PermissionsContext = createContext();
const PermissionsAcctionContext = createContext();

export const usePermissionsContext = () => useContext(PermissionsContext);
export const usePermissionsActionContext = () =>
  useContext(PermissionsAcctionContext);

const PermissionsContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: permissions,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchEmail, handleRequestSort, setPage, getData },
  ] = useGetData("permissions");

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
