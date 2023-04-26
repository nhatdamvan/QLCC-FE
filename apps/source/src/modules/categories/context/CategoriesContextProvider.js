import { createContext, useContext } from "react";
import PropTypes from "prop-types";
import { useGetData } from "@crema/hooks/APIHooks";

const CategoryContext = createContext();
const CategoryAcctionContext = createContext();

export const useCategoryContext = () => useContext(CategoryContext);
export const useCategoryActionContext = () =>
  useContext(CategoryAcctionContext);

const CategoriesContextProvider = ({ children }) => {
  const [
    { loading: loading, apiData: category, order, orderBy, totalCount, page },
    { onSearch: onSearchCategory, handleRequestSort, setPage, getData },
  ] = useGetData("categories");

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
          handleRequestSort,
          setPage,
          getData,
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
