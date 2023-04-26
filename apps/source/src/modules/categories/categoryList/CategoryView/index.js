import AppTableContainer from "@crema/components/AppTableContainer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  useCategoryContext,
  useCategoryActionContext,
} from "../../context/CategoriesContextProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import { useState } from "react";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import IntlMessages from "@crema/helpers/IntlMessages";
import { deleteData } from "@crema/hooks/APIHooks";

const CategoryView = () => {
  const { loading, category } = useCategoryContext();
  const { getData } = useCategoryActionContext();
  const infoViewActionsContext = useInfoViewActionsContext();

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };
  const handleDelete = async () => {
    setDeleteDialogOpen(false);
    deleteData(`category/${itemSelected}`, infoViewActionsContext)
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
            category.map((data) => (
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
        title={<IntlMessages id="contactApp.deleteCategory" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default CategoryView;
