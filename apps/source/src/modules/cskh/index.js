import AppInfoView from "@crema/components/AppInfoView";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, Button, Zoom } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomerSupportContextProvider from "./context/CustomerSupportContextProvider";
import CustomerSupportListing from "./CustomerSupportLising";
import AddIcon from "@mui/icons-material/Add";
import UserContextProvider from "../userList/context/UserContextProvider";

const CustomerSupport = () => {
  const navigate = useNavigate();

  const handleAddContactOpen = () => {
    navigate("/cskh/Create");
  };

  return (
    <UserContextProvider>
      <CustomerSupportContextProvider>
        <Box
          sx={{
            pb: 2.5,
            textAlign: "right",
          }}
        >
          <Zoom in style={{ transitionDelay: "300ms" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                padding: "8px 28px",
                borderRadius: 8,
                "& .MuiSvgIcon-root": {
                  fontSize: 26,
                },
              }}
              startIcon={<AddIcon />}
              onClick={handleAddContactOpen}
            >
              <IntlMessages id="scrumboard.addNew" />
            </Button>
          </Zoom>
        </Box>

        <CustomerSupportListing />
        <AppInfoView />
      </CustomerSupportContextProvider>
    </UserContextProvider>
  );
};

export default CustomerSupport;
