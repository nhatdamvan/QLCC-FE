import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const MarketingContext = createContext();
const MarketingActionsContext = createContext();

export const useMarketingContext = () => useContext(MarketingContext);
export const useMarketingActionsContext = () =>
  useContext(MarketingActionsContext);

const MarketingContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: marketings,
      order,
      orderBy,
      totalCount: total,
      page,
    },
    { onSearch: onSearchMarketing, handleRequestSort, setPage, getData },
  ] = useGetData("campaingnsList");

  return (
    <MarketingContext.Provider
      value={{ loading, marketings, total, page, orderBy, order }}
    >
      <MarketingActionsContext.Provider
        value={{
          onSearchMarketing,
          handleRequestSort,
          getData,
          setPage,
        }}
      >
        {children}
      </MarketingActionsContext.Provider>
    </MarketingContext.Provider>
  );
};

export default MarketingContextProvider;

MarketingContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
