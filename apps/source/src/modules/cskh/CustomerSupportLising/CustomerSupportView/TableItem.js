import {
  Checkbox,
  IconButton,
  styled,
  TableCell,
  TableRow,
} from "@mui/material";
import moment from "moment";
import PropTypes from "prop-types";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import { useCustomerSupportActionsContext } from "../../context/CustomerSupportContextProvider";
import { putData } from "@crema/hooks/APIHooks";

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 14,
  padding: 8,
  "&:first-of-type": {
    paddingLeft: 20,
  },
  "&:last-of-type": {
    paddingRight: 20,
  },
}));

const TableItem = ({ data, handleOpenAssign, onSelectContactsForDelete }) => {
  const navigate = useNavigate();
  const { getData } = useCustomerSupportActionsContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const handleClickAssign = (id) => (e) => {
    e.stopPropagation();
    handleOpenAssign(id);
  };

  const handleOpenEdit = (id) => (e) => {
    e.stopPropagation();
    navigate("/cskh/" + id);
  };

  const handleDelete = (id) => (e) => {
    e.stopPropagation();
    onSelectContactsForDelete(id);
  };

  const onChangeStatus = async (id) => {
    putData("ticketMarkPriority", infoViewActionsContext, {
      TicketRequestId: id,
    })
      .then(() => {
        getData();
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <TableRow
      hover
      key={data.id}
      sx={{ cursor: "pointer" }}
      onClick={() => {
        navigate("/cskh/detail/" + data.id);
      }}
    >
      <StyledTableCell component="th" scope="row">
        {moment(data.CreatedDate).format("L")}
      </StyledTableCell>
      <StyledTableCell align="left">{data.Name}</StyledTableCell>
      <StyledTableCell align="left">{data.Phonenumber}</StyledTableCell>
      <StyledTableCell align="left">{data.Email}</StyledTableCell>
      <StyledTableCell align="left" onClick={(e) => e.stopPropagation()}>
        <Checkbox
          sx={{
            color: (theme) => theme.palette.warning.main,
            "&.Mui-checked": {
              color: (theme) => theme.palette.warning.main,
            },
            "& .MuiSvgIcon-root": {
              fontSize: 20,
            },
          }}
          icon={<StarBorderIcon />}
          checkedIcon={<StarIcon />}
          checked={data?.Priority || false}
          onChange={() => onChangeStatus(data.id)}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          sx={{
            color: (theme) => theme.palette.primary.main,
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          size="large"
          onClick={handleClickAssign(data.id)}
        >
          <PersonAddAltIcon />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell align="center">
        <IconButton
          sx={{
            color: (theme) => theme.palette.primary.main,
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          size="large"
          onClick={handleOpenEdit(data.id)}
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
  handleOpenAssign: PropTypes.func.isRequired,
  onSelectContactsForDelete: PropTypes.func.isRequired,
};
