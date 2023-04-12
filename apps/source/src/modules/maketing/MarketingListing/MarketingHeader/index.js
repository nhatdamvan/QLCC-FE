import { Box, Button, Pagination } from "@mui/material";
import AppSearchBar from "@crema/components/AppSearchBar";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useIntl } from "react-intl";
import { useState } from "react";
import CreateMaketing from "./CreateMarketing";
import {
  useMarketingActionsContext,
  useMarketingContext,
} from "../../context/MarketingContextProvider";
import AddIcon from "@mui/icons-material/Add";

const MarketingHeader = () => {
  const { messages } = useIntl();

  const { total, page } = useMarketingContext();
  const { onSearchMarketing, setPage } = useMarketingActionsContext();

  const [isAddMarketing, onSetIsAddMarketing] = useState(false);

  const handleAddMarketingOpen = () => {
    onSetIsAddMarketing(true);
  };

  const handleAddMarketingClose = () => {
    onSetIsAddMarketing(false);
  };

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
        onChange={onSearchMarketing}
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
          onClick={handleAddMarketingOpen}
        >
          <IntlMessages id="scrumboard.addNew" />
        </Button>

        <CreateMaketing
          isAddContact={isAddMarketing}
          handleAddContactClose={handleAddMarketingClose}
        />

        <Pagination
          count={Math.ceil(total / 10)}
          page={page}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Box>
    </Box>
  );
};

export default MarketingHeader;
