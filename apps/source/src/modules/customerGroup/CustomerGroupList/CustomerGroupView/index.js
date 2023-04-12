import AppLoader from "@crema/components/AppLoader";
import AppTableContainer from "@crema/components/AppTableContainer";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCustomerGroupContext ,useCustomerGroupActionContext } from "../../Context/CustomerGroupContexProvider";
import TableHeading from "./TableHeading";
import TableItem from "./TableItem";
import { useState } from "react";
import jwtAxios from "@crema/services/auth/JWT";
import { useInfoViewActionsContext } from "@crema/context/InfoViewContextProvider";
import AppConfirmDialog from "@crema/components/AppConfirmDialog";
import IntlMessages from "@crema/helpers/IntlMessages";

const CustomerGroupView = () => {
  const { getData } = useCustomerGroupActionContext();
  const infoViewActionsContext = useInfoViewActionsContext();
  const { fetchSuccess } = infoViewActionsContext;
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemSelected, setItemSelected] = useState("");
  const { loading, customerGroup } = useCustomerGroupContext();
  const onSelectContactsForDelete = (property) => {
    setItemSelected(property);
    setDeleteDialogOpen(true);
  };
  const handleDelete = async () => {
    try {
      setDeleteDialogOpen(false);
      const response = await jwtAxios.delete(`customerGroup/${itemSelected}`);
      if (response) {
        fetchSuccess();
        infoViewActionsContext.showMessage(response.data.Message);
      }
      getData();
    } catch (error) {
      infoViewActionsContext.fetchError(error.message);
    }
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
              <TableCell sx={{ border: "0 none" }}>
                <AppLoader />
              </TableCell>
            </TableRow>
          ) : (
            customerGroup.map((data) => <TableItem data={data} key={data.id} onSelectContactsForDelete={onSelectContactsForDelete}
             />)
          )}
        </TableBody>
      </Table>
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={<IntlMessages id="contactApp.deleteCustomerGroup" />}
        dialogTitle={<IntlMessages id="common.deleteItem" />}
      />
    </AppTableContainer>
  );
};

export default CustomerGroupView;
