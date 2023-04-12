import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useNavigate } from "react-router-dom";

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
const TableItem = ({ data, onSelectContactsForDelete }) => {
  const navigate = useNavigate();

  const showDetail = () => {
    navigate("/User/" + data.id);
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
      onClick={showDetail}
    >
      <StyledTableCell component="th" scope="row">{data.Username}</StyledTableCell>
      <StyledTableCell align="left">{data.Name}</StyledTableCell>
      <StyledTableCell align="left">{data.Phonenumber}</StyledTableCell>
      <StyledTableCell align="left">{data.Email}</StyledTableCell>
      <StyledTableCell align="left">{data.Address}</StyledTableCell>
      <StyledTableCell align="left">{data.RolesName[0]}</StyledTableCell>
      <StyledTableCell align="right">
        <IconButton
          sx={{
            color: (theme) => theme.palette.primary.main,
            "& .MuiSvgIcon-root": {
              fontSize: 24,
            },
          }}
          size="large"
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
};
