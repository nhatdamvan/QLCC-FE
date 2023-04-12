import { Box, Button , Pagination  } from "@mui/material";
import AppSearchBar from "@crema/components/AppSearchBar";
import { useIntl } from "react-intl";
import IntlMessages from "@crema/helpers/IntlMessages";

import {
  useUserGroupActionContext,
  useUserGroupContext,
} from "../../context/UserGroupContextProvider";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

const UserGroupHeader = () => {
  const { messages } = useIntl();
  const navigate = useNavigate();
  const { totalCount, page } = useUserGroupContext();
  const { onSearchUserGroup, setPage } = useUserGroupActionContext();
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
        onChange={onSearchUserGroup}
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
            navigate("/UserGroup/Create");
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

export default UserGroupHeader;
