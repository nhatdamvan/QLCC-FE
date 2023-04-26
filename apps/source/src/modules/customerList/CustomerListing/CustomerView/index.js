import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import AppTableContainer from "@crema/components/AppTableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useCustomerActionContext,
  useCustomerContext,
} from "../../context/CustomerContextProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import IntlMessages from "@crema/helpers/IntlMessages";
import { useState } from "react";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import { deleteData } from "@crema/hooks/APIHooks";

const CustomerView = () => {
  const { isLoading, customers } = useCustomerContext();
  const { getData } = useCustomerActionContext();

  const infoViewActionsContext = useInfoViewActionsContext();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(false);
    deleteData(`customer/${itemSelected}`, infoViewActionsContext)
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
          {isLoading ? (
            <TableRow>
              <TableCell sx={{ border: "0 none" }}></TableCell>
            </TableRow>
          ) : (
            customers.map((data) => (
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
        title={<IntlMessages id="contactApp.deleteCustomer" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default CustomerView;
