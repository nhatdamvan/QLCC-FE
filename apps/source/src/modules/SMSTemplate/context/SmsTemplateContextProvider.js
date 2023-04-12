import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const SmsContext = createContext();
const SmsTemplateContext = createContext();

export const useSmsContext = () => useContext(SmsContext);
export const useSmsActionContext = () => useContext(SmsTemplateContext);

const SmsTemplateContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [smsTemplates, setSmsTemplates] = useState({});
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
    const dataResult = await jwtAxios.post("smsTemplates", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setSmsTemplates(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchSms = (e) => {
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
          setSort,
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
