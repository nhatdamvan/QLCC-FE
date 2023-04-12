import { Fonts } from "@crema/constants";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Pagination } from "@mui/material";
import PropTypes from "prop-types";

const CustomerSupportHeader = ({ title, total, page, setPage }) => {
  const onPageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: 1,
        marginTop: "8px",
        marginBottom: "8px",
      }}
    >
      <Box
        component="h2"
        variant="h2"
        sx={{
          fontSize: 18,
          color: "text.primary",
          fontWeight: Fonts.SEMI_BOLD,
          marginLeft: "12px",
        }}
      >
        <IntlMessages id={title} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          ml: "auto",
        }}
      >
        <Pagination
          count={Math.ceil(total / 5)}
          page={page}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Box>
    </Box>
  );
};

export default CustomerSupportHeader;

CustomerSupportHeader.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
  // onSelectContactsForDelete: PropTypes.func.isRequired,
};
