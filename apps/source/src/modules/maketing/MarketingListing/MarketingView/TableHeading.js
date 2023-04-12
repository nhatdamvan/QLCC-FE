import TableHeader from "@crema/components/TableHeader";
import IntlMessages from "@crema/helpers/IntlMessages";
import { Box, TableCell, TableSortLabel } from "@mui/material";
import {
  useMarketingActionsContext,
  useMarketingContext,
} from "../../context/MarketingContextProvider";
import { visuallyHidden } from "@mui/utils";

const headCells = [
  {
    id: "StatusCampaingnsCode",
    label: <IntlMessages id="marketing.status" />,
  },
  {
    id: "Name",
    label: <IntlMessages id="marketing.nameCampaign" />,
  },
  {
    id: "Code",
    label: <IntlMessages id="marketing.codeCampaign" />,
  },
  {
    id: "TypeCampaingnsCode",
    label: <IntlMessages id="marketing.platform" />,
    align: "center",
  },
  {
    id: "CreatedDate",
    label: <IntlMessages id="dashboard.createDate" />,
  },
  {
    id: "action",
    label: "",
  },
];

const TableHeading = () => {
  const { orderBy, order } = useMarketingContext();
  const { handleRequestSort } = useMarketingActionsContext();

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
