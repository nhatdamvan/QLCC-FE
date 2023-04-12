import { Box, Button, Pagination } from "@mui/material";
import AppSearchBar from "@crema/components/AppSearchBar";
import { useIntl } from "react-intl";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  useZaloActionContext,
  useZaloContext,
} from "../../context/ZaloTemplateContextProvider";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";

const ZaloHeader = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  const { totalCount, page } = useZaloContext();
  const { onSearchZalo, setPage } = useZaloActionContext();

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
        onChange={onSearchZalo}
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
          onClick={() => navigate("/ZaloTemplate/Create")}
        >
          <IntlMessages id="scrumboard.addNew" />
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

export default ZaloHeader;
