import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const ZaloContext = createContext();
const ZaloTemplateContext = createContext();

export const useZaloContext = () => useContext(ZaloContext);
export const useZaloActionContext = () => useContext(ZaloTemplateContext);

const ZaloTemplateContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: zaloTemplates,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchZalo, handleRequestSort, setPage, getData },
  ] = useGetData("zaloTemplates");

  return (
    <ZaloContext.Provider
      value={{
        loading,
        zaloTemplates,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <ZaloTemplateContext.Provider
        value={{
          onSearchZalo,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </ZaloTemplateContext.Provider>
    </ZaloContext.Provider>
  );
};

export default ZaloTemplateContextProvider;

ZaloTemplateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
