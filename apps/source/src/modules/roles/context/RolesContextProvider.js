import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const RolesContext = createContext();
const RolesAcctionContext = createContext();

export const useRolesContext = () => useContext(RolesContext);
export const useRolesActionContext = () => useContext(RolesAcctionContext);

const RolesContextProvider = ({ children }) => {
  const [
    { loading: loading, apiData: roles, order, orderBy, totalCount, page },
    { onSearch: onSearchEmail, handleRequestSort, setPage, getData },
  ] = useGetData("roles");

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
