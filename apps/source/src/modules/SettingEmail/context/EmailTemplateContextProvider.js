import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const EmailContext = createContext();
const EmailTemplateContext = createContext();

export const useEmailContext = () => useContext(EmailContext);
export const useEmailActionContext = () => useContext(EmailTemplateContext);

const EmailTemplateContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [emailTemplates, setEmailTemplates] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ UpdatedDate: -1 });

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    try {
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedSearch, sort, page]);

  useEffect(() => {
    if (orderBy) {
      setSort({
        [orderBy]: order === "desc" ? -1 : 1,
      });
    }
  }, [orderBy, order]);

  const getData = async () => {
    setLoading(true);
    const dataResult = await jwtAxios.post("emailTemplates", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setEmailTemplates(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchEmail = (e) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(1);
  };

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
          setSort,
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
