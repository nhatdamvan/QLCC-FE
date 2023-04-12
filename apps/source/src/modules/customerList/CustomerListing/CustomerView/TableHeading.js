import React from "react";
import { Box, TableCell, TableSortLabel } from "@mui/material";
import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
import {
  useCustomerActionContext,
  useCustomerContext,
} from "../../context/CustomerContextProvider";

const headCells = [
  {
    id: "Code",
    label: <IntlMessages id="customer.id" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="customer.name" />,
  },
  {
    id: "PhonenumberFirst",
    numeric: true,
    disablePadding: false,
    label: <IntlMessages id="customer.phone" />,
  },
  {
    id: "Email",
    label: <IntlMessages id="customer.email" />,
  },
  {
    id: "Sex",
    label: <IntlMessages id="customer.sex" />,
  },
  {
    id: "BirthDay",
    label: <IntlMessages id="customer.birthday" />,
  },
  {
    id: "StatusCustomer",
    label: <IntlMessages id="customer.status" />,
  },
  {
    id: "action",
    label: "",
  },
];

const TableHeading = () => {
  const { orderBy, order } = useCustomerContext();
  const { handleRequestSort } = useCustomerActionContext();

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
