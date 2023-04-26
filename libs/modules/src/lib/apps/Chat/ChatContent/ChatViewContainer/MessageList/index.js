import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import SenderMessageItem from "./SenderMessageItem";
import ReceiverMessageItem from "./ReceiverMessageItem";
import AppList from "@crema/components/AppList";

const MessageList = ({ authUser, selectedUser, messageList }) => {
  return (
    <Box
      sx={{
        px: 5,
        py: 6,
      }}
    >
      <AppList
        animation="transition.slideUpIn"
        data={messageList}
        renderRow={(item, index) => {
          if (item.IsSender) {
            return (
              <SenderMessageItem
                authUser={authUser}
                item={item}
                key={item.id}
                isPreviousSender={
                  index > 0 && item.IsSender === messageList[index - 1].IsSender
                }
                isLast={
                  (index + 1 < messageList.length &&
                    item.IsSender !== messageList[index + 1].IsSender) ||
                  index + 1 === messageList.length
                }
              />
            );
          } else {
            return (
              <ReceiverMessageItem
                selectedUser={selectedUser}
                item={item}
                key={item.id}
                isPreviousSender={
                  index > 0 && item.IsSender === messageList[index - 1].IsSender
                }
                isLast={
                  (index + 1 < messageList.length &&
                    item.IsSender !== messageList[index + 1].IsSender) ||
                  index + 1 === messageList.length
                }
              />
            );
          }
        }}
      />
    </Box>
  );
};

export default MessageList;

MessageList.defaultProps = {};

MessageList.propTypes = {
  messageList: PropTypes.array.isRequired,
  authUser: PropTypes.object.isRequired,
  selectedUser: PropTypes.object.isRequired,
};
