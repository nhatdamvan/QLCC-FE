import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const CustomerContext = createContext();
const CustomerActionsContext = createContext();

export const useCustomerContext = () => useContext(CustomerContext);
export const useCustomerActionContext = () =>
  useContext(CustomerActionsContext);

const CustomerContextProvider = ({ children }) => {
  const [
    {
      loading: isLoading,
      apiData: customers,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchCustomer, handleRequestSort, setPage, getData },
  ] = useGetData("customers");

  return (
    <CustomerContext.Provider
      value={{
        isLoading,
        customers,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <CustomerActionsContext.Provider
        value={{
          onSearchCustomer,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </CustomerActionsContext.Provider>
    </CustomerContext.Provider>
  );
};

export default CustomerContextProvider;

CustomerContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
