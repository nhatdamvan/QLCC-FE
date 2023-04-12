import { Box, Button, Pagination } from "@mui/material";
import AppSearchBar from "@crema/components/AppSearchBar";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import { useState } from "react";
import {
  useCustomerActionContext,
  useCustomerContext,
} from "../../context/CustomerContextProvider";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const CustomerHeader = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();

  const { totalCount, page } = useCustomerContext();
  const { onSearchCustomer, setPage } = useCustomerActionContext();

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
      }}
    >
      <AppSearchBar
        iconPosition="right"
        overlap={false}
        onChange={onSearchCustomer}
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
            navigate("/Customer/Create");
          }}
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

export default CustomerHeader;
