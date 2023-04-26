import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const SmsContext = createContext();
const SmsTemplateContext = createContext();

export const useSmsContext = () => useContext(SmsContext);
export const useSmsActionContext = () => useContext(SmsTemplateContext);

const SmsTemplateContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: smsTemplates,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchSms, handleRequestSort, setPage, getData },
  ] = useGetData("smsTemplates");

  return (
    <SmsContext.Provider
      value={{
        loading,
        smsTemplates,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <SmsTemplateContext.Provider
        value={{
          onSearchSms,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </SmsTemplateContext.Provider>
    </SmsContext.Provider>
  );
};

export default SmsTemplateContextProvider;

SmsTemplateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
