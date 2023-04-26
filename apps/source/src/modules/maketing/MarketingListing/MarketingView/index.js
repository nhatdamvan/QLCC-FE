import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import AppTableContainer from "@crema/components/AppTableContainer";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import IntlMessages from "@crema/helpers/IntlMessages";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import { useMarketingContext } from "../../context/MarketingContextProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import { useMarketingActionsContext } from "../../context/MarketingContextProvider";
import { deleteData } from "@crema/hooks/APIHooks";

const MarketingView = () => {
  const { loading, marketings } = useMarketingContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const { getData } = useMarketingActionsContext();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    deleteData(`campaingnsDelete/${itemSelected}`, infoViewActionsContext)
      .then(() => {
        getData();
      })
      .catch((error) => {
        infoViewActionsContext.fetchError(error.message);
      });
  };

  return (
    <AppTableContainer>
      <Table stickyHeader className="table">
        <TableHead>
          <TableHeading />
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell sx={{ border: "0 none" }}></TableCell>
            </TableRow>
          ) : (
            marketings.map((data) => (
              <TableItem
                data={data}
                key={data.id}
                onSelectContactsForDelete={onSelectContactsForDelete}
              />
            ))
          )}
        </TableBody>
      </Table>

      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={<IntlMessages id="contactApp.deleteCampaign" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default MarketingView;
