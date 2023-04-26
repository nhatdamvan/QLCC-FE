import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import moment from "moment";
import PropTypes from "prop-types";
import IntlMessages from "@crema/helpers/IntlMessages";
import AppsHeader from "@crema/components/AppsHeader";
import AppsFooter from "@crema/components/AppsFooter";
import { useAuthUser } from "@crema/hooks/AuthHooks";
import SimpleBarReact from "simplebar-react";

import { styled } from "@mui/material/styles";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { MessagesList, SendMessage } from "@crema/modules/apps/Chat";
import UserInfo from "libs/modules/src/lib/apps/Chat/ChatSideBar/UserInfo";
import {
  useChatActionsContext,
  useChatContext,
} from "@crema/context/ChatContextProvider";
import { postData } from "@crema/hooks/APIHooks";

const ScrollbarWrapper = styled(SimpleBarReact)(() => {
  return {
    display: "flex",
    flexDirection: "column",
    height: `calc(100% - 132px)`,
  };
});
const ScrollChatNoMainWrapper = styled("div")(() => {
  return {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  };
});

const ChatViewContainer = ({ selectedUser, loadingMessageList }) => {
  const { messageList } = useChatContext();
  const { setMessageList } = useChatActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const [message, setMessage] = useState("");
  const { user } = useAuthUser();

  let _scrollBarRef = useRef();

  useEffect(() => {
    if (messageList && messageList.length > 0) {
      if (_scrollBarRef?.current) {
        const scrollEl = _scrollBarRef.current.getScrollElement();
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }
  }, [messageList, _scrollBarRef]);

  const sendFileMessage = (fileMessage, type) => {
    const formData = new FormData();
    formData.append("file", fileMessage[0]);

    try {
      let response;
      if (type === "image") {
        postData(
          `uploadFileImageZalo`,
          infoViewActionsContext,
          formData,
          false,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
          .then((res) => {
            response = res;
          })
          .catch((error) => {
            infoViewActionsContext.fetchError(error.message);
          });
      } else {
        postData(`uploadFileZalo`, infoViewActionsContext, formData, false, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            response = res;
          })
          .catch((error) => {
            infoViewActionsContext.fetchError(error.message);
          });
      }

      setMessageList([
        ...messageList,
        {
          CreatedDate: moment().toString(),
          IsDeleted: false,
          IsSender: true,
          Message: {
            attachments: [
              {
                payload: {
                  url: "",
                  name: "",
                  thumbnail: "",
                },
                type: type,
              },
            ],
            msg_id: moment().toString(),
            // todo
          },
          MessageZaloId: data.data.message_id,
          Sender: selectedUser?.Sender,
          UpdatedDate: moment().toString(),
          id: moment().toString(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const submitMes = (message = "", image = "", file = "") => {
    postData(`sendMessageZalo`, infoViewActionsContext, {
      Sender: selectedUser?.Sender,
      QuoteMessageId: "",
      Message: {
        Text: message,
        Image: image,
        Sticker: "",
        File: file,
      },
    })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });

    return null;
  };

  const onSend = (message) => {
    try {
      const { data } = submitMes(message);
      setMessage("");
      setMessageList([
        ...messageList,
        {
          CreatedDate: moment().toString(),
          IsDeleted: false,
          IsSender: true,
          Message: {
            msg_id: data.data.message_id,
            text: message,
          },
          MessageZaloId: data.data.message_id,
          Sender: selectedUser?.Sender,
          UpdatedDate: moment().toString(),
          id: moment().toString(),
        },
      ]);
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    }
  };

  return (
    <Box
      sx={{
        height: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
        "& .apps-header": {
          minHeight: 72,
        },
      }}
    >
      <AppsHeader>
        <UserInfo user={selectedUser} showStatus={true} />

        {/* <Header
          selectedUser={selectedUser}
          deleteConversation={deleteConversation}
        /> */}
      </AppsHeader>

      {messageList && user ? (
        <ScrollbarWrapper ref={_scrollBarRef}>
          {loadingMessageList ? (
            <></>
          ) : (
            <MessagesList
              messageList={messageList}
              authUser={user}
              selectedUser={selectedUser}
            />
          )}
        </ScrollbarWrapper>
      ) : (
        <ScrollChatNoMainWrapper>
          <Box
            component="span"
            sx={{
              fontSize: 18,
              color: "grey.500",
            }}
          >
            <IntlMessages id="chatApp.sayHi" />{" "}
            {selectedUser?.SenderInfo?.display_name}
          </Box>
        </ScrollChatNoMainWrapper>
      )}

      <AppsFooter>
        <SendMessage
          currentMessage={message}
          sendFileMessage={sendFileMessage}
          onSendMessage={onSend}
          setMessageList={setMessageList}
          messageList={messageList}
        />
      </AppsFooter>
    </Box>
  );
};

export default ChatViewContainer;

ChatViewContainer.defaultProps = {};

ChatViewContainer.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  loadingMessageList: PropTypes.bool.isRequired,
};
