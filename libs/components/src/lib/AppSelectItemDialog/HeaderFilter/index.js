import { Box, Button, Pagination } from "@mui/material";

import { useIntl } from "react-intl";
import AppSearchBar from "@crema/components/AppSearchBar";
import PropTypes from "prop-types";
import IntlMessages from "@crema/helpers/IntlMessages";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";

const HeaderFilter = ({ totalCount, page, onSearch, setPage, urlCreate }) => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  const onPageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: 1,
        mb: 2,
      }}
    >
      <AppSearchBar
        iconPosition="right"
        overlap={false}
        onChange={onSearch}
        placeholder={messages["common.searchHere"]}
      />
      <Box display="flex">
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() =>
            window.open(urlCreate, "_blank", "noopener,noreferrer")
          }
        >
          <IntlMessages id="scrumboard.addNew" />
        </Button>
        <Pagination
          count={Math.ceil(totalCount / 6)}
          page={page}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Box>
    </Box>
  );
};

export default HeaderFilter;

HeaderFilter.propTypes = {
  totalCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onSearch: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  urlCreate: PropTypes.string.isRequired,
};
