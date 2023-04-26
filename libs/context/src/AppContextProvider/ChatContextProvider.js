import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { io } from "socket.io-client";
import { useGetData } from "@crema/hooks/APIHooks";

const ChatContext = createContext();
const ChatActionsContext = createContext();

export const useChatContext = () => useContext(ChatContext);

export const useChatActionsContext = () => useContext(ChatActionsContext);

export const ChatContextProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [lastestMessage, setLastestMessage] = useState([]);

  const [
    { loading: loading, apiData: chats },
    { onSearch, getData, setData: setChats },
  ] = useGetData("getSenderMesssage", "", "TimeStamp", 1, 100);

  const [
    { loading: loadingMessageList, apiData: messageList },
    { getData: getMessageList, setData: setMessageList },
  ] = useGetData("getSenderMesssageDetail", "", "TimeStamp", 1, 100, false);

  function recevieAll(value) {
    console.log(value);
  }

  const recevieOne = (value) => {
    console.log(value);
    setLastestMessage(value.modelDetail);
  };

  useEffect(() => {
    if (selectedUser) {
      getMessageList(selectedUser?.Sender);
    }
  }, [selectedUser]);

  useEffect(() => {
    let socket = io.connect(process.env.NX_URL, {
      query: "token=" + localStorage.getItem("token"),
    });
    socket.on("sendAll", recevieAll);
    socket.on("sendOne", recevieOne);

    console.log(socket, "socket");
    return () => {
      socket.off("sendAll", recevieAll);
      socket.off("sendOne", recevieOne);
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (lastestMessage) {
      resetList(lastestMessage);
      resetInbox(lastestMessage);
    }
  }, [lastestMessage]);

  const resetList = (mes) => {
    try {
      const newChat = chats
        .filter((item) => item.Sender === mes.Sender)
        .map((i) => {
          return {
            ...i,
            MessageLast: mes.Message.text,
          };
        });
      const newList = chats.filter((item) => item.Sender !== mes.Sender);

      setChats([...newChat, ...newList]);
    } catch (error) {
      console.log(error, "error");
    }
  };

  const resetInbox = (mes) => {
    try {
      if (selectedUser?.Sender === mes.Sender) {
        setMessageList([
          ...messageList,
          {
            CreatedDate: mes.CreatedDate,
            IsDeleted: mes.IsDeleted,
            IsSender: mes.IsSender,
            Message: mes.Message,
            MessageZaloId: mes.MessageZaloId,
            Sender: mes.Sender,
            UpdatedDate: mes.UpdatedDate,
            id: mes.id,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        loading,
        selectedUser,
        messageList,
        loadingMessageList,
      }}
    >
      <ChatActionsContext.Provider
        value={{
          getData,
          onSearch,
          setSelectedUser,
          setMessageList,
        }}
      >
        {children}
      </ChatActionsContext.Provider>
    </ChatContext.Provider>
  );
};
export default ChatContextProvider;

ChatContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
