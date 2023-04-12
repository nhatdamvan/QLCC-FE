import { Box, TableCell, TableSortLabel } from "@mui/material";
import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import {
  useZaloActionContext,
  useZaloContext,
} from "../../context/ZaloTemplateContextProvider";

const headCells = [
  {
    id: "Code",
    label: <IntlMessages id="zalo.code" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="zalo.name" />,
  },
  {
    id: "action",
    label: "",
  },
];

// TableHeading.propTypes = {
//   onRequestSort: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
// };

// TableHeading.defaultProps = {
//   onRequestSort: null,
//   order: 'asc',
//   orderBy: ''
// };

const TableHeading = () => {
  const { orderBy, order } = useZaloContext();
  const { handleRequestSort } = useZaloActionContext();

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  return (
    <TableHeader>
      {headCells.map((headCell) => (
        <TableCell
          key={headCell.id}
          id={headCell.id}
          sortDirection={orderBy === headCell.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : "asc"}
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
