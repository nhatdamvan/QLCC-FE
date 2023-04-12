import styled from "@emotion/styled";
import { Box, Chip, IconButton, TableCell, TableRow } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Fonts, statusCampaingns, TypeCampaingnsCode } from "@crema/constants";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  // display: 'flex',
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));

const imgMessage = "/assets/icon/message.svg";
const imgGmail = "/assets/icon/gmail.svg";
const imgZalo = "/assets/icon/zalo.svg";

const TableItem = ({ data, onSelectContactsForDelete }) => {
  const navigate = useNavigate();

  const labelStatusCampaingn = (status, name) => {
    switch (status) {
      case statusCampaingns.NEW:
        return (
          <Chip
            label={name}
            sx={{
              color: (theme) => theme.palette.marketing.new,
              background: (theme) => theme.palette.marketing.newbg,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          />
        );
      case statusCampaingns.INPROGRESS:
        return (
          <Chip
            label={name}
            sx={{
              color: (theme) => theme.palette.marketing.inProgress,
              background: (theme) => theme.palette.marketing.inProgressBg,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          />
        );
      case statusCampaingns.DONE:
        return (
          <Chip
            label={name}
            sx={{
              color: (theme) => theme.palette.marketing.done,
              background: (theme) => theme.palette.marketing.doneBg,
              fontWeight: Fonts.SEMI_BOLD,
            }}
          />
        );
      default:
        break;
    }
  };

  const iconPlatform = (type) => {
    switch (type) {
      case TypeCampaingnsCode.Email:
        return imgGmail;
      case TypeCampaingnsCode.SMS:
        return imgMessage;
      case TypeCampaingnsCode.Zalo:
        return imgZalo;
    }
  };

  const typeDetailMarketing = (type) => {
    switch (type) {
      case TypeCampaingnsCode.Email:
        return TypeCampaingnsCode.Email;
      case TypeCampaingnsCode.SMS:
        return TypeCampaingnsCode.SMS;
      case TypeCampaingnsCode.Zalo:
        return TypeCampaingnsCode.Zalo;
    }
  };

  const handleDelete = (id) => (e) => {
    e.stopPropagation();
    onSelectContactsForDelete(id);
  };

  return (
    <TableRow
      hover
      key={data.id}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate(
          `/marketing/${typeDetailMarketing(data.TypeCampaingnsCode)}/` +
            data.id
        );
      }}
    >
      <StyledTableCell align="left">
        {labelStatusCampaingn(
          data.StatusCampaingnsCode,
          data.StatusCampaingnsName
        )}
      </StyledTableCell>
      <StyledTableCell align="left">{data.Name}</StyledTableCell>
      <StyledTableCell align="left">{data.Code}</StyledTableCell>
      <StyledTableCell align="center">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img src={iconPlatform(data.TypeCampaingnsCode)} alt="logo" />
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        {moment(data.CreatedDate).format("L")}
      </StyledTableCell>
      <StyledTableCell align="right">
        <IconButton
          sx={{
            color: (theme) => theme.palette.primary.main,
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          size="large"
          onClick={() => {
            navigate(
              `/marketing/${typeDetailMarketing(data.TypeCampaingnsCode)}/` +
                data.id
            );
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          sx={{
            color: (theme) => theme.palette.warning.main,
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          size="large"
          onClick={handleDelete(data.id)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </StyledTableCell>
    </TableRow>
  );
};

export default TableItem;

TableItem.propTypes = {
  data: PropTypes.object.isRequired,
  onSelectContactsForDelete: PropTypes.func.isRequired,
};
