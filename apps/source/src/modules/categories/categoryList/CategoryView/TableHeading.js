import { Box, TableCell, TableSortLabel } from "@mui/material";
import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import {
  useCategoryActionContext,
  useCategoryContext,
} from "../../context/CategoriesContextProvider";

const headCells = [
  {
    id: "Code",
    label: <IntlMessages id="category.Code" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="category.Name" />,
  },
  {
    id: "GroupCode",
    label: <IntlMessages id="category.GroupCode" />,
  },
  {
    id: "GroupName",
    label: <IntlMessages id="category.GroupName" />,
  },
  // {
  //   id: 'CreatedDate',
  //   label: <IntlMessages id="common.category.CreateDate" />,
  // },
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
  const { orderBy, order } = useCategoryContext();
  const { handleRequestSort } = useCategoryActionContext();

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
