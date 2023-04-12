import IntlMessages from "@crema/helpers/IntlMessages";
import { TableCell, TableRow } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import PropTypes from "prop-types";

const headCells = [
  {
    id: "Code",
    numeric: false,
    disablePadding: true,
    label: <IntlMessages id="category.Code" />,
  },
  {
    id: "Name",
    numeric: false,
    disablePadding: false,
    label: <IntlMessages id="common.name" />,
  },
];

const TableHeadDialog = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default TableHeadDialog;

TableHeadDialog.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
};
