import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const EmailContext = createContext();
const EmailTemplateContext = createContext();

export const useEmailContext = () => useContext(EmailContext);
export const useEmailActionContext = () => useContext(EmailTemplateContext);

const EmailTemplateContextProvider = ({ children }) => {
  const [
    {
      loading: loading,
      apiData: emailTemplates,
      order,
      orderBy,
      totalCount,
      page,
    },
    { onSearch: onSearchEmail, handleRequestSort, setPage, getData },
  ] = useGetData("emailTemplates");

  return (
    <EmailContext.Provider
      value={{
        loading,
        emailTemplates,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <EmailTemplateContext.Provider
        value={{
          onSearchEmail,
          handleRequestSort,
          setPage,
          getData,
        }}
      >
        {children}
      </EmailTemplateContext.Provider>
    </EmailContext.Provider>
  );
};

export default EmailTemplateContextProvider;

EmailTemplateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
