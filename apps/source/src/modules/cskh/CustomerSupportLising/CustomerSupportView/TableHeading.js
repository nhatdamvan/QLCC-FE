import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, TableCell, TableSortLabel } from "@mui/material";
import PropTypes from "prop-types";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "CreatedDate",
    label: <IntlMessages id="dashboard.createDate" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="customerSuport.name" />,
  },
  {
    id: "Phonenumber",
    label: <IntlMessages id="customerSuport.phone" />,
  },
  {
    id: "Email",
    label: <IntlMessages id="customerSuport.email" />,
  },
  {
    id: "Priority",
    label: <IntlMessages id="customerSuport.priority" />,
  },
  {
    id: "assign",
    label: <IntlMessages id="todo.assign" />,
    align: "center",
  },
  {
    id: "action",
    label: "",
  },
];

const TableHeading = ({ order, orderBy, handleRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <TableHeader>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          id={headCell.id}
          align={headCell?.align ? headCell?.align : "left"}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={"asc"}
            onClick={createSortHandler(headCell.id)}
          >
            {headCell.label}
            {orderBy === headCell.id ? (
              <Box component="span" sx={visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableHeader>
  );
};

export default TableHeading;

TableHeading.propTypes = {
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  handleRequestSort: PropTypes.func.isRequired,
  // onSelectContactsForDelete: PropTypes.func.isRequired,
};
