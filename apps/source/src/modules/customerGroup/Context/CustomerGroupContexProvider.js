import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const CustomerGroupContext = createContext();
const CustomerGroupAcctionContext = createContext();

export const useCustomerGroupContext = () => useContext(CustomerGroupContext);
export const useCustomerGroupActionContext = () =>
  useContext(CustomerGroupAcctionContext);

const CustomerGroupContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: customerGroup,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchEmail, handleRequestSort, setPage, getData },
  ] = useGetData("customerGroups");

  return (
    <CustomerGroupContext.Provider
      value={{
        loading,
        customerGroup,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <CustomerGroupAcctionContext.Provider
        value={{
          onSearchEmail,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </CustomerGroupAcctionContext.Provider>
    </CustomerGroupContext.Provider>
  );
};

export default CustomerGroupContextProvider;

CustomerGroupContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
