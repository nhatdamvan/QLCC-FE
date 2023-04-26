import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { Zoom } from "@mui/material";
import { useIntl } from "react-intl";
import AppSearchBar from "@crema/components/AppSearchBar";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import { ChatUserInfo } from "@crema/modules/apps/Chat";
import ChatList from "libs/modules/src/lib/apps/Chat/ChatSideBar/ChatTabs/ChatList";
import {
  useChatActionsContext,
  useChatContext,
} from "@crema/context/ChatContextProvider";

const ChatSideBar = () => {
  const { messages } = useIntl();
  const { user } = useAuthUser();
  const { chats, loading, selectedUser } = useChatContext();
  const { setSelectedUser, onSearch } = useChatActionsContext();

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
      }}
    >
      <Zoom in style={{ transitionDelay: "300ms" }}>
        <Box
          sx={{
            px: 5,
            pt: 4,
            pb: 2,
          }}
        >
          <ChatUserInfo user={user} />
        </Box>
      </Zoom>
      <Box
        sx={{
          px: 5,
          pt: 2,
          width: 1,
        }}
      >
        <AppSearchBar
          sx={{
            marginRight: 0,
            width: "100%",
            "& .searchRoot": {
              width: "100%",
            },
            "& .MuiInputBase-input": {
              width: "100%",
              "&:focus": {
                width: "100%",
              },
            },
          }}
          iconPosition="right"
          overlap={false}
          onChange={onSearch}
          placeholder={messages["common.searchHere"]}
        />
      </Box>

      <ChatList
        chatListData={chats}
        loading={loading}
        setSelectedUser={setSelectedUser}
        selectedUser={selectedUser}
      />
    </Box>
  );
};

export default ChatSideBar;

ChatSideBar.propTypes = {};
