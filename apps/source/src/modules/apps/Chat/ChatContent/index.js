import React from "react";
import PropTypes from "prop-types";
import ChatViewContainer from "./ChatViewContainer";
import { NoUserScreen } from "@crema/modules/apps/Chat";

import { styled } from "@mui/material/styles";
import { Fonts } from "@crema/constants/AppEnums";
import {
  useChatActionsContext,
  useChatContext,
} from "@crema/context/ChatContextProvider";

const MessagesScreen = styled("div")(() => {
  return {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  };
});
const ScrollChatNoUser = styled("div")(({ theme }) => {
  return {
    fontSize: 18,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    height: "calc(100vh - 169px) !important",
    fontWeight: Fonts.MEDIUM,
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
    },
    "& .MuiSvgIcon-root": {
      fontSize: "3rem",
      color: "#BDBDBD",
      [theme.breakpoints.up("lg")]: {
        fontSize: "5rem",
      },
    },
  };
});

const ChatContent = () => {
  const { selectedUser, loadingMessageList } = useChatContext();

  return (
    <>
      {selectedUser ? (
        <MessagesScreen>
          <ChatViewContainer
            selectedUser={selectedUser}
            loadingMessageList={loadingMessageList}
          />
        </MessagesScreen>
      ) : (
        <ScrollChatNoUser>
          <NoUserScreen />
        </ScrollChatNoUser>
      )}
    </>
  );
};

export default ChatContent;
ChatContent.propTypes = {};
