import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import clsx from "clsx";
import PropTypes from "prop-types";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import MediaViewer from "@crema/components/AppMedialViewer";
import { alpha, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Fonts } from "@crema/constants/AppEnums";

import { styled } from "@mui/material/styles";
import { getFileSize } from "@crema/helpers";

const ReceiverMessageWrapper = styled("div")(() => {
  return {
    mt: 5.5,
    display: "flex",
    justifyContent: "flex-start",
    "&:last-of-type": {
      marginBottom: 0,
    },
    "&.hideUser-info": {
      position: "relative",
      marginTop: 1,
      "& .message-time, & .message-chat-avatar": {
        display: "none",
      },
      "& .message-chat-sender": {
        marginBottom: 0,
      },
      "& .message-chat-item": {
        marginLeft: 44,
      },
    },
  };
});
const VideoWrapper = styled("div")(({ theme }) => {
  return {
    position: "relative",
    width: 56,
    height: 56,
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: theme.palette.common.black,
    "&:before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      paddingTop: "100%",
    },
    "& video, & iframe, & embed, & object": {
      position: "absolute",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      border: "0 none",
      objectFit: "cover",
    },
  };
});
const MessageChat = styled("div")(({ theme }) => {
  return {
    display: "inline-flex",
    border: `solid 1px ${theme.palette.grey[200]}`,
    borderTopRightRadius: theme.cardRadius,
    borderBottomRightRadius: theme.cardRadius,
    padding: "10px 16px",
    position: "relative",
    fontSize: 14,
    backgroundColor: theme.palette.background.paper,
    "& .download-icon": {
      position: "absolute",
      right: 5,
      bottom: 5,
      zIndex: 1,
    },
    ".last-chat-message &": {
      borderBottomLeftRadius: theme.cardRadius,
    },
  };
});

const showMediaItems = 2;
const getMediaMessage = (item) => {
  if (item.type === "image") {
    return (
      <Box
        sx={{
          position: "relative",
          "& img": {
            objectFit: "cover",
            borderRadius: 1,
            width: 56,
            height: 56,
            display: "block",
          },
        }}
      >
        <img alt="" src={item.payload.thumbnail} />
      </Box>
    );
  } else if (item.type === "video") {
    return (
      <VideoWrapper>
        <video src={item.url} />
        <PlayCircleOutlineIcon
          sx={{
            fontSize: 20,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: (theme) => theme.palette.common.white,
          }}
        />
      </VideoWrapper>
    );
  } else {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <DescriptionOutlinedIcon />
        <Box
          component="p"
          sx={{
            ml: 2,
          }}
        >
          <Box component="span" sx={{ display: "block" }}>
            {item.payload?.name}
          </Box>
          <Box component="span" sx={{ display: "block" }}>
            {getFileSize(item.payload?.size)}
          </Box>
        </Box>
      </Box>
    );
  }
};

const getMessage = (item, setIndex) => {
  if (item.Message?.attachments && item.Message?.attachments?.length > 0) {
    return (
      <Box
        sx={{
          position: "relative",
          display: "inline-block",
          verticalAlign: "top",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            margin: -1,
          }}
        >
          {item.Message?.attachments
            ?.slice(0, showMediaItems)
            .map((data, index) => (
              <Box
                sx={{
                  padding: 1,
                  cursor: "pointer",
                }}
                key={"media-" + index}
                onClick={() => setIndex(index)}
              >
                {getMediaMessage(data)}
              </Box>
            ))}
          {item.Message?.attachments?.length > showMediaItems ? (
            <Box
              sx={{
                padding: 1,
                cursor: "pointer",
              }}
              onClick={() => setIndex(showMediaItems)}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: 1,
                  backgroundColor: (theme) =>
                    alpha(theme.palette.primary.main, 0.15),
                  color: (theme) => theme.palette.primary.main,
                  fontWeight: Fonts.MEDIUM,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +{item.Message?.attachments.length - showMediaItems}
              </Box>
            </Box>
          ) : null}
        </Box>
      </Box>
    );
  } else {
    return <Typography>{item.Message?.text}</Typography>;
  }
};

const ReceiverMessageItem = ({
  selectedUser,
  item,
  isPreviousSender = false,
  isLast,
}) => {
  const [index, setIndex] = useState(-1);

  const onClose = () => {
    setIndex(-1);
  };

  return (
    <ReceiverMessageWrapper
      className={clsx(
        isPreviousSender ? "hideUser-info" : "",
        isLast ? "last-chat-message" : ""
      )}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
        }}
      >
        {selectedUser?.SenderInfo?.avatar ? (
          <Avatar
            sx={{
              width: 34,
              height: 34,
              mr: 2.5,
              mb: 5.5,
            }}
            className="message-chat-avatar"
            src={selectedUser?.SenderInfo?.avatar}
          />
        ) : (
          <Avatar
            sx={{
              width: 34,
              height: 34,
              mr: 2.5,
              mb: 5.5,
            }}
            className="message-chat-avatar"
          >
            {selectedUser?.SenderInfo?.display_name.charAt(0).toUpperCase()}
          </Avatar>
        )}
        <Box
          sx={{
            position: "relative",
          }}
          className="message-chat-item"
        >
          <Box
            component="span"
            sx={{
              fontSize: 12,
              color: (theme) => theme.palette.text.secondary,
              display: "block",
              mb: 1.5,
            }}
            className="message-time"
          >
            {item.CreatedDate}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            <MessageChat>{getMessage(item, setIndex)}</MessageChat>
          </Box>
        </Box>
      </Box>
      <MediaViewer
        index={index}
        medias={item.Message?.attachments}
        onClose={onClose}
      />
    </ReceiverMessageWrapper>
  );
};

export default ReceiverMessageItem;

ReceiverMessageItem.defaultProps = {};

ReceiverMessageItem.propTypes = {
  selectedUser: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  isPreviousSender: PropTypes.bool,
  isLast: PropTypes.bool,
};
