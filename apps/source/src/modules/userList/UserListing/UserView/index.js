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
import {
  useUserActionContext,
  useUserContext,
} from "../../context/UserContextProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import { deleteData } from "@crema/hooks/APIHooks";

const UserView = () => {
  const { loading, users } = useUserContext();

  const { getData } = useUserActionContext();

  const infoViewActionsContext = useInfoViewActionsContext();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    setDeleteDialogOpen(false);
    deleteData(`user/${itemSelected}`, infoViewActionsContext)
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
            users.map((data) => (
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
        title={<IntlMessages id="contactApp.deleteUser" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default UserView;
