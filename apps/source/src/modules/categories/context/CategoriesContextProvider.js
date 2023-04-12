import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import jwtAxios from "@crema/services/auth/JWT";
import { useDebounce } from "@crema/hooks";

const CategoryContext = createContext();
const CategoryAcctionContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);
export const useCategoryActionContext = () => useContext(CategoryAcctionContext);

const CategoriesContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearchQuery] = useState("");

  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState("asc");

  const [sort, setSort] = useState({ Name: 1 });

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
    const dataResult = await jwtAxios.post("categories", {
      ValueFilter: debouncedSearch,
      Sort: sort,
      PageIndex: page,
      PageSize: 10,
    });
    setTotalCount(dataResult.data.totalCount);
    setCategory(dataResult.data.datas);

    setLoading(false);
  };

  const onSearchCategory = (e) => {
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
    <CategoryContext.Provider
      value={{
        loading,
        category,
        order,
        orderBy,
        totalCount,
        page,
      }}
    >
      <CategoryAcctionContext.Provider
        value={{
          onSearchCategory,
          setSort,
          handleRequestSort,
          setPage,
          getData
        }}
      >
        {children}
      </CategoryAcctionContext.Provider>
    </CategoryContext.Provider>
  );
};

export default CategoriesContextProvider;

CategoriesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
