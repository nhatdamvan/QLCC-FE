import React, { useState } from "react";
import { useIntl } from "react-intl";
import AppsContainer from "@crema/components/AppsContainer";

import ChatContent from "./ChatContent";
import ChatSideBar from "./ChatSideBar";
import ChatContextProvider from "@crema/context/ChatContextProvider";

const Chat = () => {
  const { messages } = useIntl();
  return (
    <ChatContextProvider>
      <AppsContainer
        title={messages["chatApp.chat"].toString()}
        sidebarContent={<ChatSideBar />}
      >
        <ChatContent />
      </AppsContainer>
    </ChatContextProvider>
  );
};

export default Chat;
