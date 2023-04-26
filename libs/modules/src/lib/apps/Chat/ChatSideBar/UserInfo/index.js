import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { Fonts } from "@crema/constants/AppEnums";

const getUrlImage = (id) => process.env.NX_API_FILE + id;

const UserInfo = ({ user, showStatus }) => {
  if (!user) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
      className="user-info"
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        {user.SenderInfo?.avatar || user.photoURL ? (
          <Avatar
            sx={{
              height: 44,
              width: 44,
              fontSize: 24,
            }}
            src={user.SenderInfo?.avatar || getUrlImage(user.photoURL)}
          />
        ) : (
          <Avatar
            sx={{
              height: 44,
              width: 44,
              fontSize: 24,
            }}
          >
            {user.SenderInfo?.display_name.charAt(0).toUpperCase()}
          </Avatar>
        )}
      </Box>
      <Box
        sx={{
          ml: 3.5,
        }}
      >
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            fontSize: 14,
            fontWeight: Fonts.MEDIUM,
          }}
        >
          {user.SenderInfo?.display_name || user.displayName || "Người dùng"}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserInfo;

UserInfo.propTypes = {
  user: PropTypes.object.isRequired,
  showStatus: PropTypes.bool,
};
