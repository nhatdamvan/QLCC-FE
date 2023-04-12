import { Box, Button, Pagination } from "@mui/material";
import AppSearchBar from "@crema/components/AppSearchBar";
import { useIntl } from "react-intl";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  useCategoryActionContext,
  useCategoryContext,
} from "../../context/CategoriesContextProvider";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const CategoryHeader = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const { totalCount, page } = useCategoryContext();
  const { onSearchCategory, setPage } = useCategoryActionContext();
  const onPageChange = (event, value) => {
    setPage(+value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 1,
      }}
    >
      <AppSearchBar
        iconPosition="right"
        overlap={false}
        onChange={onSearchCategory}
        placeholder={messages["common.searchHere"]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          ml: "auto",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => {
            navigate("/Category/Create");
          }}
        >
          <IntlMessages id="category.createCategory" />
        </Button>
        <Pagination
          count={Math.ceil(totalCount / 10)}
          page={page}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Box>
    </Box>
  );
};

export default CategoryHeader;
