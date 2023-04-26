import { Box, TableCell, TableSortLabel } from "@mui/material";
import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { visuallyHidden } from "@mui/utils";
import {
  useSmsActionContext,
  useSmsContext,
} from "../../context/SmsTemplateContextProvider";

const headCells = [
  {
    id: "Code",
    label: <IntlMessages id="sms.code" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="sms.name" />,
  },
  {
    id: "action",
    label: "",
  },
];

const TableHeading = () => {
  const { orderBy, order } = useSmsContext();
  const { handleRequestSort } = useSmsActionContext();

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
